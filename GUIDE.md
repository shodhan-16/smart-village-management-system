# STEP-BY-STEP GUIDE — Run, Edit & Host Shodhan's Portfolio

> This file lives inside the project (`GUIDE.md`). Keep it open in VS Code and
> follow the steps in order. Every file mentioned here exists in this repo.

---

## PART 0 — What you already have

```
smart-village-management-system/
├── index.html                  → page shell + SEO/OG tags + fonts
├── package.json                → scripts (dev / build / preview / resume)
├── vite.config.ts              → dev server + build settings
├── tailwind.config.ts          → ALL colors, fonts, animations (design tokens)
├── public/
│   ├── favicon.svg
│   ├── og.jpg                  → social share image
│   └── resume/Shodhan_Cloud_Engineer.pdf   → downloadable resume
├── scripts/
│   ├── generate-resume.mjs     → generates the resume PDF (npm run resume)
│   └── smoke.mjs               → quick render test (node scripts/smoke.mjs)
└── src/
    ├── main.tsx                → React entry point (usually don't touch)
    ├── App.tsx                 → assembles all sections in order
    ├── data/content.ts         → ★ EDIT MOST THINGS HERE (name, links, skills, projects…)
    ├── components/             → reusable UI (Header, Footer, cards, loader…)
    ├── sections/               → one file per chapter (Hero, About, Skills…)
    ├── hooks/                  → reduced-motion, active section, etc.
    ├── lib/motion.ts           → animation presets (easing, delays)
    └── styles/globals.css      → design primitives (buttons, cards, HUD, scanlines)
```

**Golden rule:** text, links, skills, projects and certificates are all in
`src/data/content.ts`. If you only want to change *content*, you rarely touch
anything else.

---

## PART 1 — Install software on your machine (once)

1. **Install Node.js 18+** (LTS) → https://nodejs.org
2. **Install VS Code** → https://code.visualstudio.com
3. **Get the project on your machine** (pick one):

   **Option A — ZIP (no git):**
   - https://github.com/shodhan-16/smart-village-management-system/tree/arena/01a07a5c-smart-village-management-syste
   - Click **Code → Download ZIP**, extract it.

   **Option B — git clone:**
   ```bash
   git clone -b arena/01a07a5c-smart-village-management-syste \
     https://github.com/shodhan-16/smart-village-management-system.git
   ```

4. **Open VS Code → File → Open Folder** → select the folder.

---

## PART 2 — Install dependencies & run it

Open VS Code's **Terminal** (Ctrl + ` or View → Terminal) inside the project folder:

```bash
npm install     # ~4-15 seconds, only needed the first time
npm run dev     # starts the dev server
```

Then open **http://localhost:5173** in your browser.

- The dev server hot-reloads: edit a file, save, and the page updates instantly.
- Stop it anytime with **Ctrl + C** in the terminal.

---

## PART 3 — Edit your personal details (do this first)

Open **`src/data/content.ts`**. At the top you'll find:

```ts
export const identity = {
  name: "Shodhan",
  role: "Cloud Engineer",
  education: "BE — Information Science & Engineering",
  college: "Moodlakatte Institute of Technology",
  location: "Kundapura, Karnataka, India",
  years: "2023 — 2027",
  tagline: "Building reliable cloud-powered systems...",
};

export const links = {
  github: "",      // ← put https://github.com/your-username
  linkedin: "",    // ← put https://www.linkedin.com/in/your-username
  email: "",       // ← put you@example.com
  resume: "/resume/Shodhan_Cloud_Engineer.pdf",
};
```

**Step-by-step:**
1. Change `name`, `role`, text → save → see it change in the browser.
2. Add your real GitHub/LinkedIn/email URLs.
3. Scroll down in the same file to find `projects` and `certifications` — add
   your real repo, demo and credential URLs (search for `TODO`).

> Until you add links, the site shows small "LINK PENDING" hints instead of
> inventing anything — that's deliberate.

---

## PART 4 — Change colors / fonts / look

Open **`tailwind.config.ts`**:

```ts
colors: {
  void: "#020409",       // page background (deep near-black)
  ink: "#05080f",        // modal background
  panel: "#070c16",      // panel surface
  line: "rgba(125,180,255,0.13)",  // hairlines/borders
  steel: "#8494ad",      // secondary text
  mist: "#c6d3e6",       // body text
  frost: "#eaf2ff",      // headings
  electric: { DEFAULT: "#4d8dff", bright: "#7db4ff", dim: "#2b5fd9" },  // main accent
  cyanflare: "#3ee0ff",  // neon cyan accent
  violetflare: "#a78bfa",// purple accent
  signal: "#4ade80",     // green "available" dots
},
fontFamily: {
  display: ['"Space Grotesk"', ...],   // big headings
  body: ["Inter", ...],                // paragraphs
  mono: ['"JetBrains Mono"', ...],     // terminal/labels/buttons
},
```

**Try this:** change `electric.DEFAULT` to `#00e5ff` (cyan) or `#a78bfa` (purple)
→ save → the whole theme recolors instantly.

**Fonts:** the font files are loaded in `index.html` (Google Fonts `<link>`).
Swap the names there AND in `tailwind.config.ts` if you want different fonts.

---

## PART 5 — Change the loading screen

Open **`src/sections/Hero.tsx`**, search for these:

