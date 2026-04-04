import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// Admin API is dev-only; force-static so the production static export build succeeds.
export const dynamic = "force-static";

const PROJECT_ROOT = process.env.PROJECT_ROOT ?? process.cwd();
const CVS_DIR = path.join(PROJECT_ROOT, "public", "cvs");

// Post-process mammoth HTML: auto-link URLs/emails, upgrade CAPS bold headers to h2
function enhanceHtml(html: string): string {
  // 1a. Convert ALL-CAPS bold headings → h2
  html = html.replace(
    /<p><strong>([A-Z][A-Z0-9 &\/\-–|,\.]{3,})<\/strong><\/p>/g,
    (_, text) => `<h2>${text}</h2>`
  );
  // 1b. Convert Title-Case bold headings outside tables → h2
  //     Split on table regions so we don't promote job titles inside table cells
  {
    const parts = html.split(/(<table[\s\S]*?<\/table>)/gi);
    html = parts.map((part, i) => {
      if (i % 2 === 1) return part; // table content — skip
      return part.replace(
        /<p><strong>([A-Za-zÀ-ÿİıĞğŞşÇçÖöÜü][A-Za-zÀ-ÿİıĞğŞşÇçÖöÜü\s]{2,73})<\/strong><\/p>/g,
        (match, text) => {
          const t = text.trim();
          // Skip if it looks like a job title (contains pipe, @, or is too long)
          if (t.includes("|") || t.includes("@") || t.includes("·") || t.length > 75) return match;
          return `<h2>${t}</h2>`;
        }
      );
    }).join("");
  }

  // 2. Auto-link plain-text URLs (not already inside an <a> tag)
  html = html.replace(
    /(?<!href="|href='|>)(https?:\/\/[^\s<"']+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // 3. Auto-link www. URLs
  html = html.replace(
    /(?<!href="|href='|\/\/)(www\.[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}[^\s<"']*)/g,
    '<a href="https://$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // 4. Auto-link linkedin.com/in/... paths
  html = html.replace(
    /(?<!href="|>)(linkedin\.com\/(?:in|company)\/[a-zA-Z0-9\-\/]+)/g,
    '<a href="https://$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // 5. Auto-link email addresses
  html = html.replace(
    /(?<!href="mailto:|>)([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g,
    '<a href="mailto:$1">$1</a>'
  );

  // 6. Phone numbers with ✆ symbol — wrap in tel: link
  html = html.replace(
    /✆\s*([\+\d\s\-\(\)]{7,})/g,
    (_, num) => `✆ <a href="tel:${num.replace(/\s/g, "")}">${num.trim()}</a>`
  );

  return html;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const ext = path.extname(file.name).toLowerCase();
    if (![".pdf", ".docx", ".doc"].includes(ext)) {
      return NextResponse.json({ error: "Only PDF and DOCX files allowed" }, { status: 400 });
    }

    if (!fs.existsSync(CVS_DIR)) {
      fs.mkdirSync(CVS_DIR, { recursive: true });
    }

    const safeName = file.name
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .replace(/__+/g, "_");

    const filePath = path.join(CVS_DIR, safeName);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    let htmlContent = "";
    if (ext === ".docx" || ext === ".doc") {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const mammoth = require("mammoth");
        const result = await mammoth.convertToHtml(
          { buffer },
          {
            styleMap: [
              "p[style-name='Heading 1'] => h1:fresh",
              "p[style-name='Heading 2'] => h2:fresh",
              "p[style-name='Heading 3'] => h3:fresh",
              "p[style-name='Title'] => h1:fresh",
              "p[style-name='Subtitle'] => p.subtitle:fresh",
            ],
            convertImage: mammoth.images.imgElement(function(image: { read: (enc: string) => Promise<string>; contentType: string }) {
              return image.read("base64").then(function(data: string) {
                return { src: `data:${image.contentType};base64,${data}` };
              });
            }),
          }
        );
        htmlContent = enhanceHtml(result.value);
      } catch (e) {
        console.error("Mammoth conversion failed:", e);
      }
    }

    return NextResponse.json({ ok: true, fileName: safeName, htmlContent, fileType: ext.replace(".", "") });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
