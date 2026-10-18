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

## Experience Context Profiles

Every interface must declare its context before visual decisions are made. Context controls density, typography freedom, iconography, motion, container treatment, and spacing.

Agent protocol:

1. After reading this document for a UI task, ask which context applies unless the user or project already states it clearly.
2. If the task is an existing screen and context can be inferred from functionality, state the inferred context before applying rules.
3. If multiple contexts could apply, ask the user to choose between `product-operational`, `premium-experience`, or `hybrid-product` before changing UI.
4. Do not silently apply premium rules to operational workflows.

| Context | Use for | Visual posture |
| --- | --- | --- |
| `product-operational` | SaaS apps, dashboards, CRUD tools, admin panels, task managers, CRM, internal systems | Quiet, dense, scannable, predictable, low-distraction. Prioritize repeated workflows, comparison, status clarity, and stable dimensions. |
| `premium-experience` | Landing pages, brand pages, portfolios, launch pages, campaigns, object-focused showcases, high-touch editorial product surfaces | Cinematic, spacious, haptic, motion-rich, high contrast in hierarchy. Prioritize first impression, visual craft, and memorable spatial rhythm. |
| `hybrid-product` | Product surfaces with an editorial first impression plus operational areas | First viewport may use premium treatment. Core workflow areas must return to operational density. |

When context conflicts occur, product usability wins inside workflow-heavy screens. Premium rules apply only where they do not reduce task speed, readability, accessibility, or predictable layout.

## Foundations

### Color

Use primitives for token definition, swatches, and documentation only. Product components consume semantic tokens through CSS variables.

A ramp is a ladder, not a set of chosen colours. Every chromatic family steps evenly in OKLCH lightness (ΔL 0.0778 from 50 to 900) and holds one hue, so any step can be predicted from its neighbours. Steps no semantic role currently selects are reserve, not dead weight: they are what makes the next role a lookup rather than a new invention. A brand token names a step; it never restates its value.

Families and what they are for:

| Family | Job |
| --- | --- |
| `neutral` | Surfaces, borders, text, disabled, and focus (`neutral.950` light, `neutral.50` dark). Every step bound. |
| `teal` | Accent: links, selection, active state. Never focus. |
| `green` `amber` `red` `blue` | Status: success, warning, error, information. Never decoration. |
| `linen` | Editorial. Warm reading surfaces for long-form and documentation. Never carries state, never product chrome. |

| Token | Value | Use |
| --- | --- | --- |
| `base.white` | `#FFFFFF` | Raised surfaces and technical foregrounds. |
| `base.black` | `#000000` | Alpha overlays and compositing only. Never use for visible UI states. |
| `brand.carbon-black` | `#18181A` (`neutral.950`) | Brand authority, primary action in light mode, dark canvas. |
| `brand.shadow-ink` | `#323238` | Dark surface and dark hover tone. |
| `brand.charcoal` | `#4F4F55` (`neutral.700`) | Structural neutral and secondary text. |
| `brand.soft-linen` | `#E4E0D5` (`linen.100`) | Editorial surface. The linen family carries reading surfaces; product chrome stays neutral. |
| `brand.muted-teal` | `#147672` (`teal.600`) | Links and functional accent in light mode. |

Pure black rule:

1. `#000000` is allowed only for alpha overlays, masks, and technical compositing where the alpha value controls the final visual result.
2. Do not use pure black for button active states, text, borders, icons, cards, or visible surfaces.
3. Use `brand.carbon-black`, `brand.shadow-ink`, or neutral tokens for visible UI.

Boundary roles:

| Role | Light | Dark | Use |
| --- | --- | --- | --- |
| `border` | `neutral.300` | `neutral.400` | Delimits containers: cards, panels, tables, popovers, tab tracks. |
| `border-strong` | `neutral.400` | `neutral.300` | Hover, open, and emphasized boundaries. Always one step more contrast than `border`. |
| `divider` | `neutral.200` | `neutral.800` | Quiet separation inside a container: rows, menu separators, tab rails. |
| `control-border` | `neutral.400` | `neutral.400` | The 3:1 boundary that identifies a form control. |

`border` and `divider` must never share a value in a theme. Consumers pick the role, not a contrast level, and never mix or branch colors per theme to separate them.

