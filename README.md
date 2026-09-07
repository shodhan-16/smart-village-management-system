# Shodhan — Cloud Engineer · Interactive Portfolio

A premium, cinematic, scroll-driven portfolio for **Shodhan**, an aspiring Cloud
Engineer from Karnataka, India. Built with React, TypeScript, Tailwind CSS and
Framer Motion. Gaming-grade presentation, employment-grade honesty.

> 📘 **New here? Start with [`GUIDE.md`](./GUIDE.md)** — a step-by-step guide
> for running the project in VS Code, editing content/colors/animations, and
> hosting it (Vercel / Netlify / GitHub Pages).

## Highlights

- **Boot-sequence hero** — `booting shodhan.system → access granted`
- **Scroll-driven story** — 9 chapters with a `01 / 09` progress rail
- **Interactive command center** — rotating infrastructure radar
- **Cloud architecture map** — EC2 → VPC → IAM → S3 → RDS → CloudWatch
- **Mission-style projects** — flagship case study with clickable architecture nodes
- **Live resume PDF** — generated from the same data file (`npm run resume`)
- **Reduced-motion aware**, keyboard accessible, semantic HTML, SEO/OG metadata

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # production build
npm run preview    # preview the production build
npm run resume     # regenerate public/resume/Shodhan_Cloud_Engineer.pdf
```

## Edit your links (important)

All identity, links, projects, certifications and skills live in one file:

```
src/data/content.ts
```

Empty fields are intentionally placeholders — add your real URLs there:

| Field | Where |
| --- | --- |
| GitHub / LinkedIn / Email | `links` at the top of `src/data/content.ts` |
| Project repos & demos | `projects[].github` / `projects[].demo` |
| Certificate credentials | `certifications[].credential` |
| Resume | replace `public/resume/Shodhan_Cloud_Engineer.pdf` or edit the generator |

## Structure

```
src/
├── components/      # Background, Header, CaseStudy, ScrollProgress, ...
├── sections/        # Hero, About, Education, Skills, CloudJourney, ...
├── hooks/           # useReducedMotion, useActiveSection, useLockBody
├── lib/             # motion presets, smooth scroll
├── data/            # content.ts — single source of truth
└── styles/          # Tailwind + design primitives
scripts/             # generate-resume.mjs (zero-dependency PDF writer)
```

## Notes

- No invented experience, statistics or companies — content matches Shodhan's
  actual background and projects.
- Motion fully respects `prefers-reduced-motion`; mobile gets a reduced
  particle count and simplified effects automatically.
