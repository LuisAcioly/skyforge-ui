import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

function injectLibraryCss(): Plugin {
  return {
    name: "skyforge-inject-library-css",
    generateBundle(_, bundle) {
      for (const asset of Object.values(bundle)) {
        if (asset.type === "chunk" && asset.isEntry && !asset.code.startsWith('import "./styles.css";')) {
          asset.code = `import "./styles.css";\n${asset.code}`;
        }
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), injectLibraryCss()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index"
    },
    rollupOptions: {
      external: (id) =>
        id === "react" ||
        id === "react-dom" ||
        id === "react/jsx-runtime" ||
        id.startsWith("@radix-ui/"),
      output: {
        assetFileNames: "styles.css"
      }
    }
  }
});