### Typography

<!-- typography-tokens:start -->
<!-- Generated from design-tokens.json. Run npm run generate:tokens. -->
| Role | Font | Size | Line-height | Weight | Tracking | Use |
| --- | --- | --- | --- | --- | --- | --- |
| `display-2xl` | Bebas Neue | `64px` | `110%` | `400` | `0.015em` | Hero and institutional pages. |
| `display-xl` | Bebas Neue | `48px` | `110%` | `400` | `0.015em` | Page titles and high-impact modals. |
| `heading-lg` | Bebas Neue | `32px` | `120%` | `400` | `0.015em` | Main sections. |
| `heading-md` | Bebas Neue | `24px` | `120%` | `400` | `0.015em` | Cards, modals, and groups. |
| `heading-sm` | Bebas Neue | `20px` | `120%` | `400` | `0.015em` | Subtitles and entities. |
| `body-md` | Figtree | `16px` | `150%` | `400` | `0px` | Main body copy. |
| `body-sm` | Figtree | `14px` | `150%` | `400` | `0px` | Secondary text, forms, and lists. |
| `label-lg` | Figtree | `20px` | `120%` | `600` | `0px` | Large compact identifiers such as avatar initials. |
| `label-md` | Figtree | `14px` | `120%` | `600` | `0px` | Default labels, buttons, and tabs. |
| `label-sm` | Figtree | `12px` | `120%` | `600` | `0px` | Compact labels and controls. |
| `label` | Figtree | `14px` | `120%` | `600` | `0px` | Compatibility alias for label-md. |
| `caption` | Figtree | `12px` | `150%` | `500` | `0px` | Metadata and captions. |
| `eyebrow` | Figtree | `12px` | `120%` | `700` | `0.08em` | Uppercase editorial markers. |
| `mono` | ui-monospace | `13px` | `150%` | `400` | `0px` | Tokens, code, and tabular technical values. |
<!-- typography-tokens:end -->

Use Bebas Neue for hierarchy and personality. Use Figtree for product reading, dense information, and forms.

Typography exceptions:

1. `product-operational` uses the standard font pairing unless a documented product brand token overrides it.
2. `premium-experience` may use premium display/body families such as `Geist`, `Satoshi`, `Clash Display`, or editorial serif families when they are added to `design-tokens.json` first.
3. Do not hardcode font families in components. Add premium font choices as tokens before use.
4. Premium typography must still preserve readable body sizes, stable line-height, and responsive text fit. Do not scale font size with viewport width.

### Iconography

Heroicons is the official iconography library for `product-operational` interfaces.

Rules:

1. Use Heroicons Outline by default.
2. Use Heroicons Solid only for emphasis, filled feedback badges, and strong system status.
3. Use sizes `16`, `20`, `24`, and `32` only.
4. Keep outline stroke width at `1.5`.
5. Do not mix icon families in the same product surface.
6. Do not use icons as decoration when typography or spacing can communicate the same meaning.

Contextual icon exceptions:

1. `premium-experience` may use a different precise line icon family such as Phosphor Light or Remix Line only when the choice is documented at the surface level.
2. Never mix Heroicons with another icon family in the same screen, toolbar, modal, or repeated collection.
3. If Skyforge UI supplies Heroicons internally, local premium icons must not visually conflict with those controls.

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

Control and row heights:

| Token | Default | `data-density="compact"` | Use |
| --- | --- | --- | --- |
| `--control-h-sm` | `32px` | `32px` | Compact controls and square icon-only triggers (`h-control-sm w-control-sm`). |
| `--control-h-md` | `40px` | `32px` | Default controls. |
| `--control-h-lg` | `48px` | `40px` | Large controls; touch surfaces stay at lg. |
| `--row-h-md` | `48px` | `40px` | Default rows. |
| `--row-h-sm` | `40px` | `32px` | Compact rows. |
| `--row-h-xs` | `30px` | `30px` | Leading or top-level dense row (tree roots, section rows in tool panes). |
| `--row-h-2xs` | `26px` | `26px` | Repeated dense row (tree children, file lists). |
| `--row-indent` | `var(--space-12)` | same | Indentation per nesting level. |

