// This project was exported from Lovable, which normally builds it with
// @lovable.dev/vite-tanstack-config (a private wrapper tuned for Lovable's own
// Cloudflare-based hosting). That wrapper isn't available/appropriate when
// self-hosting on a plain Node platform (Render, Railway, a VPS, etc.), so this
// config wires up the same underlying plugins directly, targeting a standard
// Node.js server instead of Cloudflare Workers.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
    }),
    // Auto-detects a plain Node.js server target on generic hosts like Render/Railway.
    // Can still be forced with the NITRO_PRESET env var if auto-detection ever misfires
    // (see RENDER_DEPLOY.md).
    nitro(),
    viteReact(),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
});
