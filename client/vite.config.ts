import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// ✅ Remove duplicate imports and make async plugin conditional
export default defineConfig(async () => {
  const plugins = [
    react(),
    runtimeErrorOverlay(),
  ];

  // ✅ Optional plugin for Replit
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    plugins.push(cartographer());
  }

  return {
    base: '/',

    plugins,
    resolve: {
      alias: {
  "@": path.resolve(__dirname, "src"),
  "@shared": path.resolve(__dirname, "shared"), // Now inside client/
  "@assets": path.resolve(__dirname, "attached_assets"),
},
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
      proxy: {
        "/api": "http://localhost:5000"
      }
    },
  };
});