Dense row rules:

1. `xs` and `2xs` are the floor of the scale. Density never shrinks them, so `md > sm > xs > 2xs` holds in every density.
2. Dense rows use `sf-8` inline padding and `calc(var(--space-8) + depth * var(--row-indent))` for nested start padding. Do not add dense-specific spacing tokens.
3. Density changes geometry only. It never changes color, border, or elevation tokens.
4. Dense rows and 32px controls are for pointer-driven `product-operational` surfaces. Touch surfaces keep `sm` or larger rows and `lg` controls.

Spacing by context:

1. `product-operational` uses compact spacing that supports scanning and repeated action. Prefer `12`, `16`, `24`, and `32` for tool surfaces.
2. `premium-experience` may use macro whitespace with `64`, `96`, and `128` section gaps when the screen is not a dense workflow.
3. `hybrid-product` may use premium spacing in the first viewport, then operational density in the working surface.
4. Do not add macro whitespace to task lists, tables, forms, sidebars, or dashboards if it reduces throughput.

Elevation is border-first:

| Elevation | Use | Rule |
| --- | --- | --- |
| `shadow.none` | Default cards, panels, content groups | No shadow; use borders and tonal contrast. |
| `shadow.1` | Interactive cards, small menus | Optional subtle shadow. |
| `shadow.2` | Popovers and floating panels | Raised surface only. |
| `component-popover-shadow` | Option lists (Select, MultiSelect, DropdownMenu) | No visible edge: elevation alone separates the panel. Sits between `shadow.1` and `shadow.2`. |
| `shadow.3` / `component-modal-shadow` | Modals and overlays | Highest surface only. |

If everything is elevated, nothing is elevated. Standard cards must be flat unless elevation communicates functional hierarchy.

Dark theme: shadows tinted with `neutral.900` vanish on a dark canvas, so the component shadows (popover, modal, button) switch to a black-based stack, and popover and modal add a 1px light line on the top edge. That line is internal to those components and is the only sanctioned inset; the inner shadow rule below still applies everywhere else.

Inner shadow rule:

1. Do not use inner shadows for highlights, borders, bevels, glass edges, selected states, loading rings, or decorative depth.
2. Do not use Tailwind arbitrary `shadow-[inset_*]` utilities or CSS `box-shadow: inset ...` in components.
3. Use borders, outlines, rings, tonal contrast, outer shadows, or explicit structural layers instead.
4. Exceptions require explicit design review and a documented functional reason.

Premium containers:

1. Standard `product-operational` screens must avoid cards inside cards and avoid floating page sections unless the framed surface is a modal, popover, repeated item, or genuinely framed tool.
2. `premium-experience` may use double-bezel containers: an outer shell with subtle tonal background, hairline boundary, tokenized padding, and a larger radius; an inner core with its own surface and smaller concentric radius.
3. Double-bezel containers are not allowed for dense repeated rows, tables, task lists, or ordinary CRUD forms.
4. Double-bezel values must use semantic tokens, `rgb(var(--color-token) / alpha)`, and token spacing/radius. Do not hardcode new hex values.

Visual effects:

1. `product-operational` may use subtle texture, grid, or tonal contrast only when it does not distract from content.
2. `premium-experience` may use glass, mesh gradients, ambient light, or cinematic texture when performance and contrast remain acceptable.
3. Decorative orbs and bokeh remain forbidden in operational tools. They are allowed only in `premium-experience` when they support brand mood and do not obscure product inspection.
4. Backdrop blur is reserved for fixed or sticky layers, overlays, and menus. Do not apply heavy blur to large scrolling content surfaces.

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
| Subtle hover | `--color-hover-subtle` | `bg-hover-subtle` |
| Filled field | `--color-field-bg-filled` | `bg-field-bg-filled` |
| Error text | `--color-error-text` | `text-error-text` |
| Solid fill | `--color-{neutral,accent,info,success,warning,error}-solid` | `bg-success-solid` |
| Text on solid fill | `--color-on-solid` | `text-on-solid` |

Do not use `text-primary` for content text because `primary` represents action color.

Role notes:

