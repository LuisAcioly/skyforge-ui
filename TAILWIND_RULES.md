# Tailwind Rules v2

## Purpose

This file defines how to map the luiswagnerab Design System v2 into Tailwind, React, and Next implementations without creating a parallel visual language.

## Source Of Truth

Prioritize these files in order:

1. `design-tokens.json`: canonical source for primitives, semantic tokens, icon tokens, layout tokens, and component tokens.
2. `styles.css`: runtime CSS variable contract and current showcase implementation.
3. `DESIGN_SYSTEM_RULES.md`: complete governance for agents, components, accessibility, states, and pages.
4. `index.html`: living visual examples and state matrix.
5. `script.js`: theme behavior and persistence.

Do not create colors, breakpoints, icon rules, or variants without checking root `design-tokens.json` first.

## Required Rules

1. Use semantic tokens through CSS variables at runtime.
2. Do not hardcode hex values in Tailwind components.
3. Do not overwrite Tailwind's default numeric spacing scale.
4. Prefix system spacing, sizing, and radius utilities with `sf-*`.
5. Keep theme switching through `data-theme="light"` and `data-theme="dark"`.
6. Use borders, tonal contrast, and flat surfaces before shadows.
7. Standard cards default to no shadow.
8. Every interactive component needs default, hover, active, focus-visible, disabled, and loading when applicable.
9. Invalid, danger, empty, success, and error states must be represented when relevant.
10. Use Heroicons as the icon library: outline by default, solid only for emphasis and feedback.

## Dependency Verification

This folder does not include a `package.json`. Before importing Heroicons in a React or Next implementation, install the dependency:

```bash
npm install @heroicons/react
```

Use these import paths:

```tsx
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
```

Do not mix Heroicons with another icon family inside the same product surface.

## Theme Contract

Tailwind colors should point to CSS variables in the format `rgb(var(--color-token) / <alpha-value>)`.

```ts
const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;
```

The CSS runtime owns actual theme values. Components consume utilities; utilities consume CSS variables.

## Utility Naming

Use explicit names so content text does not collide with primary action color.

| Role | Utility | CSS variable |
| --- | --- | --- |
| Canvas | `bg-background` | `--color-background` |
| Editorial background | `bg-background-editorial` | `--color-background-editorial` |
| Surface | `bg-surface` | `--color-surface` |
| Raised surface | `bg-surface-raised` | `--color-surface-raised` |
| Sunken surface | `bg-surface-sunken` | `--color-surface-sunken` |
| Inverse surface | `bg-surface-inverse` | `--color-surface-inverse` |
| Content primary | `text-content-primary` | `--color-text-primary` |
| Content secondary | `text-content-secondary` | `--color-text-secondary` |
| Content tertiary | `text-content-tertiary` | `--color-text-tertiary` |
| Content inverse | `text-content-inverse` | `--color-text-inverse` |
| Icon primary | `text-icon-primary` | `--color-icon-primary` |
| Icon secondary | `text-icon-secondary` | `--color-icon-secondary` |
| Icon accent | `text-icon-accent` | `--color-icon-accent` |
| Icon disabled | `text-icon-disabled` | `--color-icon-disabled` |
| Primary action | `bg-primary` | `--color-primary` |
| Primary hover | `hover:bg-primary-hover` | `--color-primary-hover` |
| Primary active | `active:bg-primary-active` | `--color-primary-active` |
| Primary foreground | `text-primary-foreground` | `--color-primary-foreground` |
| Secondary action | `bg-secondary` | `--color-secondary` |
| Secondary hover | `hover:bg-secondary-hover` | `--color-secondary-hover` |
| Secondary foreground | `text-secondary-foreground` | `--color-secondary-foreground` |
| Link | `text-link` | `--color-link` |
| Link hover | `hover:text-link-hover` | `--color-link-hover` |
| Border | `border-border` | `--color-border` |
| Strong border | `border-border-strong` | `--color-border-strong` |
| Divider | `border-divider` | `--color-divider` |
| Focus | `ring-focus` | `--color-focus` |
| Success | `bg-success-bg`, `border-success-border`, `text-success-text`, `text-success-icon` | `--color-success-*` |
| Warning | `bg-warning-bg`, `border-warning-border`, `text-warning-text`, `text-warning-icon` | `--color-warning-*` |
| Error | `bg-error-bg`, `border-error-border`, `text-error-text`, `text-error-icon` | `--color-error-*` |
| Info | `bg-info-bg`, `border-info-border`, `text-info-text`, `text-info-icon` | `--color-info-*` |
| Disabled | `bg-disabled-bg`, `border-disabled-border`, `text-disabled-text` | `--color-disabled-*` |

