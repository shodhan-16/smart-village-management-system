import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05070e",
        ink: "#080d18",
        panel: "#0c1322",
        line: "rgba(148,163,184,0.12)",
        steel: "#8791a6",
        mist: "#cbd6e8",
        frost: "#eef4ff",
        electric: {
          DEFAULT: "#4d8dff",
          bright: "#7db4ff",
          dim: "#2b5fd9",
        },
        cyanflare: "#3ee0ff",
        violetflare: "#a78bfa",
        signal: "#4ade80",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        shell: "76rem",
      },
      boxShadow: {
        glow: "0 0 24px rgba(77,141,255,0.22), 0 0 80px rgba(77,141,255,0.08)",
        "glow-cyan": "0 0 24px rgba(62,224,255,0.18), 0 0 80px rgba(62,224,255,0.06)",
      },
      animation: {
        "spin-slow": "spin 26s linear infinite",
        "spin-slower": "spin 40s linear infinite reverse",
        blink: "blink 1.1s steps(2, start) infinite",
        float: "float 7s ease-in-out infinite",
        "pulse-dot": "pulseDot 2.4s ease-out infinite",
        "grid-pan": "gridPan 18s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseDot: {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "80%, 100%": { transform: "scale(2.4)", opacity: "0" },
        },
        gridPan: {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "64px 64px" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