1. `focus` is neutral ink (`neutral.950` light, `neutral.50` dark, 17.2:1 on the light background). Focus reads as a state of the control, never as selection or a link.
2. `hover-subtle` exists because `hover-surface` equals `surface-sunken` in light theme. Use it wherever the selected state is already `surface-sunken`.
3. `*-solid` fills are the high-emphasis tone for Alert, Badge, Tag, Chip, and Tabs, and always pair with `on-solid`. Light uses the `.600` steps (error `.500`) with white text, at least 5:1 (error is the floor at 5.1:1). Dark flips to the `.300` steps with `neutral.950` text, at least 7:1.
4. `field-bg-filled` fills the borderless `filled` field variant. `surface-sunken` cannot fill that role: it equals the dark canvas and sits 1.07:1 off the light one.

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

Motion by context:

1. `product-operational` uses micro-motion only: hover, active, focus, alert entry, modal/popup entry, and small transform/opacity transitions.
2. `premium-experience` may use scroll reveal, staggered entry, mask reveals, and cinematic transition choreography when implemented with IntersectionObserver or an equivalent viewport API.
3. Never use `window.addEventListener("scroll")` for continuous scroll animation.
4. Animate only `transform` and `opacity` by default. Avoid animating layout properties in repeated lists.
5. Use custom cubic-bezier easing from tokens or documented component values. Avoid default-looking motion.

### Button

Variants: `primary`, `secondary`, `ghost`, `danger`, `editorial`.

Sizes:

| Size | Height | Padding X |
| --- | --- | --- |
| `sm` | `32px` | `12px` |
| `md` | `40px` | `16px` |
| `lg` | `48px` | `24px` |

Labels must be short verbs. Loading must preserve width. Danger is a solid fill built on the error family (`component-button-danger*`, base = `error-icon`). Editorial uses the linen editorial family, so it never duplicates `primary`. Secondary is outline-only: transparent fill, `control-border` edge, `secondary-hover` fill on hover (not `hover-surface`, which equals the dark modal surface). Every variant shares the same hover: 1px lift, 1.01 scale and the `sf-premium-control` shadow. Button focus is a 2px `focus` ring with a 2px `focus-gap` offset.

Premium CTA rule:

1. Primary CTAs in `premium-experience` should use pill geometry and may use a nested trailing icon island when the CTA is a high-emphasis navigation or conversion action.
2. Product tool buttons in `product-operational` keep Skyforge UI button sizes, variants, and stable icon-button dimensions.
3. Do not convert dense toolbar actions, table row actions, task actions, or destructive controls into marketing-style pill CTAs.

### Input

Labels sit above the input. Helper text is optional but should exist in markup when useful. Error text sits below the input and must be connected with `aria-describedby` when implemented.

Field variants, shared by Input, Textarea, DatePicker, Select, MultiSelect, and AutoComplete:

| Variant | Rest | Hover | Placeholder |
| --- | --- | --- | --- |
| `outline` | `field-bg`, `field-border` | `field-border-hover` | `field-placeholder` |
| `filled` | `field-bg-filled`, no border | No change; the fill alone separates the field | `text-tertiary` (4.6:1 light, 6.2:1 dark) |
| `ghost` | Transparent, no border, no shadow | `border` edge on `surface-raised` | `field-placeholder` |

### Option Lists

Select, MultiSelect, and DropdownMenu share one row anatomy: an optional 16px leading slot (icon, checkbox, or radio), the label, and an optional trailing slot (shortcut, selected check, submenu chevron). The leading slot stays in the flow with one gap, so labels line up across mixed rows; `inset` pads a row without leading content to match.

1. The panel has no visible edge: `surface-raised` plus `component-popover-shadow`.
2. Highlighted rows use `component-option-highlight`; separators run full-bleed in `component-option-divider`. In dark theme both take the step above `surface-raised`, which `hover-surface` and `divider` equal.
3. Group labels are uppercase `eyebrow` in `text-tertiary`.
4. Select marks the chosen row with a trailing accent check and semibold text. MultiSelect and DropdownMenu checkbox rows use a leading checkbox filled with `primary` when checked.
5. Shortcuts render as a small keycap with tabular figures.

### Card

Cards are structural surfaces, not decoration. Default card style is surface plus border, no shadow. Use raised elevation only for floating or interactive hierarchy.

