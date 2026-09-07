import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    // Allow the sandbox live-preview host (and any local hostname) to reach the dev server.
    allowedHosts: true,
    cors: true,
  },
  build: {
    target: "es2020",
    cssTarget: "chrome90",
    sourcemap: false,
  },
});