Avoid `text-primary` for normal content. Use `text-content-primary`.

## Spacing, Radius, Icon, And Layout Utilities

Do not remap Tailwind defaults like `p-4`, `gap-8`, or `rounded-md`. System values use `sf-*`.

| Token | Utility examples |
| --- | --- |
| `4px` | `p-sf-4`, `gap-sf-4`, `h-sf-4` |
| `8px` | `p-sf-8`, `gap-sf-8`, `h-sf-8` |
| `12px` | `p-sf-12`, `gap-sf-12`, `h-sf-12` |
| `16px` | `p-sf-16`, `gap-sf-16`, `h-sf-16` |
| `24px` | `p-sf-24`, `gap-sf-24`, `h-sf-24` |
| `32px` | `p-sf-32`, `gap-sf-32`, `h-sf-32` |
| `48px` | `p-sf-48`, `gap-sf-48`, `h-sf-48` |
| `64px` | `p-sf-64`, `gap-sf-64`, `h-sf-64` |
| `96px` | `p-sf-96`, `gap-sf-96`, `h-sf-96` |
| `128px` | `p-sf-128`, `gap-sf-128`, `h-sf-128` |

Radius utilities:

| Token | Utility |
| --- | --- |
| `4px` | `rounded-sf-sm` |
| `8px` | `rounded-sf-md` |
| `12px` | `rounded-sf-lg` |
| `16px` | `rounded-sf-xl` |
| `24px` | `rounded-sf-2xl` |
| `9999px` | `rounded-sf-full` |

Icon utilities:

| Token | Utility |
| --- | --- |
| `16px` | `size-icon-xs` |
| `20px` | `size-icon-sm` |
| `24px` | `size-icon-md` |
| `32px` | `size-icon-lg` |

Responsive utilities:

| Token | Tailwind mapping |
| --- | --- |
| `layout.breakpoint.mobile` / `720px` | `screens.sf-mobile` |
| `layout.breakpoint.tablet` / `1040px` | `screens.sf-tablet` |
| `layout.container.shell` / `1180px` | `max-w-shell` |

## Tailwind Config Template

Use this as a starting point and adjust `content` for the real app structure.

