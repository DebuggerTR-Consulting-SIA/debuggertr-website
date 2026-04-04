"use client";

import { useEffect, useLayoutEffect, useState, useRef, useCallback, useMemo } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

interface CvEntry {
  id: string; name: string; slug: string; birthDate: string;
  module: string; rate: string; rateCurrency: string;
  ratePeriod: "daily" | "hourly"; fileName: string;
  fileType: string; htmlContent: string; uploadedAt: string;
}

function calcAge(d: string) {
  if (!d) return null;
  const b = new Date(d), t = new Date();
  let a = t.getFullYear() - b.getFullYear();
  if (t.getMonth() - b.getMonth() < 0 || (t.getMonth() === b.getMonth() && t.getDate() < b.getDate())) a--;
  return a;
}
const sym = (c: string) => c === "EUR" ? "€" : c === "USD" ? "$" : c === "GBP" ? "£" : c + " ";

export default function CvProfileClient({ initialCv }: { initialCv: CvEntry }) {
  const [cv, setCv] = useState<CvEntry>(initialCv);
  const [isMounted, setIsMounted] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // useLayoutEffect is skipped on the server and runs synchronously before paint on the client.
  // This lets processedHtml use DOMParser only on the client, avoiding hydration mismatch.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => { setIsMounted(true); }, []);
  const cvBodyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep cv in sync if initialCv prop changes
  useEffect(() => { setCv(initialCv); }, [initialCv]);

  // ── Pre-process HTML with DOMParser ──────────────────────────────
  // Only runs after mount (isMounted=true) to avoid SSR hydration mismatch.
  // useLayoutEffect sets isMounted before browser paints, so no visible flash.
  const processedHtml = useMemo(() => {
    if (!cv?.htmlContent || !isMounted) return cv?.htmlContent ?? "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(cv.htmlContent, "text/html");
    const body = doc.body;

    // Known section header pattern — anything else that's an h2 is likely a job title
    const SECTION_RE = /^(professional\s+(summary|experience|background|profile)|work\s+experience|core\s+(competencies|skills?)|key\s+skills?|technical\s+skills?|education(\s+.{0,30})?|certifications?(\s+.{0,30})?|languages?(\s+.{0,30})?|portfolio|.{0,30}portfolio|project\s+(overview|portfolio)|references?|summary|profile|objective|about(\s+me)?|contact(\s+info)?|highlights?|achievements?|accomplishments?|hobbies?|interests?)/i;

    // 0a. Demote incorrectly promoted h2s (job titles) — keep only real section headers
    //     The first h2 is always the person's name, so keep it unconditionally.
    let firstH2 = true;
    Array.from(body.querySelectorAll("h2")).forEach(h2 => {
      const text = h2.textContent?.trim() ?? "";
      const isSection = SECTION_RE.test(text);
      const isName = firstH2;
      firstH2 = false;
      if (!isSection && !isName) {
        // Demote back to bold paragraph
        const p = doc.createElement("p");
        const strong = doc.createElement("strong");
        strong.textContent = text;
        p.appendChild(strong);
        h2.parentNode?.replaceChild(p, h2);
      }
    });

    // 0b. Promote standalone bold-only paragraphs (outside tables) to h2
    //     Handles CVs where Word heading styles weren't used (Title Case headings)
    if (body.querySelectorAll("h2").length <= 1) { // ≤1 means only name or nothing
      Array.from(body.querySelectorAll("p")).forEach(p => {
        if (p.closest("td") || p.closest("th")) return;
        const nodes = Array.from(p.childNodes).filter(
          n => !(n.nodeType === 3 && !n.textContent?.trim())
        );
        if (nodes.length !== 1 || nodes[0].nodeName !== "STRONG") return;
        const text = p.textContent?.trim() ?? "";
        if (!SECTION_RE.test(text)) return; // only promote known section headers
        const h2 = doc.createElement("h2");
        h2.textContent = text;
        p.parentNode?.replaceChild(h2, p);
      });
    }

    // 1. Wrap portfolio project paragraphs into cards
    const anchors = Array.from(body.querySelectorAll<HTMLElement>("a[id^='port_']"));
    anchors.forEach(anchor => {
      const startP = anchor.closest("p");
      if (!startP || startP.dataset.wrapped) return;
      const card = doc.createElement("div");
      card.className = "portfolio-card";
      card.dataset.projectId = anchor.id;
      startP.parentNode?.insertBefore(card, startP);
      let el: Element | null = startP;
      while (el) {
        const sibling: Element | null = el.nextElementSibling;
        card.appendChild(el);
        (el as HTMLElement).dataset.wrapped = "1";
        if (sibling && (
          sibling.querySelector("a[id^='port_']") ||
          sibling.tagName === "H2" || sibling.tagName === "H1" ||
          sibling.tagName === "TABLE"
        )) break;
        el = sibling;
      }
    });

    // 2. Style education entries
    const eduH2 = Array.from(body.querySelectorAll<HTMLElement>("h2")).find(h => /education/i.test(h.textContent ?? ""));
    if (eduH2) {
      let el = eduH2.nextElementSibling as HTMLElement | null;
      while (el && el.tagName === "P") {
        el.classList.add("edu-entry");
        el = el.nextElementSibling as HTMLElement | null;
      }
    }

    // 3. Style certification list items
    body.querySelectorAll<HTMLElement>("li").forEach(li => {
      const text = li.textContent ?? "";
      if (
        text.includes("Certificate") || text.includes("Certification") ||
        text.includes("CCNA") || text.includes("Google") || text.includes("Cisco")
      ) li.classList.add("cert-item");
    });

    return body.innerHTML;
  }, [cv?.htmlContent, isMounted]);

  // ── Project click: highlight + center scroll ──────────────────────
  const handleClick = useCallback((e: MouseEvent) => {
    const link = (e.target as HTMLElement).closest("a[href^='#port_']") as HTMLAnchorElement | null;
    if (!link) return;
    e.preventDefault();
    const targetId = link.getAttribute("href")!.slice(1);
    setActiveProject(targetId);
  }, []);

  useEffect(() => {
    const body = cvBodyRef.current;
    if (!body) return;
    body.addEventListener("click", handleClick);
    return () => body.removeEventListener("click", handleClick);
  }, [handleClick, cv]);

  // Apply highlight when activeProject changes
  useEffect(() => {
    const body = cvBodyRef.current;
    if (!body) return;
    body.querySelectorAll<HTMLElement>(".portfolio-card.active").forEach(c => c.classList.remove("active"));
    if (!activeProject) return;
    const card = body.querySelector<HTMLElement>(`.portfolio-card[data-project-id="${activeProject}"]`);
    if (!card) return;
    card.classList.add("active");
    setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  }, [activeProject]);

  // ── PDF download via iframe print ────────────────────────────────
  const downloadPdf = useCallback(async () => {
    if (!cv) return;
    setDownloading(true);
    try {
      const cardHtml = cardRef.current?.innerHTML ?? "";
      const bodyHtml = processedHtml;

      const printDoc = `
        <html><head><meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Arial, sans-serif; color: #222; font-size: 11px; line-height: 1.5; }
          .print-header { background: #0a1628; color: white; padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
          .print-header h1 { font-size: 18px; font-weight: 700; }
          .print-header .meta { font-size: 10px; opacity: 0.7; margin-top: 2px; }
          .print-header .right { text-align: right; font-size: 10px; color: rgba(255,255,255,0.6); }
          .info-row { display: flex; gap: 24px; padding: 10px 24px 14px; border-bottom: 1px solid #e5e7eb; margin-bottom: 12px; }
          .info-block p:first-child { font-size: 8px; text-transform: uppercase; letter-spacing: .08em; color: #6b7280; margin-bottom: 3px; }
          .rate-val { font-size: 20px; font-weight: 700; color: #1d4ed8; }
          .rate-period { font-size: 11px; color: #9ca3af; }
          .tag { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 20px; padding: 1px 8px; font-size: 9px; color: #1d4ed8; display: inline-block; margin: 1px; }
          .cv-content { padding: 0 24px 24px; }
          h2 { font-size: 9px; font-weight: 700; background: #1e3a5f; color: white; padding: 3px 8px; border-radius: 3px; text-transform: uppercase; letter-spacing: .06em; margin: 14px 0 6px; }
          p { margin: 2px 0; font-size: 10.5px; }
          strong { font-weight: 600; }
          a { color: #1d4ed8; text-decoration: none; }
          table { width: 100%; border-collapse: collapse; margin: 4px 0; }
          td { padding: 3px 6px; vertical-align: top; font-size: 10px; }
          img { max-width: 80px; max-height: 50px; object-fit: contain; }
          ul { padding-left: 16px; margin: 3px 0; }
          li { font-size: 10px; margin: 1px 0; }
          .portfolio-card { border-left: 3px solid #e2e8f0; padding: 6px 0 6px 10px; margin: 8px 0; page-break-inside: avoid; }
          .portfolio-card p:first-child strong { font-size: 11px; }
          .edu-entry { padding: 3px 0 3px 8px; border-left: 2px solid #bfdbfe; margin: 3px 0; }
          .cert-item { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 1px 8px; display: inline-block; margin: 2px; font-size: 9.5px; }
        </style>
        </head><body>
        <div class="print-header">
          <div>
            <div style="font-size:9px;opacity:.6;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px">Consultant Profile</div>
            <h1>${cv.name}</h1>
            ${calcAge(cv.birthDate) ? `<div class="meta">Age ${calcAge(cv.birthDate)}</div>` : ""}
          </div>
          <div class="right">Presented by<br/><strong style="color:white;font-size:12px">DebuggerTR Consulting SIA</strong><br/>debuggertr.com</div>
        </div>
        <div class="info-row">
          <div class="info-block">
            <p>Expertise</p>
            <div>${cv.module.split(",").map(m => `<span class="tag">${m.trim()}</span>`).join("")}</div>
          </div>
          <div class="info-block">
            <p>${cv.ratePeriod === "daily" ? "Daily Rate" : "Hourly Rate"}</p>
            <span class="rate-val">${sym(cv.rateCurrency)}${cv.rate}</span>
            <span class="rate-period"> / ${cv.ratePeriod === "daily" ? "day" : "hr"}</span>
          </div>
          <div class="info-block">
            <p>Contact</p>
            <a href="mailto:info@debuggertr.com">info@debuggertr.com</a>
          </div>
        </div>
        <div class="cv-content">${bodyHtml}</div>
        </body></html>`;

      const blob = new Blob([printDoc], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      iframe.src = url;
      iframe.onload = () => {
        setTimeout(() => {
          try {
            iframe.contentWindow?.print();
          } finally {
            setTimeout(() => { document.body.removeChild(iframe); URL.revokeObjectURL(url); }, 2000);
          }
          setDownloading(false);
        }, 500);
      };
    } catch (err) {
      console.error(err);
      window.print();
      setDownloading(false);
    }
  }, [cv, processedHtml]);

  // ─────────────────────────────────────────────────────────────────
  if (!cv) notFound();

  const age = calcAge(cv.birthDate);
  const modules = cv.module.split(/[,،]/).map(m => m.trim()).filter(Boolean);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": cv.name,
    "jobTitle": `SAP ${cv.module} Consultant`,
    "worksFor": {
      "@type": "Organization",
      "name": "DebuggerTR Consulting SIA",
      "url": "https://debuggertr.com"
    },
    "url": `https://debuggertr.com/cvs/${cv.slug}`,
    "email": "info@debuggertr.com",
    "knowsAbout": cv.module.split(/[,،]/).map(m => m.trim())
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        /* ── Base ── */
        .cv-body { font-family: 'Inter', Arial, sans-serif; color: #374151; font-size: 0.875rem; line-height: 1.65; }
        .cv-body p  { margin: 0.25rem 0; }
        .cv-body strong { color: #111827; font-weight: 600; }
        .cv-body em { color: #6b7280; font-size: 0.8125rem; }
        .cv-body a  { color: #2563eb; text-decoration: none; font-weight: 500; }
        .cv-body a:hover { text-decoration: underline; }
        /* ── Headings ── */
        .cv-body h1 { font-size: 1.3rem; font-weight: 700; color: #0a1628; margin: 1.25rem 0 0.4rem; padding-bottom: 0.3rem; border-bottom: 2px solid #2563eb; }
        .cv-body h2 { font-size: 0.75rem; font-weight: 700; color: #fff; background: #1e3a5f; padding: 4px 10px; border-radius: 4px; letter-spacing: 0.07em; text-transform: uppercase; margin: 1.5rem 0 0.75rem; display: block; }
        /* ── Lists ── */
        .cv-body ul  { padding-left: 1.25rem; margin: 0.35rem 0; list-style: disc; }
        .cv-body li  { margin: 0.2rem 0; font-size: 0.875rem; }
        /* ── Tables ── */
        .cv-body table { width: 100%; border-collapse: collapse; margin: 0.5rem 0; }
        .cv-body td, .cv-body th { padding: 0.35rem 0.5rem; vertical-align: top; font-size: 0.875rem; }
        .cv-body td:first-child:has(img) { width: 110px; text-align: center; vertical-align: middle; background: #f9fafb; border-right: 1px solid #f1f5f9; padding: 0.5rem; }
        .cv-body img { max-width: 90px; max-height: 58px; object-fit: contain; border-radius: 3px; }

        /* ── Project links ── */
        .cv-body a[href^="#port_"] {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 2px 9px; background: #eff6ff; border: 1px solid #bfdbfe;
          border-radius: 5px; color: #1d4ed8; font-size: 0.8125rem;
          transition: background 0.15s, border-color 0.15s;
        }
        .cv-body a[href^="#port_"]:hover { background: #dbeafe; border-color: #93c5fd; }

        /* ── Portfolio cards ── */
        .portfolio-card {
          border: 1px solid #e5e7eb; border-left: 4px solid #cbd5e1;
          border-radius: 8px; padding: 12px 14px;
          margin: 10px 0; background: #fff;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          scroll-margin-top: 80px;
        }
        .portfolio-card.active {
          border-left-color: #2563eb !important;
          background: #eff6ff !important;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
        }
        .portfolio-card p:first-child strong { font-size: 0.9375rem; color: #0a1628; }

        /* ── Education entries ── */
        .edu-entry { padding: 5px 0 5px 12px; border-left: 3px solid #bfdbfe; margin: 5px 0; border-radius: 0 4px 4px 0; }
        .edu-entry strong { color: #1e3a5f; }

        /* ── Certification list items ── */
        .cert-item { list-style: none !important; display: inline-flex !important; align-items: center; gap: 5px;
          padding: 3px 10px 3px 8px; background: #f0fdf4; border: 1px solid #bbf7d0;
          border-radius: 20px; color: #15803d; font-size: 0.8125rem; margin: 3px 2px; }
        .cert-item::before { content: "✓"; font-size: 10px; color: #16a34a; }

        /* ── Scroll-to-top button ── */
        .scroll-top-btn {
          position: fixed; bottom: 28px; right: 28px; z-index: 50;
          width: 44px; height: 44px; border-radius: 50%;
          background: #0a1628; color: #fff; border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,0.25);
          transition: background 0.2s, transform 0.2s, opacity 0.2s;
          opacity: 0; pointer-events: none;
        }
        .scroll-top-btn.visible { opacity: 1; pointer-events: auto; }
        .scroll-top-btn:hover { background: #1e3a5f; transform: translateY(-2px); }
      `}</style>

      {/* ── Scroll-to-top button ── */}
      <button
        className={`scroll-top-btn${showScrollTop ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        title="Back to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>

      <div className="min-h-screen bg-slate-100 py-8 px-4">
        <div className="w-full max-w-3xl mx-auto space-y-4">

          {/* ── Profile Card ── */}
          <div ref={cardRef} className="bg-white rounded-2xl shadow-md overflow-hidden">

            {/* Header */}
            <div className="px-8 py-7" style={{ background: "linear-gradient(135deg,#0a1628 0%,#1e3a5f 100%)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <p style={{ color: "#93c5fd", fontSize: "10px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "4px" }}>
                    Consultant Profile
                  </p>
                  <h1 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.2 }}>{cv.name}</h1>
                  {age !== null && <p style={{ color: "rgba(255,255,255,.45)", fontSize: "13px", marginTop: "3px" }}>Age {age}</p>}
                </div>
                {/* Logo — links to homepage */}
                <a href="/" aria-label="DebuggerTR Consulting — Home" style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", opacity: 0.9, transition: "opacity 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0.9")}
                >
                  <p style={{ color: "rgba(255,255,255,.4)", fontSize: "9px", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "2px" }}>Presented by</p>
                  <Image
                    src="/images/logo-white.png"
                    alt="DebuggerTR Consulting"
                    width={120}
                    height={36}
                    style={{ objectFit: "contain", width: "auto", height: "36px" }}
                    priority
                  />
                </a>
              </div>
            </div>

            {/* Info row — always 3 cols via inline styles */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid #f1f5f9" }}>
              {/* Expertise */}
              <div style={{ padding: "14px 18px", borderRight: "1px solid #f1f5f9" }}>
                <p style={{ fontSize: "9px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "6px" }}>Expertise</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {modules.map(m => (
                    <span key={m} style={{ padding: "2px 9px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "20px", color: "#1d4ed8", fontSize: "11px", fontWeight: 600 }}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rate */}
              <div style={{ padding: "14px 18px", borderRight: "1px solid #f1f5f9" }}>
                <p style={{ fontSize: "9px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "4px" }}>
                  {cv.ratePeriod === "daily" ? "Daily Rate" : "Hourly Rate"}
                </p>
                <p style={{ fontSize: "1.625rem", fontWeight: 700, color: "#2563eb", lineHeight: 1.1 }}>
                  {sym(cv.rateCurrency)}{cv.rate}
                  <span style={{ fontSize: "12px", fontWeight: 400, color: "#9ca3af", marginLeft: "4px" }}>
                    / {cv.ratePeriod === "daily" ? "day" : "hr"}
                  </span>
                </p>
              </div>

              {/* Contact */}
              <div style={{ padding: "14px 18px" }}>
                <p style={{ fontSize: "9px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "6px" }}>Contact</p>
                <a href="mailto:info@debuggertr.com" style={{ fontSize: "12px", color: "#2563eb", fontWeight: 500, display: "flex", alignItems: "center", gap: "5px" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
                  info@debuggertr.com
                </a>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ padding: "10px 18px", background: "#f9fafb", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <button
                onClick={downloadPdf}
                disabled={downloading}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "8px 16px", background: downloading ? "#94a3b8" : "#0a1628",
                  color: "#fff", fontSize: "13px", fontWeight: 600,
                  border: "none", borderRadius: "8px", cursor: downloading ? "not-allowed" : "pointer"
                }}
              >
                {downloading ? (
                  <><svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Preparing PDF…</>
                ) : (
                  <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download PDF</>
                )}
              </button>

              {cv.fileName && (
                <a
                  href={`/cvs/${cv.fileName}`}
                  download
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "8px 16px", background: "#fff",
                    border: "1px solid #e5e7eb", borderRadius: "8px",
                    color: "#4b5563", fontSize: "13px", fontWeight: 600, textDecoration: "none"
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                  Original {cv.fileType?.toUpperCase()}
                </a>
              )}

              {activeProject && (
                <span style={{ marginLeft: "auto", fontSize: "11px", color: "#1d4ed8", background: "#eff6ff", border: "1px solid #bfdbfe", padding: "4px 12px", borderRadius: "20px", fontWeight: 600 }}>
                  ↳ {activeProject.replace("port_", "").toUpperCase()} selected
                </span>
              )}
            </div>
          </div>

          {/* ── CV Document ── */}
          {processedHtml && (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div style={{ padding: "8px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em" }}>CV Document</span>
              </div>
              <div
                ref={cvBodyRef}
                className="cv-body"
                style={{ padding: "24px 32px 32px" }}
                dangerouslySetInnerHTML={{ __html: processedHtml }}
              />
            </div>
          )}

          {/* PDF fallback for PDF-only uploads */}
          {!cv.htmlContent && cv.fileName && cv.fileType === "pdf" && (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden" style={{ height: "80vh" }}>
              <iframe src={`/cvs/${cv.fileName}`} className="w-full h-full" title={`${cv.name} CV`} />
            </div>
          )}

          <div style={{ textAlign: "center", paddingBottom: "24px" }}>
            <a href="https://debuggertr.com" style={{ fontSize: "11px", color: "#9ca3af" }}>
              debuggertr.com · SAP EWM &amp; ABAP Consulting
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