### Modal

Modals must trap focus, close by keyboard, use an accessible title, and render on a raised surface. If content becomes multi-section and complex, use a route/page instead.

The panel reads by elevation, not by a heavy outline: its edge is `component-modal-border` (one step below `border-strong` in light, `neutral.700` in dark) and its shadow is `component-modal-shadow`. The close button is a filled circle (`component-modal-close-bg`). Title is `heading-lg`, description `body-md`; body sits 20px below the header and the footer 32px below the body. Dark theme raises `--overlay-alpha` to `0.64`, since the canvas is already near-black.

### Tabs

Use tabs for related content, not for multi-select filters. Implement `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `role="tabpanel"`, and keyboard behavior in production.

Variants: `underline`, `segmented`, `rail`, `ghost`.

`appearance` sets the selected treatment of `segmented` and `rail`: `solid` (default) or `soft`. `underline` and `ghost` ignore it.

| Variant | Wrapper | Selected item |
| --- | --- | --- |
| `segmented` / `rail`, `solid` | `segmented`: `surface-sunken` track, `border`, radius, `4px` padding. `rail`: vertical list with a `divider` side line | `neutral-solid` fill with `on-solid` text, no border |
| `segmented` / `rail`, `soft` | Same | `accent-bg`, `accent-border`, `accent-text` |
| `ghost` | Transparent, no border, no visible padding | `surface-sunken`, no border, `text-primary` text and icon |

Hover uses `hover-surface`, except `ghost`, which hovers on `hover-subtle`: in light theme `hover-surface` and `surface-sunken` coincide, so the lighter hover keeps it apart from selection. Selection never changes font weight, so a solid fill never shifts the row's width.

Count and dot badges (`count`, `dot`, `badgeLabel` on `TabsTrigger`):

1. Badges are always `accent-solid` with `on-solid` text, so the charcoal fill stays reserved for selection.
2. `count` shows `99+` above 99 and hides at 0. `count` wins over `dot`.
3. Icon-only triggers carry the badge on the icon's corner with a 2px ring of the surface behind the trigger (the selected solid fill, when selected). Labelled triggers place it after the text, pushed to the end in `rail`.
4. The badge joins the accessible name: `badgeLabel` when given, else the count. A `dot` without `badgeLabel` is visual only.

Icon-only tabs (`iconOnly` on `Tabs`, `icon` and `label` on each `TabsTrigger`):

1. `label` is required and is both the `aria-label` and the tooltip content. The tooltip does not also describe the trigger.
2. Triggers are 32×32px squares with 20px icons and a transparent border at rest, so selection never shifts layout.
3. 32×32px targets are for pointer-driven desktop surfaces (they meet WCAG 2.2 2.5.8 AA, not 2.5.5 AAA). Use labelled tabs on touch surfaces.
4. Disabled triggers get no hover and no tooltip.
5. Render a panel for the selected tab so `aria-controls` always resolves.

Focus is a halo, never a lone ring that can read as selection: `1px` of the surface directly behind the control, then a `2px` `focus` ring. The gap color comes from the inheritable `--sf-focus-gap` property (Tailwind `ring-offset-focus-gap`): containers that paint their own surface set it (`segmented` sets `surface-sunken`), everything else falls back to `background`. Never hardcode the gap to one surface.

### Badge And Alert

Badges are metadata, not CTAs. Alerts must explain what happened and what the user can do next. Feedback variants use feedback tokens, not brand colors.

Alert, Badge, Tag, and Chip take `appearance`: `solid` (default) fills with the tone's `*-solid` and `on-solid`; `soft` is the quieter tinted surface (`*-bg`, `*-border`, `*-text`). On solid, icons and dots follow the text color.

1. Solid Alert drops the side bar, since the fill already carries the tone.
2. Solid Tag uses medium weight, so classification stays quieter than a solid Badge's status.
3. A custom-color Badge on solid keeps white text in both themes, so the color must hold 4.5:1 against white.
4. Solid Chip fills only when selected or static. An unselected interactive chip is outlined (`border`, `text-secondary`), so the fill alone marks selection. Hover and press on a solid fill darken it with a neutral-950 overlay, which reads on both themes.

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