```ts
import type { Config } from "tailwindcss";

const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./pages/**/*.{ts,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: withAlpha("--color-background"),
        "background-editorial": withAlpha("--color-background-editorial"),
        surface: withAlpha("--color-surface"),
        "surface-raised": withAlpha("--color-surface-raised"),
        "surface-sunken": withAlpha("--color-surface-sunken"),
        "surface-inverse": withAlpha("--color-surface-inverse"),
        border: withAlpha("--color-border"),
        "border-strong": withAlpha("--color-border-strong"),
        divider: withAlpha("--color-divider"),
        "content-primary": withAlpha("--color-text-primary"),
        "content-secondary": withAlpha("--color-text-secondary"),
        "content-tertiary": withAlpha("--color-text-tertiary"),
        "content-inverse": withAlpha("--color-text-inverse"),
        "icon-primary": withAlpha("--color-icon-primary"),
        "icon-secondary": withAlpha("--color-icon-secondary"),
        "icon-tertiary": withAlpha("--color-icon-tertiary"),
        "icon-inverse": withAlpha("--color-icon-inverse"),
        "icon-accent": withAlpha("--color-icon-accent"),
        "icon-disabled": withAlpha("--color-icon-disabled"),
        primary: withAlpha("--color-primary"),
        "primary-hover": withAlpha("--color-primary-hover"),
        "primary-active": withAlpha("--color-primary-active"),
        "primary-foreground": withAlpha("--color-primary-foreground"),
        secondary: withAlpha("--color-secondary"),
        "secondary-hover": withAlpha("--color-secondary-hover"),
        "secondary-foreground": withAlpha("--color-secondary-foreground"),
        focus: withAlpha("--color-focus"),
        link: withAlpha("--color-link"),
        "link-hover": withAlpha("--color-link-hover"),
        "hover-surface": withAlpha("--color-hover-surface"),
        "active-surface": withAlpha("--color-active-surface"),
        success: { bg: withAlpha("--color-success-bg"), border: withAlpha("--color-success-border"), text: withAlpha("--color-success-text"), icon: withAlpha("--color-success-icon") },
        warning: { bg: withAlpha("--color-warning-bg"), border: withAlpha("--color-warning-border"), text: withAlpha("--color-warning-text"), icon: withAlpha("--color-warning-icon") },
        error: { bg: withAlpha("--color-error-bg"), border: withAlpha("--color-error-border"), text: withAlpha("--color-error-text"), icon: withAlpha("--color-error-icon") },
        info: { bg: withAlpha("--color-info-bg"), border: withAlpha("--color-info-border"), text: withAlpha("--color-info-text"), icon: withAlpha("--color-info-icon") },
        disabled: { bg: withAlpha("--color-disabled-bg"), border: withAlpha("--color-disabled-border"), text: withAlpha("--color-disabled-text") },
      },
      spacing: {
        "sf-4": "var(--space-4)",
        "sf-8": "var(--space-8)",
        "sf-12": "var(--space-12)",
        "sf-16": "var(--space-16)",
        "sf-24": "var(--space-24)",
        "sf-32": "var(--space-32)",
        "sf-48": "var(--space-48)",
        "sf-64": "var(--space-64)",
        "sf-96": "var(--space-96)",
        "sf-128": "var(--space-128)",
      },
      width: {
        "icon-xs": "var(--icon-size-xs)",
        "icon-sm": "var(--icon-size-sm)",
        "icon-md": "var(--icon-size-md)",
        "icon-lg": "var(--icon-size-lg)",
      },
      height: {
        "icon-xs": "var(--icon-size-xs)",
        "icon-sm": "var(--icon-size-sm)",
        "icon-md": "var(--icon-size-md)",
        "icon-lg": "var(--icon-size-lg)",
      },
      borderRadius: {
        "sf-sm": "var(--radius-sm)",
        "sf-md": "var(--radius-md)",
        "sf-lg": "var(--radius-lg)",
        "sf-xl": "var(--radius-xl)",
        "sf-2xl": "var(--radius-2xl)",
        "sf-full": "var(--radius-full)",
      },
      boxShadow: {
        "sf-none": "none",
        "sf-1": "0 1px 2px rgb(22 27 30 / 0.04), 0 8px 24px rgb(22 27 30 / 0.035)",
        "sf-2": "0 8px 24px rgb(22 27 30 / 0.08), 0 24px 48px rgb(22 27 30 / 0.06)",
        "sf-3": "0 24px 64px rgb(22 27 30 / 0.18), 0 48px 96px rgb(22 27 30 / 0.14)",
      },
      maxWidth: {
        shell: "var(--shell-max)",
        "modal-sm": "400px",
        "modal-md": "560px",
        "modal-lg": "720px",
        "modal-xl": "960px",
      },
      screens: {
        "sf-mobile": "720px",
        "sf-tablet": "1040px",
      },
      transitionDuration: {
        "sf-fast": "120ms",
        "sf-normal": "180ms",
        "sf-slow": "240ms",
      },
      transitionTimingFunction: {
        "sf-standard": "cubic-bezier(0.2, 0, 0, 1)",
      },
    },
  },
};

export default config;
```

## Examples

Primary button:

```tsx
<button className="inline-flex h-sf-40 items-center justify-center gap-sf-8 rounded-sf-md bg-primary px-sf-16 font-body text-label text-primary-foreground transition duration-sf-fast ease-sf-standard hover:bg-primary-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:pointer-events-none disabled:bg-disabled-bg disabled:text-disabled-text">
  Create project
</button>
```

Heroicons button:

```tsx
import { PlusIcon } from "@heroicons/react/24/outline";

<button className="inline-flex h-sf-40 items-center gap-sf-8 rounded-sf-md bg-primary px-sf-16 text-primary-foreground">
  <PlusIcon className="h-icon-xs w-icon-xs" aria-hidden="true" />
  Create project
</button>
```

Flat structural card:

```tsx
<article className="rounded-sf-lg border border-border bg-surface p-sf-24 text-content-primary shadow-sf-none">
  <p className="font-body text-eyebrow uppercase text-content-tertiary">System</p>
  <h3 className="mt-sf-8 font-display text-heading-md">Operational clarity</h3>
  <p className="mt-sf-12 font-body text-body-sm text-content-secondary">Flat surface, functional border, and theme-aware contrast.</p>
</article>
```

Raised modal panel:

```tsx
<section className="rounded-sf-2xl border border-border-strong bg-surface-raised p-sf-32 shadow-sf-3">
  <h2 className="font-display text-heading-md text-content-primary">Publish documentation</h2>
</section>
```

Invalid field:

```tsx
<label className="grid gap-sf-8">
  <span className="text-label text-content-secondary">Token alias</span>
  <input aria-invalid="true" aria-describedby="token-error" className="h-sf-40 rounded-sf-md border border-error-border bg-surface px-sf-12 text-content-primary focus-visible:ring-2 focus-visible:ring-focus" />
  <span id="token-error" className="text-body-sm text-error-text">Alias must resolve before release.</span>
</label>
```

## Component Guidance

Button: expose `variant`, `size`, `loading`, and `disabled`. Variants are `primary`, `secondary`, `ghost`, `danger`, and `editorial`.

Input: visible label above input, helper text optional, error text below input, `aria-describedby` for messages.

Card: default is `rounded-sf-lg border border-border bg-surface p-sf-24 shadow-sf-none`. Use shadows only for interactive or raised variants.

Modal: panel uses `bg-surface-raised`, `rounded-sf-2xl`, and `shadow-sf-3`. Overlay may use a Carbon Black alpha value until an overlay variable is implemented.

Tabs: triggers use `h-sf-40`, `gap-sf-4`, accessible tab semantics, and visible active/focus states.

Badge and Alert: use semantic feedback tokens only.

## State Matrix Requirement

Every component library or showcase must represent these states when applicable: `default`, `hover`, `active`, `focus-visible`, `disabled`, `loading`, `invalid`, `danger`, `empty`, `success`, and `error`.

## Accessibility

1. Normal text needs `4.5:1` contrast.
2. Large text, essential icons, and input borders need `3:1` contrast.
3. Focus rings must contrast against the adjacent surface.
4. Links in body copy should not rely on color alone.
5. Interactive components must work by keyboard.
6. Respect `prefers-reduced-motion: reduce`.
7. Decorative icons use `aria-hidden="true"`; icon-only buttons use `aria-label`.

## Anti-Patterns

Do not do this:

```tsx
<div className="bg-[#000000] text-[#FFFFFF] rounded-[13px] p-[37px] shadow-xl" />
```

Do this:

```tsx
<div className="rounded-sf-lg border border-border bg-surface p-sf-32 text-content-primary shadow-sf-none" />
```

Do not do this:

```tsx
<button className="bg-teal-500 text-white hover:opacity-80" />
```

Do this:

```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active" />
```

## Final Checklist

1. Are colors semantic CSS variables?
2. Does the component work in light and dark themes?
3. Are spacing, radius, icons, breakpoints, and elevation tokenized?
4. Are cards flat by default?
5. Are all applicable states represented?
6. Are Heroicons used consistently?
7. Is pure black avoided in visible UI states?
8. Are desktop, mobile, contrast, and keyboard behavior verified?
