import type { Preview } from "@storybook/react";

import "../src/styles.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Runtime theme",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" }
        ],
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === "dark" ? "dark" : "light";

      if (typeof document !== "undefined") {
        document.documentElement.dataset.theme = theme;
        document.body.dataset.theme = theme;
      }

      return (
        <div data-theme={theme} className="h-auto bg-background p-sf-32 text-content-primary">
          <div className="mx-auto max-w-shell">
            <Story />
          </div>
        </div>
      );
    }
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      disable: true
    }
  }
};

export default preview;
