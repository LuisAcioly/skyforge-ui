import type { Config } from "tailwindcss";

const colorVar = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./.storybook/**/*.{ts,tsx,mdx}"],
  safelist: [
    "bg-success-bg",
    "border-success-border",
    "text-success-text",
    "bg-success-icon",
    "ring-success-icon",
    "bg-warning-bg",
    "border-warning-border",
    "text-warning-text",
    "bg-warning-icon",
    "ring-warning-icon",
    "bg-error-bg",
    "border-error-border",
    "text-error-text",
    "bg-error-icon",
    "ring-error-icon",
    "bg-info-bg",
    "border-info-border",
    "text-info-text",
    "bg-info-icon",
    "ring-info-icon"
  ],
  theme: {
    extend: {
      colors: {
        background: colorVar("--color-background"),
        "background-editorial": colorVar("--color-background-editorial"),
        surface: colorVar("--color-surface"),
        "surface-raised": colorVar("--color-surface-raised"),
        "surface-sunken": colorVar("--color-surface-sunken"),
        "surface-inverse": colorVar("--color-surface-inverse"),
        border: colorVar("--color-border"),
        "border-strong": colorVar("--color-border-strong"),
        divider: colorVar("--color-divider"),
        "content-primary": colorVar("--color-text-primary"),
        "content-secondary": colorVar("--color-text-secondary"),
        "content-tertiary": colorVar("--color-text-tertiary"),
        "content-inverse": colorVar("--color-text-inverse"),
        "icon-primary": colorVar("--color-icon-primary"),
        "icon-secondary": colorVar("--color-icon-secondary"),
        "icon-tertiary": colorVar("--color-icon-tertiary"),
        "icon-inverse": colorVar("--color-icon-inverse"),
        "icon-accent": colorVar("--color-icon-accent"),
        "icon-disabled": colorVar("--color-icon-disabled"),
        primary: colorVar("--color-primary"),
        "primary-hover": colorVar("--color-primary-hover"),
        "primary-active": colorVar("--color-primary-active"),
        "primary-foreground": colorVar("--color-primary-foreground"),
        secondary: colorVar("--color-secondary"),
        "secondary-hover": colorVar("--color-secondary-hover"),
        "secondary-foreground": colorVar("--color-secondary-foreground"),
        focus: colorVar("--color-focus"),
        link: colorVar("--color-link"),
        "link-hover": colorVar("--color-link-hover"),
        "hover-surface": colorVar("--color-hover-surface"),
        "active-surface": colorVar("--color-active-surface"),
        success: {
          bg: colorVar("--color-success-bg"),
          border: colorVar("--color-success-border"),
          text: colorVar("--color-success-text"),
          icon: colorVar("--color-success-icon")
        },
        warning: {
          bg: colorVar("--color-warning-bg"),
          border: colorVar("--color-warning-border"),
          text: colorVar("--color-warning-text"),
          icon: colorVar("--color-warning-icon")
        },
        error: {
          bg: colorVar("--color-error-bg"),
          border: colorVar("--color-error-border"),
          text: colorVar("--color-error-text"),
          icon: colorVar("--color-error-icon")
        },
        info: {
          bg: colorVar("--color-info-bg"),
          border: colorVar("--color-info-border"),
          text: colorVar("--color-info-text"),
          icon: colorVar("--color-info-icon")
        },
        disabled: {
          bg: colorVar("--color-disabled-bg"),
          border: colorVar("--color-disabled-border"),
          text: colorVar("--color-disabled-text")
        }
      },
      spacing: {
        "sf-4": "var(--space-4)",
        "sf-8": "var(--space-8)",
        "sf-12": "var(--space-12)",
        "sf-16": "var(--space-16)",
        "sf-20": "var(--size-20)",
        "sf-24": "var(--space-24)",
        "sf-32": "var(--space-32)",
        "sf-40": "var(--size-40)",
        "sf-48": "var(--space-48)",
        "sf-64": "var(--space-64)",
        "sf-96": "var(--space-96)",
        "sf-128": "var(--space-128)"
      },
      borderRadius: {
        "sf-sm": "var(--radius-sm)",
        "sf-md": "var(--radius-md)",
        "sf-lg": "var(--radius-lg)",
        "sf-xl": "var(--radius-xl)",
        "sf-2xl": "var(--radius-2xl)",
        "sf-full": "var(--radius-full)"
      },
      boxShadow: {
        "sf-1": "var(--shadow-1)",
        "sf-2": "var(--shadow-2)",
        "sf-3": "var(--shadow-3)"
      },
      maxWidth: {
        shell: "var(--shell-max)",
        "modal-sm": "var(--component-modal-width-sm)",
        "modal-md": "var(--component-modal-width-md)",
        "modal-lg": "var(--component-modal-width-lg)",
        "modal-xl": "var(--component-modal-width-xl)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      fontSize: {
        caption: [
          "var(--font-size-xs)",
          { lineHeight: "var(--line-height-normal)", fontWeight: "var(--font-weight-medium)" }
        ],
        "label-sm": [
          "var(--font-size-xs)",
          { lineHeight: "var(--line-height-snug)", fontWeight: "var(--font-weight-semibold)" }
        ],
        "label-md": [
          "var(--font-size-sm)",
          { lineHeight: "var(--line-height-snug)", fontWeight: "var(--font-weight-semibold)" }
        ],
        label: [
          "var(--font-size-sm)",
          { lineHeight: "var(--line-height-snug)", fontWeight: "var(--font-weight-semibold)" }
        ],
        eyebrow: [
          "var(--font-size-xs)",
          {
            lineHeight: "var(--line-height-snug)",
            letterSpacing: "var(--letter-spacing-eyebrow)",
            fontWeight: "var(--font-weight-bold)"
          }
        ],
        "body-sm": ["var(--font-size-sm)", { lineHeight: "var(--line-height-normal)" }],
        "body-md": ["var(--font-size-base)", { lineHeight: "var(--line-height-normal)" }],
        "heading-sm": [
          "var(--font-size-lg)",
          { lineHeight: "var(--line-height-snug)", fontWeight: "var(--font-weight-semibold)" }
        ],
        "heading-md": [
          "var(--font-size-xl)",
          { lineHeight: "var(--line-height-snug)", fontWeight: "var(--font-weight-semibold)" }
        ],
        "heading-lg": [
          "var(--font-size-2xl)",
          { lineHeight: "var(--line-height-snug)", fontWeight: "var(--font-weight-bold)" }
        ],
        "display-xl": [
          "var(--font-size-3xl)",
          { lineHeight: "var(--line-height-tight)", fontWeight: "var(--font-weight-bold)" }
        ],
        "display-2xl": [
          "var(--font-size-4xl)",
          { lineHeight: "var(--line-height-tight)", fontWeight: "var(--font-weight-bold)" }
        ]
      },
      transitionDuration: {
        "sf-fast": "var(--duration-fast)",
        "sf-normal": "var(--duration-normal)",
        "sf-slow": "var(--duration-slow)"
      },
      transitionTimingFunction: {
        "sf-standard": "var(--ease-standard)"
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
