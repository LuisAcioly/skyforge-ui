import { readFileSync } from "node:fs";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const fontLicenses = ["OFL-Figtree.txt", "OFL-BebasNeue.txt"];

// Library-output plugins must not touch Storybook or Vitest builds, which load
// this config without `build.lib`.
const isLibraryBuild: Plugin["apply"] = (config, { command }) => command === "build" && Boolean(config.build?.lib);

function injectLibraryCss(): Plugin {
  return {
    name: "skyforge-inject-library-css",
    apply: isLibraryBuild,
    generateBundle(_, bundle) {
      for (const asset of Object.values(bundle)) {
        if (asset.type === "chunk" && asset.isEntry && !asset.code.startsWith('import "./styles.css";')) {
          asset.code = `import "./styles.css";\n${asset.code}`;
        }
      }
    }
  };
}

// The OFL requires the license to travel with the font files.
function emitFontLicenses(): Plugin {
  return {
    name: "skyforge-emit-font-licenses",
    apply: isLibraryBuild,
    generateBundle() {
      for (const fileName of fontLicenses) {
        this.emitFile({
          type: "asset",
          fileName: `fonts/${fileName}`,
          source: readFileSync(new URL(`./src/assets/fonts/${fileName}`, import.meta.url))
        });
      }
    }
  };
}

export default defineConfig(({ command }) => ({
  plugins: [react(), injectLibraryCss(), emitFontLicenses()],
  // Relative asset URLs, so styles.css finds ./fonts/* wherever the package is installed.
  base: command === "build" ? "./" : "/",
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
        assetFileNames: (asset) =>
          asset.names.some((name) => name.endsWith(".css")) ? "styles.css" : "fonts/[name][extname]"
      }
    }
  }
}));
