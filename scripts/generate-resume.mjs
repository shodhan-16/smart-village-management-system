/**
 * Generates a real, print-ready A4 PDF resume from src/data/content.ts.
 * Zero dependencies — writes valid PDF 1.4 with standard Helvetica fonts.
 *
 * Run:  npm run resume
 * Output: public/resume/Shodhan_Cloud_Engineer.pdf
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "public", "resume", "Shodhan_Cloud_Engineer.pdf");

// Load the single source of truth (Node 22+ strips TS types natively).
const { identity, educationTimeline, skillCategories, projects, certifications } = await import(
  "../src/data/content.ts"
);

/* ------------------------------------------------------------------ */
/*  Sanitizing + text layout helpers                                   */
/* ------------------------------------------------------------------ */

const sanitize = (s) =>
  String(s)
    .replace(/[\u2014\u2013]/g, "-")
    .replace(/[\u2018\u2019\u201C\u201D]/g, "'")
    .replace(/\u00B7/g, "/")
    .replace(/[^\x20-\x7E]/g, "");

const escapePdf = (s) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

const wrap = (text, maxChars) => {
  const words = sanitize(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > maxChars) {
      if (line) lines.push(line.trim());
      line = word;
    } else {
      line = (line + " " + word).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines;
};

/* ------------------------------------------------------------------ */
/*  Minimal PDF builder                                                */
/* ------------------------------------------------------------------ */

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 54;
const CONTENT_W = PAGE_W - MARGIN * 2;

const ACCENT = "0.30 0.55 1"; // electric blue
const INK = "0.93 0.96 1";
const DARK = "0.05 0.08 0.14";
const STEEL = "0.42 0.47 0.56";

class Doc {
  constructor() {
    this.pages = [[]]; // array of op arrays
    this.trackState = true;
  }

  get yTop() {
    return this._yTop;
  }

  ensure(height) {
    if (this._yTop + height > PAGE_H - 54) {
      this.pages.push([]);
      this._yTop = 88;
    }
  }

  begin() {
    this._yTop = 96;
  }

  ops() {
    return this.pages[this.pages.length - 1];
  }

  color(r, g, b) {
    this.ops().push(`${r} ${g} ${b} rg`);
  }

  text(str, { size = 9.5, font = "F1", color = DARK, x = MARGIN, yTop, bold = false, spacing = 0 } = {}) {
    const at = yTop ?? this._yTop;
    const y = PAGE_H - at;
    this.color(...(color.split(" ").map(Number)));
    const t = `BT /${font} ${size} Tf${spacing ? ` ${spacing} Tw` : ""} ${x} ${y.toFixed(2)} Td (${escapePdf(
      sanitize(str)
    )}) Tj ET`;
    this.ops().push(t);
    this._yTop = at + size + 4;
  }

  // Advances baseline without drawing.
  skip = (amount) => {
    this._yTop += amount;
  };

  rule({ yTop, thickness = 0.7, color = "0.12 0.16 0.24", x = MARGIN, width = CONTENT_W } = {}) {
    const y = PAGE_H - (yTop ?? this._yTop);
    this.color(...(color.split(" ").map(Number)));
    this.ops().push(`${x} ${y.toFixed(2)} ${width} ${thickness} re f`);
  }

  rect({ x, yTop, width = CONTENT_W, height, color = ACCENT }) {
    const y = PAGE_H - yTop - height;
    this.color(...(color.split(" ").map(Number)));
    this.ops().push(`${x} ${y.toFixed(2)} ${width} ${height} re f`);
  }

  sectionTitle(index, title) {
    this.ensure(56);
    this._yTop += 6;
    this.text(`${index} // ${title}`, { size: 9, font: "F2", color: ACCENT, spacing: 0.4 });
    this._yTop += 1;
    this.rule({ yTop: this._yTop, thickness: 0.5 });
    this._yTop += 8;
  }
}

const doc = new Doc();
doc.begin();

/* ----------------------------- HEADER ------------------------------ */

doc.rect({ yTop: 0, height: 9, width: PAGE_W, x: 0, color: ACCENT });
doc.text("SHODHAN", { size: 28, font: "F2", yTop: 62, color: DARK });
doc.text(identity.role.toUpperCase(), { size: 10.5, font: "F2", yTop: 98, color: ACCENT, spacing: 1.2 });
doc.text(`${identity.location}  |  BE - Information Science & Engineering  |  2023 - 2027`, {
  size: 9,
  yTop: 120,
  color: STEEL,
});
doc._yTop = 142;
doc.rule({ yTop: 142, thickness: 1.1, color: ACCENT });

/* ----------------------------- SUMMARY ----------------------------- */

doc.sectionTitle("01", "PROFILE");
for (const line of wrap(identity.tagline, 104)) {
  doc.text(line, { size: 9, yTop: doc._yTop, color: DARK });
}
doc.text("Current mission: " + identity.mission, { size: 9, yTop: doc._yTop + 4, color: STEEL });

/* ---------------------------- EDUCATION ---------------------------- */

doc.sectionTitle("02", "EDUCATION");
for (const item of educationTimeline) {
  doc.text(item.degree, { size: 10, font: "F2", yTop: doc._yTop, color: DARK });
  doc.text(`${item.place} - ${item.city}  |  ${item.period}`, { size: 9, yTop: doc._yTop, color: STEEL });
  for (const line of wrap(item.note, 110)) {
    doc.text(line, { size: 9, yTop: doc._yTop, color: DARK });
  }
}

/* ----------------------------- SKILLS ------------------------------ */

doc.sectionTitle("03", "SKILL MATRIX");
for (const cat of skillCategories) {
  doc.ensure(38);
  doc.text(cat.label.toUpperCase(), { size: 8, font: "F2", yTop: doc._yTop, color: ACCENT, spacing: 0.6 });
  doc.text(cat.skills.map((s) => s.name).join("  /  "), { size: 9, yTop: doc._yTop, color: DARK });
}

/* ---------------------------- PROJECTS ----------------------------- */

doc.sectionTitle("04", "PROJECTS");
for (const p of projects) {
  doc.ensure(64);
  doc.text(`PROJECT ${p.index} - ${p.name}`, { size: 10, font: "F2", yTop: doc._yTop, color: DARK });
  for (const line of wrap(p.tagline, 108)) {
    doc.text(line, { size: 9, yTop: doc._yTop, color: DARK });
  }
  doc.text(p.stack.join("  /  "), { size: 8.5, yTop: doc._yTop, color: STEEL });
  doc._yTop += 2;
}

/* -------------------------- CERTIFICATIONS -------------------------- */

doc.sectionTitle("05", "CERTIFICATIONS & ACHIEVEMENTS");
for (const c of certifications) {
  doc.text(`${c.name}  |  ${c.issuer}`, { size: 9, yTop: doc._yTop, color: DARK });
  doc.text(c.date, { size: 8, yTop: doc._yTop, color: STEEL });
}

/* ----------------------------- FOOTER ------------------------------ */

const contentBottom = doc._yTop;
doc._yTop = PAGE_H - 64;
doc.rule({ yTop: PAGE_H - 64, thickness: 0.5 });
doc.text("Generated from shodhan portfolio data - keep in sync with npm run resume", {
  size: 8,
  yTop: PAGE_H - 54,
  color: STEEL,
});

/* ------------------------------------------------------------------ */
/*  Assemble PDF                                                       */
/* ------------------------------------------------------------------ */

const streams = doc.pages.map((ops) => ops.join("\n"));
const streamObjs = streams.map((s) => `<< /Length ${Buffer.byteLength(s)} >>\nstream\n${s}\nendstream`);

// Object layout: 1 Catalog, 2 Pages, 3..3+n-1 Pages, then fonts + contents.
const pageCount = streams.length;
const fontObj = { helv: 1 + 1 + pageCount, helvBold: 1 + 1 + pageCount + 1 };
const contentStarts = 1 + 1 + pageCount + 2;
const contentObj = (i) => contentStarts + i;

const objects = [
  `<< /Type /Catalog /Pages 2 0 R >>`,
  `<< /Type /Pages /Kids [${Array.from({ length: pageCount }, (_, i) => `${3 + i} 0 R`).join(" ")}] /Count ${pageCount} >>`,
];

for (let i = 0; i < pageCount; i++) {
  objects.push(
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
      `/Resources << /Font << /F1 ${fontObj.helv} 0 R /F2 ${fontObj.helvBold} 0 R >> >> ` +
      `/Contents ${contentObj(i)} 0 R >>`
  );
}

objects.push(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`);
objects.push(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`);
for (const s of streamObjs) objects.push(s);

let pdf = "%PDF-1.4\n";
const offsets = [];
for (let i = 0; i < objects.length; i++) {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
}

const xrefStart = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const off of offsets) {
  pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, pdf, "utf8");

console.log(`Resume generated → public/resume/Shodhan_Cloud_Engineer.pdf (${pageCount} page${pageCount > 1 ? "s" : ""})`);

// Sanity: content must not overlap the footer (footer starts at PAGE_H - 64).
if (contentBottom > PAGE_H - 76) {
  console.warn(`Warning: content bottom is ${contentBottom.toFixed(0)}px, close to the footer at ${PAGE_H - 64}px.`);
}