| What | Where | Tip |
| --- | --- | --- |
| Loading speed | `duration: 3.6` inside `animate(progress, [...])` | lower = faster |
| Hold points / plateaus | `[0, 18, 18, 42, 42, 66, 66, 88, 100]` | the repeated numbers are the pauses |
| Zoom intensity | `scale: 4.4, opacity: 0, filter: "blur(16px)"` | raise scale = more dramatic |
| Phase names | `const PHASES = [...]` | rename freely |
| Boot log lines | `const LOG_LINES = [...]` | rename freely |
| Tips | `const TIPS = [...]` | your own loading tips |

**Remove the loader completely (optional):**
In the same file, change the two state defaults to `true`:

```ts
const [revealed, setRevealed] = useState(true);
const [introDone, setIntroDone] = useState(true);
```

(You can also lower/raise the intro by changing `duration` only.)

---

## PART 6 — Edit each section's text

Every chapter is one file in `src/sections/`:

| Section | File |
| --- | --- |
| Hero / intro | `sections/Hero.tsx` |
| About | `sections/About.tsx` |
| Education | `sections/Education.tsx` |
| Skills | `sections/Skills.tsx` |
| Cloud Journey | `sections/CloudJourney.tsx` |
| Projects | `sections/Projects.tsx` |
| Certifications | `sections/Certifications.tsx` |
| What I Build | `sections/WhatIBuild.tsx` |
| Philosophy | `sections/Philosophy.tsx` |
| Contact | `sections/Contact.tsx` |

Most text is pulled from `content.ts`. If you can't find a string in
`content.ts`, it's hard-coded inside the section file — search for it with
**Ctrl+F** in `src/sections/*.tsx`.

**Add/remove a section** (advanced):
1. Create `src/sections/MySection.tsx` (copy an existing one as a template).
2. Register it in `src/App.tsx` (import + place `<MySection />`).
3. Add its id to `SECTION_ORDER` and `SECTION_META` in `content.ts` (so the
   progress rail shows it).

---

## PART 7 — Turn off/on animations

- **Everything respects `prefers-reduced-motion`** already (system setting:
  Windows: Settings → Accessibility → Visual effects → Animation effects).
- If you want the whole site static, add this to `src/styles/globals.css`:
  ```css
  * { animation: none !important; transition: none !important; }
  ```
- Individual effects live in `src/components/` (Reveal, SectionGate,
  ScrollProgress, HudCorners…) and `src/lib/motion.ts` (easing, delays).

---

## PART 8 — Build for production (before hosting)

```bash
npm run build      # creates a fast production version in dist/
npm run preview    # test that build locally → http://localhost:4173
npm run resume     # re-generates the resume PDF from content.ts
```

- `dist/` is pure static files (HTML/CSS/JS/images/pdf) — that's what you host.
- If `npm run build` shows errors, they're TypeScript errors; the message tells
  you the file + line.

---

## PART 9 — Host it (choose one)

### Option A — Vercel (recommended, ~2 minutes)

1. https://vercel.com → **Sign up with GitHub**.
2. **Add New → Project** → select `smart-village-management-system`.
3. Vercel auto-detects **Vite**. Settings (usually fine as-is):
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy** → you get `https://your-project.vercel.app`.
5. Every future push to the branch re-deploys automatically.

> After deploying, open `index.html` and replace `/og.jpg` with your real URL
> (e.g. `https://your-project.vercel.app/og.jpg`) so social shares work.

### Option B — Netlify

1. https://netlify.com → **Add new site → Import from GitHub**.
2. Build command `npm run build`, publish directory `dist`, deploy.

### Option C — GitHub Pages (extra steps)

In `vite.config.ts` add a base path:
```ts
export default defineConfig({
  base: "/smart-village-management-system/",   // your repo name
  ...
});
```
Then in `index.html` change `/favicon.svg` → `./favicon.svg`,
`/og.jpg` → `./og.jpg`, and in `content.ts` set
`resume: "./resume/Shodhan_Cloud_Engineer.pdf"`.
Then: `npm run build` → push `dist/` to `gh-pages` branch
(or use Settings → Pages → Source: GitHub Actions).
Simplest: use **Vercel/Netlify** instead — no base-path fiddling.

### Option D — Host locally / on your own server

```bash
npm run build
npx serve dist        # or any static file server
```

---

## PART 10 — Daily workflow in VS Code

```
1. Code is saved on the branch  arena/01a07a5c-smart-village-management-syste
2. Terminal:
   npm run dev          → develop (auto-reload)
   npm run build        → check it compiles cleanly
3. Git (optional):
   git add .
   git commit -m "your change"
   git push              → updates GitHub + auto-redeploys on Vercel/Netlify
```

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `npm: command not found` | Install Node.js from nodejs.org, restart VS Code |
| `vite: not found` | Run `npm install` again in the project folder |
| Port already in use (5173) | `npm run dev -- --port 5174`, or close the other server |
| Page loads but looks unstyled | Hard refresh (Ctrl/Cmd + Shift + R) |
| `typescript` errors at build | Read the error (file + line) and fix; ask me anytime |
| Want to reset changes | `git checkout -- .` (careful — deletes unsaved work) |

---

## Need me to do it for you?

While this project is in this workspace, you can ask me directly, for example:

- *"Change the accent color to purple"*
- *"Make the loader faster"*
- *"Add a Projects section item"*
- *"Fix the mobile menu"*

I'll edit, verify the build, and the preview updates for you.
