/* import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ✅ now relative to client/
      "@shared": path.resolve(__dirname, "shared"), // ✅ go up to root
      "@assets": path.resolve(__dirname, "../attached_assets"), // ✅ go up to root
    },
  },
  build: {
    outDir: "dist", // ✅ stays inside client/
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["/.*"],
    },
    proxy: {
      "/api": "http://localhost:5000"
    }
  },
}); */



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
    base: './',

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

