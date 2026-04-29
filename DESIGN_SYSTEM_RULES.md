# AI Design System Rules v2

## Purpose

This file is the master instruction set for AI agents that create or modify interfaces in this project. The goal is to keep isolated components, complete pages, documentation, HTML, CSS, JavaScript, React, Next, and Tailwind implementations aligned with the same visual system.

## Source Of Truth

Prioritize these files in order when there is a conflict:

1. `design-tokens.json`: canonical source for primitive, semantic, layout, icon, and component tokens.
2. `styles.css`: current runtime implementation with CSS variables and real composition examples.
3. `index.html`: living visual documentation, examples, component anatomy, and state matrix.
4. `DESIGN_SYSTEM_RULES.md`: governance for agents and implementation decisions.
5. `TAILWIND_RULES.md`: Tailwind and React mapping guidance.
6. `script.js`: current theme behavior, persistence, and UI synchronization.

Do not invent a new design system. Extract what exists, reuse it, normalize it, and extend only when a clear gap exists.

## Visual Identity

The system is minimal, technical, sophisticated, and editorial, with controlled tension between restrained brutalism and system-driven interfaces.

Core principles:

| Principle | Application |
| --- | --- |
| Precision over decoration | Every line, border, surface, icon, and shadow needs a function. |
| Editorial tension | Use strong typography, negative space, and large planes in narrative screens. |
| Brutalist restraint | Expose structure without adding visual noise. |
| System first | Repeated decisions become tokens, variants, patterns, or documented rules. |
| Accessible by default | Contrast, focus, keyboard support, and states are required. |

Avoid indistinguishable cards, heavy shadows, decorative gradients, excessive icon use, teal as a universal CTA color, and automatic centering of every section.

## Foundations

### Color

Use primitives for token definition, swatches, and documentation only. Product components consume semantic tokens through CSS variables.

| Token | Value | Use |
| --- | --- | --- |
| `base.white` | `#FFFFFF` | Raised surfaces and technical foregrounds. |
| `base.black` | `#000000` | Alpha overlays and compositing only. Never use for visible UI states. |
| `brand.carbon-black` | `#161B1E` | Brand authority, primary action in light mode, dark canvas. |
| `brand.shadow-ink` | `#323738` | Dark surface and dark hover tone. |
| `brand.charcoal` | `#515656` | Structural neutral and secondary text. |
| `brand.soft-linen` | `#E4E0D5` | Editorial surface used sparingly. |
| `brand.muted-teal` | `#367656` | Focus, links, and functional accent in light mode. |

Pure black rule:

1. `#000000` is allowed only for alpha overlays, masks, and technical compositing where the alpha value controls the final visual result.
2. Do not use pure black for button active states, text, borders, icons, cards, or visible surfaces.
3. Use `brand.carbon-black`, `brand.shadow-ink`, or neutral tokens for visible UI.

### Typography

| Role | Font | Size | Line-height | Weight | Use |
| --- | --- | --- | --- | --- | --- |
| `display.2xl` | Plus Jakarta Sans | `64px` | `110%` | `700` | Hero and institutional pages. |
| `display.xl` | Plus Jakarta Sans | `48px` | `110%` | `700` | Page titles and high-impact modals. |
| `heading.lg` | Plus Jakarta Sans | `32px` | `120%` | `650/700` | Main sections. |
| `heading.md` | Plus Jakarta Sans | `24px` | `120%` | `650` | Cards, modals, groups. |
| `heading.sm` | Plus Jakarta Sans | `20px` | `120%` | `600` | Subtitles and entities. |
| `body.md` | Inter | `16px` | `150%` | `400` | Main body copy. |
| `body.sm` | Inter | `14px` | `150%` | `400` | Secondary text, forms, lists. |
| `caption` | Inter | `12px` | `150%` | `500` | Metadata and captions. |
| `label` | Inter | `12/14px` | `120%` | `600` | Labels, buttons, tabs. |
| `eyebrow` | Inter | `12px` | `120%` | `700` | Uppercase editorial markers. |

Use Plus Jakarta Sans for hierarchy and personality. Use Inter for product reading, dense information, and forms.

### Iconography

Heroicons is the official iconography library.

Rules:

1. Use Heroicons Outline by default.
2. Use Heroicons Solid only for emphasis, filled feedback badges, and strong system status.
3. Use sizes `16`, `20`, `24`, and `32` only.
4. Keep outline stroke width at `1.5`.
5. Do not mix icon families in the same product surface.
6. Do not use icons as decoration when typography or spacing can communicate the same meaning.

Semantic icon tokens:

| Token | Purpose |
| --- | --- |
| `icon.primary` | Primary action or essential navigation. |
| `icon.secondary` | Supporting metadata and secondary actions. |
| `icon.tertiary` | Low-emphasis decoration or hints. |
| `icon.inverse` | Icons on inverse surfaces. |
| `icon.accent` | Brand accent and selected indicators. |
| `icon.disabled` | Disabled icon state. |
| `icon.success` | Success feedback. |
| `icon.warning` | Warning feedback. |
| `icon.error` | Error feedback. |
| `icon.info` | Informational feedback. |

Accessibility:

1. Decorative icons must use `aria-hidden="true"`.
2. Icon-only buttons must provide `aria-label`.
3. Icons that communicate unique meaning must have an accessible text equivalent.
4. Never rely on color alone for status; pair icons with text where possible.

### Spacing, Radius, Motion, And Elevation

Use `4`, `8`, `12`, `16`, `24`, `32`, `48`, `64`, `96`, and `128` for spacing. Use `4`, `8`, `12`, `16`, `24`, and `9999` for radius.

Elevation is border-first:

| Elevation | Use | Rule |
| --- | --- | --- |
| `shadow.none` | Default cards, panels, content groups | No shadow; use borders and tonal contrast. |
| `shadow.1` | Interactive cards, small menus | Optional subtle shadow. |
| `shadow.2` | Popovers and floating panels | Raised surface only. |
| `shadow.3` | Modals and overlays | Highest surface only. |

If everything is elevated, nothing is elevated. Standard cards must be flat unless elevation communicates functional hierarchy.

### Responsive Tokens

Responsive values are canonical in `design-tokens.json`.

| Token | Value | Use |
| --- | --- | --- |
| `layout.breakpoint.mobile` | `720px` | Single-column mobile collapse. |
| `layout.breakpoint.tablet` | `1040px` | Navigation and major grid collapse. |
| `layout.container.shell` | `1180px` | Documentation shell max-width. |

When using native CSS, media query values may mirror these tokens because CSS variables cannot be used in media conditions reliably. Do not introduce new global breakpoints without adding tokens first.

## Semantic Tokens

Components must consume semantic CSS variables, not primitive values.

Use this naming pattern:

| Role | CSS variable | Tailwind utility |
| --- | --- | --- |
| Canvas | `--color-background` | `bg-background` |
| Surface | `--color-surface` | `bg-surface` |
| Text primary | `--color-text-primary` | `text-content-primary` |
| Icon primary | `--color-icon-primary` | `text-icon-primary` |
| Primary action | `--color-primary` | `bg-primary` |
| Focus | `--color-focus` | `ring-focus` |
| Error text | `--color-error-text` | `text-error-text` |

Do not use `text-primary` for content text because `primary` represents action color.

## Component Requirements

Every interactive component must define and document applicable states:

| State | Requirement |
| --- | --- |
| `default` | Resting visual state. |
| `hover` | Tonal or border change, not opacity-only. |
| `active` | Tactile push through transform or deeper tone. |
| `focus-visible` | Visible focus ring with accessible contrast. |
| `disabled` | Non-interactive, readable if it carries information. |
| `loading` | Skeleton or width-preserving loading state. |
| `invalid` | Inline error message and semantic error tokens. |
| `danger` | Destructive action using error semantics. |
| `empty` | Composed empty state explaining how to populate data. |
| `success` | Confirmation using success semantics. |
| `error` | Blocking or failed state using error semantics. |

The visual showcase must include a state matrix for Button, Input, Alert, Tabs, Modal, and Card before a component library is considered complete.

### Button

Variants: `primary`, `secondary`, `ghost`, `danger`, `editorial`.

Sizes:

| Size | Height | Padding X |
| --- | --- | --- |
| `sm` | `32px` | `12px` |
| `md` | `40px` | `16px` |
| `lg` | `48px` | `24px` |

Labels must be short verbs. Loading must preserve width. Danger uses error semantic tokens.

### Input

Labels sit above the input. Helper text is optional but should exist in markup when useful. Error text sits below the input and must be connected with `aria-describedby` when implemented.

### Card

Cards are structural surfaces, not decoration. Default card style is surface plus border, no shadow. Use raised elevation only for floating or interactive hierarchy.

### Modal

Modals must trap focus, close by keyboard, use an accessible title, and render on a raised surface. If content becomes multi-section and complex, use a route/page instead.

### Tabs

Use tabs for related content, not for multi-select filters. Implement `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `role="tabpanel"`, and keyboard behavior in production.

### Badge And Alert

Badges are metadata, not CTAs. Alerts must explain what happened and what the user can do next. Feedback variants use feedback tokens, not brand colors.

## Code Rules

HTML and CSS:

1. Use semantic HTML and ARIA only when needed.
2. Use BEM-style classes already present in the showcase.
3. Use `rgb(var(--color-token) / alpha)` for theme-aware colors.
4. Use `var(--space-*)`, `var(--radius-*)`, `var(--duration-*)`, `var(--ease-standard)`, and semantic color variables.
5. Do not hardcode new hex values in product components.
6. Preserve `box-sizing: border-box`, `min-width: 320px`, `scroll-behavior: smooth`, and `prefers-reduced-motion` fallback.
7. Preserve `meta name="color-scheme" content="light dark"` in themed documentation pages.

JavaScript:

1. Preserve `data-theme="light"` and `data-theme="dark"` on the root.
2. Synchronize `aria-pressed` for theme controls.
3. Catch `localStorage` errors for strict privacy modes.
4. Use `matchMedia("(prefers-color-scheme: dark)")` as fallback.
5. Do not break `luiswagnerab-showcase-theme` without explicit migration.

Design token JSON:

1. Maintain `$type`, `value`, and `$description`.
2. Use aliases like `{primitive.color.neutral.50}` when a token depends on another token.
3. Add an operational description and intended consumer for every new token.
4. Component-specific decisions belong in `component.*`.
5. Do not duplicate brand and neutral values without documenting why.

## Accessibility And Contrast

| Area | Minimum |
| --- | --- |
| Normal text | `4.5:1` |
| Large text, essential icons, input borders | `3:1` |
| Focus ring against adjacent surface | `3:1` |
| Disabled readable text | Keep sufficient contrast if the value communicates information. |
| Body links | Do not rely on color alone; use underline or contextual affordance. |

Always validate contrast when creating a new foreground/background combination.

## Final Agent Checklist

Before delivering changes, verify:

1. Root `design-tokens.json` remains the canonical source.
2. Components use semantic tokens and CSS variables.
3. Light and dark themes work.
4. Typography, spacing, radius, icons, breakpoints, and elevation follow tokens.
5. All applicable states are present in the state matrix.
6. Cards are border-first unless a raised surface is functionally required.
7. Heroicons rules are followed.
8. Pure black is not used for visible UI states.
9. Layout works on desktop and mobile.
10. Contrast and keyboard access are preserved.
