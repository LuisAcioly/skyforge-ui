import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    // Forces :hover / :focus-visible on chosen elements so state matrices render
    // statically in docs and in the Vitest run.
    "storybook-addon-pseudo-states"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  }
};

export default config;
