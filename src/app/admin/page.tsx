"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LocalizedText {
  en: string;
  tr: string;
  lv: string;
  de: string;
}

interface Reference {
  id: number;
  name: string;
  industry: LocalizedText;
  description: LocalizedText;
  tags: string[];
  category: string;
  iconKey: string;
}

interface Stats {
  experience: { value: number; suffix: string };
  projects:   { value: number; suffix: string };
  clients:    { value: number; suffix: string };
  countries:  { value: number; suffix: string };
}

interface Company {
  name: string;
  regNumber: string;
  email: string;
  location: string;
  legalAddress: string;
  workingHours: {
    weekdays: string;
    weekend: string;
  };
}

interface AdminData {
  references: Reference[];
  stats: Stats;
  company: Company;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ICON_OPTIONS = ["Truck", "Pill", "ShoppingBag", "Factory", "Package", "Building2"];
const CATEGORY_OPTIONS = ["logistics", "pharmaceutical", "retail", "manufacturing", "technology", "corporate"];
const STAT_KEYS: (keyof Stats)[] = ["experience", "projects", "clients", "countries"];
const LOCALE_LABELS = [
  { key: "en" as const, label: "English" },
  { key: "tr" as const, label: "Türkçe" },
  { key: "lv" as const, label: "Latviešu" },
  { key: "de" as const, label: "Deutsch" },
];

function emptyRef(): Reference {
  return {
    id: Date.now(),
    name: "",
    industry: { en: "", tr: "", lv: "", de: "" },
    description: { en: "", tr: "", lv: "", de: "" },
    tags: [],
    category: "logistics",
    iconKey: "Building2",
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LocaleFields({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: LocalizedText;
  onChange: (v: LocalizedText) => void;
  multiline?: boolean;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
      {LOCALE_LABELS.map(({ key, label: lbl }) =>
        multiline ? (
          <div key={key} className="flex gap-2 items-start">
            <span className="w-6 text-xs text-gray-400 mt-2 shrink-0">{key.toUpperCase()}</span>
            <textarea
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              placeholder={lbl}
              value={value[key]}
              onChange={(e) => onChange({ ...value, [key]: e.target.value })}
            />
          </div>
        ) : (
          <div key={key} className="flex gap-2 items-center">
            <span className="w-6 text-xs text-gray-400 shrink-0">{key.toUpperCase()}</span>
            <input
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={lbl}
              value={value[key]}
              onChange={(e) => onChange({ ...value, [key]: e.target.value })}
            />
          </div>
        )
      )}
    </div>
  );
}

function SaveButton({ onClick, saving, saved }: { onClick: () => void; saving: boolean; saved: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
        saved
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
      }`}
    >
      {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
    </button>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

function ReferencesTab({
  refs,
  onChange,
}: {
  refs: Reference[];
  onChange: (refs: Reference[]) => void;
}) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const update = (idx: number, partial: Partial<Reference>) => {
    const updated = refs.map((r, i) => (i === idx ? { ...r, ...partial } : r));
    onChange(updated);
  };

  const remove = (idx: number) => {
    onChange(refs.filter((_, i) => i !== idx));
    if (expanded === idx) setExpanded(null);
    setDeleteConfirm(null);
  };

  const addNew = () => {
    const newRef = emptyRef();
    onChange([...refs, newRef]);
    setExpanded(refs.length);
  };

  return (
    <div className="space-y-3">
      {refs.map((ref, idx) => (
        <div key={ref.id} className="border border-gray-200 rounded-xl overflow-hidden">
          {/* Header row */}
          <div
            className="flex items-center gap-3 px-4 py-3 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setExpanded(expanded === idx ? null : idx)}
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
              {idx + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{ref.name || "New Reference"}</p>
              <p className="text-xs text-gray-400 truncate">{ref.industry.en || "—"}</p>
            </div>
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-500">{ref.iconKey}</span>
            <svg
              width="16" height="16"
              style={{ flexShrink: 0, transition: "transform 0.2s", transform: expanded === idx ? "rotate(180deg)" : "rotate(0deg)" }}
              fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Expanded form */}
          {expanded === idx && (
            <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Company Name</label>
                  <input
                    className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={ref.name}
                    onChange={(e) => update(idx, { name: e.target.value })}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tags (comma separated)</label>
                  <input
                    className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={ref.tags.join(", ")}
                    onChange={(e) =>
                      update(idx, { tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
                    }
                    placeholder="SAP EWM, ABAP"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Icon</label>
                  <select
                    className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={ref.iconKey}
                    onChange={(e) => update(idx, { iconKey: e.target.value })}
                  >
                    {ICON_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</label>
                  <select
                    className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={ref.category}
                    onChange={(e) => update(idx, { category: e.target.value })}
                  >
                    {CATEGORY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <LocaleFields
                label="Industry / Sector"
                value={ref.industry}
                onChange={(v) => update(idx, { industry: v })}
              />
              <LocaleFields
                label="Description"
                value={ref.description}
                onChange={(v) => update(idx, { description: v })}
                multiline
              />

              <div className="flex justify-end">
                {deleteConfirm === idx ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-red-600">Delete this reference?</span>
                    <button
                      onClick={() => remove(idx)}
                      className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                    >
                      Yes, delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(idx)}
                    className="px-3 py-1.5 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Delete Reference
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addNew}
        className="w-full py-3 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm font-medium"
      >
        + Add New Reference
      </button>
    </div>
  );
}

function StatisticsTab({
  stats,
  onChange,
}: {
  stats: Stats;
  onChange: (s: Stats) => void;
}) {
  const labels: Record<keyof Stats, string> = {
    experience: "Years of Experience",
    projects: "Completed Projects",
    clients: "Satisfied Clients",
    countries: "Countries",
  };
  const icons: Record<keyof Stats, string> = {
    experience: "🏆",
    projects: "📁",
    clients: "🤝",
    countries: "🌍",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {STAT_KEYS.map((key) => (
        <div key={key} className="p-4 bg-white border border-gray-200 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{icons[key]}</span>
            <p className="font-medium text-gray-800">{labels[key]}</p>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-500 font-medium">Value</label>
              <input
                type="number"
                className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={stats[key].value}
                onChange={(e) =>
                  onChange({ ...stats, [key]: { ...stats[key], value: Number(e.target.value) } })
                }
              />
            </div>
            <div className="w-20">
              <label className="text-xs text-gray-500 font-medium">Suffix</label>
              <input
                className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={stats[key].suffix}
                onChange={(e) =>
                  onChange({ ...stats, [key]: { ...stats[key], suffix: e.target.value } })
                }
                placeholder="+"
              />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-blue-600">
            {stats[key].value}
            <span className="text-blue-400">{stats[key].suffix}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

function CompanyTab({
  company,
  onChange,
}: {
  company: Company;
  onChange: (c: Company) => void;
}) {
  const fields: { key: keyof Omit<Company, "workingHours">; label: string; placeholder: string }[] = [
    { key: "name", label: "Company Name", placeholder: "DebuggerTR Consulting SIA" },
    { key: "regNumber", label: "Registration Number", placeholder: "50203500891" },
    { key: "email", label: "Email Address", placeholder: "info@debuggertr.com" },
    { key: "location", label: "Location (displayed)", placeholder: "Riga, Latvia" },
    { key: "legalAddress", label: "Legal Address", placeholder: "Rīga, Latvija, LV-1050" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
            <input
              className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={company[key]}
              onChange={(e) => onChange({ ...company, [key]: e.target.value })}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Working Hours</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500">Weekdays</label>
            <input
              className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={company.workingHours.weekdays}
              onChange={(e) =>
                onChange({ ...company, workingHours: { ...company.workingHours, weekdays: e.target.value } })
              }
              placeholder="Mon–Fri: 09:00–18:00"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Weekend</label>
            <input
              className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={company.workingHours.weekend}
              onChange={(e) =>
                onChange({ ...company, workingHours: { ...company.workingHours, weekend: e.target.value } })
              }
              placeholder="Closed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PublishTab() {
  const [status, setStatus] = useState<"idle" | "building" | "done" | "error">("idle");
  const [result, setResult] = useState<{ publishedAt?: string; publishedTo?: string; error?: string } | null>(null);

  const publish = async () => {
    setStatus("building");
    setResult(null);
    try {
      const res = await fetch("/api/admin/publish", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("done");
        setResult(data);
      } else {
        setStatus("error");
        setResult({ error: data.error ?? "Unknown error" });
      }
    } catch (err) {
      setStatus("error");
      setResult({ error: String(err) });
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* How it works */}
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
        <p className="text-sm font-semibold text-blue-800 mb-2">How publishing works</p>
        <ol className="space-y-1.5 text-sm text-blue-700">
          <li className="flex gap-2">
            <span className="font-bold shrink-0">1.</span>
            <span>Runs <code className="bg-blue-100 px-1 rounded text-xs">next build</code> — generates a static export in <code className="bg-blue-100 px-1 rounded text-xs">out/</code></span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold shrink-0">2.</span>
            <span>Copies the <code className="bg-blue-100 px-1 rounded text-xs">out/</code> folder to <code className="bg-blue-100 px-1 rounded text-xs">../Published/</code> (next to the project folder)</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold shrink-0">3.</span>
            <span>Removes the <code className="bg-blue-100 px-1 rounded text-xs">/admin</code> folder — it only works in dev mode</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold shrink-0">4.</span>
            <span>Upload the contents of <code className="bg-blue-100 px-1 rounded text-xs">Published/</code> to <code className="bg-blue-100 px-1 rounded text-xs">public_html/</code> via FTP</span>
          </li>
        </ol>
      </div>

      {/* Warning */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-2 text-sm text-amber-800">
        <span className="shrink-0">⚠️</span>
        <span>Build takes 1–3 minutes. Don&apos;t close this page during the process.</span>
      </div>

      {/* Publish button */}
      <button
        onClick={publish}
        disabled={status === "building"}
        className={`w-full py-4 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-3 ${
          status === "building"
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : status === "done"
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200"
        }`}
      >
        {status === "building" && (
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        )}
        {status === "building"
          ? "Building... please wait"
          : status === "done"
          ? "Published! Publish again?"
          : "🚀 Publish to Published/ folder"}
      </button>

      {/* Result */}
      {result && status === "done" && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl space-y-2">
          <p className="font-semibold text-green-800">✅ Build &amp; publish complete</p>
          <p className="text-sm text-green-700">
            Published at: <strong>{new Date(result.publishedAt!).toLocaleString()}</strong>
          </p>
          <p className="text-xs text-green-600 font-mono break-all">{result.publishedTo}</p>
          <p className="text-sm text-green-600 mt-1">
            Upload the contents of <strong>Published/</strong> to your hosting via FTP.
          </p>
        </div>
      )}

      {result && status === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="font-semibold text-red-800 mb-1">Build failed</p>
          <p className="text-xs text-red-700 font-mono whitespace-pre-wrap break-all">{result.error}</p>
        </div>
      )}
    </div>
  );
}

// ─── Tracking Tab ─────────────────────────────────────────────────────────────

interface Tracking {
  googleAnalytics: string;
  yandexMetrica: string;
  customHeadCode: string;
  customBodyCode: string;
}

function TrackingTab() {
  const [tracking, setTracking] = useState<Tracking>({
    googleAnalytics: "",
    yandexMetrica: "",
    customHeadCode: "",
    customBodyCode: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/tracking")
      .then((r) => r.json())
      .then((d) => { setTracking(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tracking),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert("Save failed: " + String(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-sm text-gray-400">Loading...</div>;

  return (
    <div className="max-w-2xl space-y-6">
      {/* Info banner */}
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
        <p className="font-semibold mb-1">How to use tracking codes</p>
        <ul className="space-y-1 text-blue-600 list-disc list-inside">
          <li>Paste only the <strong>Measurement ID</strong> (e.g. <code className="bg-blue-100 px-1 rounded text-xs">G-XXXXXXXXXX</code>) for Google Analytics</li>
          <li>Paste only the <strong>counter number</strong> (e.g. <code className="bg-blue-100 px-1 rounded text-xs">12345678</code>) for Yandex Metrica</li>
          <li>For other tools, paste the full <code className="bg-blue-100 px-1 rounded text-xs">&lt;script&gt;</code> tag in Custom Code</li>
          <li>After saving, click <strong>Publish</strong> to apply changes to the live site</li>
        </ul>
      </div>

      {/* Google Analytics */}
      <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-lg">📊</div>
          <div>
            <p className="font-medium text-gray-800">Google Analytics 4</p>
            <p className="text-xs text-gray-400">analytics.google.com</p>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Measurement ID</label>
          <input
            className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            placeholder="G-XXXXXXXXXX"
            value={tracking.googleAnalytics}
            onChange={(e) => setTracking({ ...tracking, googleAnalytics: e.target.value })}
          />
        </div>
      </div>

      {/* Yandex Metrica */}
      <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-lg">🔴</div>
          <div>
            <p className="font-medium text-gray-800">Yandex Metrica</p>
            <p className="text-xs text-gray-400">metrica.yandex.com</p>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Counter ID</label>
          <input
            className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            placeholder="12345678"
            value={tracking.yandexMetrica}
            onChange={(e) => setTracking({ ...tracking, yandexMetrica: e.target.value })}
          />
        </div>
      </div>

      {/* Custom Head Code */}
      <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-lg">🔧</div>
          <div>
            <p className="font-medium text-gray-800">Custom Code (other tools)</p>
            <p className="text-xs text-gray-400">Microsoft Clarity, Hotjar, Facebook Pixel, etc.</p>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{"<head>"} snippet</label>
          <textarea
            className="mt-1 w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono resize-none"
            rows={5}
            placeholder={"<script>\n// paste your tracking code here\n</script>"}
            value={tracking.customHeadCode}
            onChange={(e) => setTracking({ ...tracking, customHeadCode: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{"<body>"} snippet (noscript, pixels)</label>
          <textarea
            className="mt-1 w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono resize-none"
            rows={3}
            placeholder={"<noscript>...</noscript>"}
            value={tracking.customBodyCode}
            onChange={(e) => setTracking({ ...tracking, customBodyCode: e.target.value })}
          />
        </div>
      </div>

      <SaveButton onClick={save} saving={saving} saved={saved} />
    </div>
  );
}

// ─── CVs Tab ──────────────────────────────────────────────────────────────────

interface CvEntry {
  id: string;
  name: string;
  slug: string;
  birthDate: string;
  module: string;
  rate: string;
  rateCurrency: string;
  ratePeriod: "daily" | "hourly";
  fileName: string;
  fileType: string;
  htmlContent: string;
  uploadedAt: string;
}

function toNameSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g")
    .replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toSlug(id: string, name: string): string {
  return `${id}_${toNameSlug(name)}`;
}

function emptyCv(): CvEntry {
  return { id: Date.now().toString(), name: "", slug: "", birthDate: "", module: "", rate: "", rateCurrency: "EUR", ratePeriod: "daily", fileName: "", fileType: "", htmlContent: "", uploadedAt: "" };
}

function CvsTab() {
  const [cvs, setCvs] = useState<CvEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<CvEntry>(emptyCv());
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/cvs");
      setCvs(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.name.trim()) { alert("Name is required"); return; }
    setSaving(true);
    setUploadProgress("");
    try {
      let fileName = form.fileName;

      let htmlContent = form.htmlContent;
      let fileType = form.fileType;

      if (file) {
        setUploadProgress("Uploading & converting file...");
        const fd = new FormData();
        fd.append("file", file);
        const upRes = await fetch("/api/admin/cvs/upload", { method: "POST", body: fd });
        const upData = await upRes.json();
        if (!upRes.ok) throw new Error(upData.error ?? "Upload failed");
        fileName = upData.fileName;
        htmlContent = upData.htmlContent ?? "";
        fileType = upData.fileType ?? "";
        setUploadProgress("File uploaded.");
      }

      await fetch("/api/admin/cvs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, fileName, htmlContent, fileType }),
      });

      setForm(emptyCv());
      setFile(null);
      setShowForm(false);
      setUploadProgress("");
      await load();
    } catch (err) {
      alert("Error: " + String(err));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    await fetch(`/api/admin/cvs?id=${id}`, { method: "DELETE" });
    setDeleteConfirm(null);
    await load();
  };

  const editEntry = (cv: CvEntry) => {
    setForm(cv);
    setFile(null);
    setShowForm(true);
  };

  if (loading) return <div className="text-sm text-gray-400">Loading...</div>;

  return (
    <div className="space-y-4">
      {/* Info banner */}
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
        <p className="font-semibold mb-1">CV Repository — Hidden but Indexable</p>
        <p className="text-blue-600 text-xs">
          Each CV gets a web profile at <code className="bg-blue-100 px-1 rounded">debuggertr.com/cvs/name-surname</code>.
          Not linked anywhere on the site — share the URL directly or let search engines index it.
        </p>
      </div>

      {/* CV list */}
      {cvs.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Birth Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Module</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Profile URL</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cvs.map((cv) => (
                <tr key={cv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <a
                      href={`/cvs/${cv.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {cv.name}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{cv.birthDate}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">{cv.module}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-mono text-xs">
                    {cv.rateCurrency === "EUR" ? "€" : cv.rateCurrency === "USD" ? "$" : cv.rateCurrency === "GBP" ? "£" : cv.rateCurrency}{cv.rate} / {cv.ratePeriod === "daily" ? "day" : "hr"}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {cv.slug ? (
                      <span className="text-xs text-gray-400 font-mono">/cvs/{cv.slug}</span>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => editEntry(cv)}
                        className="text-xs text-gray-500 hover:text-blue-600 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                      >
                        Edit
                      </button>
                      {deleteConfirm === cv.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => remove(cv.id)} className="text-xs text-white bg-red-600 px-2 py-1 rounded hover:bg-red-700">Delete</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(cv.id)} className="text-xs text-red-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50 transition-colors">Delete</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cvs.length === 0 && !showForm && (
        <div className="text-center py-12 text-gray-400 text-sm">No CVs added yet.</div>
      )}

      {/* Add / Edit form */}
      {showForm && (
        <div className="p-6 bg-white border border-gray-200 rounded-xl space-y-4">
          <p className="font-semibold text-gray-800">{form.uploadedAt ? "Edit CV Entry" : "Add New CV"}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name *</label>
              <input
                className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mustafa Yılmaz"
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setForm({ ...form, name, slug: toSlug(form.id, name) });
                }}
              />
              {form.slug && (
                <p className="text-xs text-gray-400 mt-1 font-mono">/cvs/{form.slug}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Birth Date</label>
              <input
                type="date"
                className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.birthDate}
                onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Module / Expertise</label>
              <input
                className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="SAP EWM, ABAP"
                value={form.module}
                onChange={(e) => setForm({ ...form, module: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rate</label>
              <div className="mt-1 flex gap-2">
                <div className="flex rounded-lg border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 flex-1">
                  <select
                    className="px-2 py-2 text-sm bg-gray-50 border-r border-gray-200 focus:outline-none text-gray-600"
                    value={form.rateCurrency}
                    onChange={(e) => setForm({ ...form, rateCurrency: e.target.value })}
                  >
                    <option value="EUR">€ EUR</option>
                    <option value="USD">$ USD</option>
                    <option value="GBP">£ GBP</option>
                    <option value="CHF">CHF</option>
                  </select>
                  <input
                    type="number"
                    className="flex-1 px-3 py-2 text-sm focus:outline-none min-w-0"
                    placeholder="800"
                    value={form.rate}
                    onChange={(e) => setForm({ ...form, rate: e.target.value })}
                  />
                </div>
                <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                  {(["daily", "hourly"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setForm({ ...form, ratePeriod: p })}
                      className={`px-3 py-2 text-xs font-medium transition-colors ${form.ratePeriod === p ? "bg-blue-600 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                    >
                      {p === "daily" ? "/ day" : "/ hr"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">CV File (PDF or DOCX)</label>
            <div className="mt-1 flex items-center gap-3">
              <label className="cursor-pointer px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
                {file ? file.name : "Choose file..."}
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </label>
              {form.fileName && !file && (
                <span className="text-xs text-gray-400 font-mono">Current: {form.fileName}</span>
              )}
            </div>
          </div>

          {uploadProgress && (
            <p className="text-xs text-blue-600">{uploadProgress}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving}
              className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-60 font-medium"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => { setShowForm(false); setForm(emptyCv()); setFile(null); }}
              className="px-5 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!showForm && (
        <button
          onClick={() => { setForm(emptyCv()); setShowForm(true); }}
          className="w-full py-3 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm font-medium"
        >
          + Add New CV
        </button>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

type Tab = "references" | "statistics" | "company" | "cvs" | "tracking" | "publish";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("references");
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/data");
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      setData(await res.json());
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert("Save failed: " + String(err));
    } finally {
      setSaving(false);
    }
  };

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: "references", label: "References", icon: "📋" },
    { key: "statistics", label: "Statistics", icon: "📊" },
    { key: "company", label: "Company Info", icon: "🏢" },
    { key: "cvs", label: "CV Repository", icon: "👤" },
    { key: "tracking", label: "SEO & Tracking", icon: "📈" },
    { key: "publish", label: "Publish", icon: "🚀" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Image src="/images/logo-dark.png" alt="DebuggerTR" width={140} height={38} style={{ width: "auto", height: "2rem" }} className="object-contain" loading="eager" priority />
              <span className="text-gray-300 select-none">|</span>
              <span className="text-sm font-medium text-gray-600">Admin Panel</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">← View Site</a>
              {tab !== "publish" && tab !== "tracking" && tab !== "cvs" && data && (
                <SaveButton onClick={save} saving={saving} saved={saved} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Tab navigation */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6 w-fit flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t.key
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <span className="text-sm text-gray-400">Loading data...</span>
            </div>
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
            <p className="font-semibold text-red-800 mb-2">Failed to load data</p>
            <p className="text-xs text-red-700 font-mono mb-4 break-all">{error}</p>
            <button onClick={loadData} className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
              Try Again
            </button>
          </div>
        ) : data ? (
          <>
            {tab === "references" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">References</h2>
                    <p className="text-sm text-gray-400">{data.references.length} clients · EN / TR / LV</p>
                  </div>
                </div>
                <ReferencesTab refs={data.references} onChange={(refs) => setData({ ...data, references: refs })} />
              </div>
            )}

            {tab === "statistics" && (
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Statistics</h2>
                  <p className="text-sm text-gray-400">Numbers shown in the homepage stats section</p>
                </div>
                <StatisticsTab stats={data.stats} onChange={(stats) => setData({ ...data, stats })} />
              </div>
            )}

            {tab === "company" && (
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Company Information</h2>
                  <p className="text-sm text-gray-400">Contact and legal details on the Contact page</p>
                </div>
                <CompanyTab company={data.company} onChange={(company) => setData({ ...data, company })} />
              </div>
            )}

            {tab === "cvs" && (
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-800">CV Repository</h2>
                  <p className="text-sm text-gray-400">Manage consultant CVs — files are accessible via direct URL only</p>
                </div>
                <CvsTab />
              </div>
            )}

            {tab === "tracking" && <TrackingTab />}

            {tab === "publish" && <PublishTab />}
          </>
        ) : null}
      </div>
    </div>
  );
}
