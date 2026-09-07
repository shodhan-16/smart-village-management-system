/**
 * Quick SSR smoke test: imports the app through Vite and renders it to
 * a string. Catches render-time crashes without a browser.
 * Run: node scripts/smoke.mjs
 */
import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const { default: App } = await vite.ssrLoadModule("/src/App.tsx");
  const html = renderToString(createElement(App));
  const checks = [
    "SHODHAN.",
    "EXPLORE MY JOURNEY",
    "Moodlakatte",
    "SKILL MATRIX",
    "Smart Village Management System",
    "AWS Cloud Quest",
    "BUILD SOMETHING",
    "© 2026 Shodhan",
  ];
  const missing = checks.filter((c) => !html.includes(c));
  console.log(`SSR render OK — ${html.length} chars, ${missing.length} missing markers`);
  if (missing.length) {
    console.error("Missing:", missing);
    process.exitCode = 1;
  }
} finally {
  await vite.close();
}
