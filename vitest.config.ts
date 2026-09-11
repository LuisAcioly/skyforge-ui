import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Every story runs as a test in headless Chromium: render smoke test, play
// function assertions and the a11y addon's axe checks.
// https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
export default mergeConfig(
  viteConfig({ command: "serve", mode: "test" }),
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          plugins: [storybookTest({ configDir: path.join(dirname, ".storybook") })],
          test: {
            name: "storybook",
            setupFiles: [".storybook/vitest.setup.ts"],
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [{ browser: "chromium" }]
            }
          }
        }
      ]
    }
  })
);
