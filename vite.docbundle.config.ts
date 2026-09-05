import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Self-contained bundle for the standalone documentation exports:
// Radix and every other dependency are bundled in; only React stays external,
// because the doc shell supplies it through window shims.
export default defineConfig({
  plugins: [react()],
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    lib: { entry: path.resolve(__dirname, "src/index.ts"), formats: ["es"], fileName: () => "docbundle.mjs" },
    outDir: "dist-docbundle",
    emptyOutDir: true,
    minify: true,
    rollupOptions: {
      external: ["react", "react-dom", "react-dom/client", "react/jsx-runtime"],
      output: { inlineDynamicImports: true }
    }
  }
});
