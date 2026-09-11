---
target: the components
total_score: 20
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 2
target_identity: "file:/home/luiswagnerab/Projetos/Skyforge/skyforge-ui/src/components"
timestamp: 2026-09-05T18-18-12Z
slug: src-components
---
**Method: dual-agent (A: aff045583b6dec7fc · B: a312a58b61d907dcd)**
**Target:** `src/components` — 26 components · Skyforge UI · Operate mode

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | `loading` on 3 of 26 components. `Progress` indeterminate renders a static 42% bar with `animate-pulse` (`Progress.tsx:101`) — a fake percentage that never moves. AutoComplete/Select/MultiSelect/DatePicker have no loading state. |
| 2 | Match System / Real World | 2 | `DatePicker` hardcodes `DD-MM-YYYY` (`DatePicker.tsx:51`) regardless of `locale`. `Spinner tone="primary"` is teal, `Button variant="primary"` is carbon black. |
| 3 | User Control and Freedom | 2 | `Alert` has no dismiss and no `onClose` (`Alert.tsx:23-28`). AutoComplete (`:221`) and DatePicker force the popover open on `onFocus` with no opt-out. |
| 4 | Consistency and Standards | 1 | `accent` is teal in Badge/Avatar, carbon-at-10% in Tag/Chip. `className` lands on the control in Input/Select, on the wrapper in AutoComplete/MultiSelect. Three separate field-status implementations. |
| 5 | Error Prevention | 1 | `utils/cn.ts:1-3` is `filter(Boolean).join(" ")` — no tailwind-merge, so consumer `className` overrides resolve by stylesheet order across all 26 components. `required` never reaches any control. |
| 6 | Recognition Rather Than Recall | 2 | `label={null} helperText={null}` incantation to nest a field in `FormField`. Which components accept `containerClassName`, which have `size="sm"` — all recall. |
| 7 | Flexibility and Efficiency | 2 | `Input`/`Select`/`Textarea` have no `sm` size (`Input.tsx:19`). No `Card` despite `DESIGN_SYSTEM_RULES.md:285-287`. Table has no sort or row-selection prop. |
| 8 | Aesthetic and Minimalist Design | 2 | `.sf-premium-control` drop shadow on 30 call sites across 18 files, against a stated border-first identity. `Table` header/footer tinted with the linen family. |
| 9 | Error Recovery | 3 | `errorText` → `aria-describedby` + `aria-invalid` wired correctly across nine components. But `Radio` has none of it (`Radio.tsx:18-24`). |
| 10 | Help and Documentation | 3 | Component registry, `autodocs` on all 26 stories, Foundations swatch board. But 3 of 26 stories have `play` tests, and the required state matrix does not exist. |
| **Total** | | **20/40** | **Acceptable — significant improvements needed** |

## Design Specificity Verdict

**LLM assessment:** A well-tokenized Radix/shadcn wrapper wearing a manifesto it does not follow. The point of view lives in `design-tokens.json`, `src/styles.css`, and `DESIGN_SYSTEM_RULES.md` — and evaporates on entry to `src/components/`.

The tell is `.sf-premium-control` (`styles.css:575-591`): an ambient drop shadow on every Button, Input, Textarea, Select trigger, Checkbox, Radio, Switch, Avatar, Progress track, Tabs list, Pagination button, DropdownMenu trigger, DatePicker nav, and Modal close — 30 call sites. PRODUCT.md says shadows are reserved for floating layers. The rules say "If everything is elevated, nothing is elevated" (`DESIGN_SYSTEM_RULES.md:180`). Yet `sf-premium-surface` (= `--shadow-2`, the popover token) sits on an inline `Alert` (`Alert.tsx:84`), a `Table` (`Table.tsx:62`), and an `AccordionItem` (`Accordion.tsx:24`) — none of which float. The class is named *premium* in a library whose governance forbids premium treatment in operational surfaces (`DESIGN_SYSTEM_RULES.md:278-279`).

The motion vocabulary confirms it: `hover:-translate-y-px` + `active:scale-[0.98]` on Button, Select, MultiSelect, Checkbox, Radio, Switch, Tabs trigger, Pagination, DropdownMenu, DatePicker cells, Modal close, AvatarGroup. `Button.tsx:71` makes the icon independently translate, lift, and scale. A checkbox that levitates on hover is not restrained brutalism; it is the 2021 SaaS hover-lift, and it is the most-repeated gesture in the codebase. Every button is `rounded-sf-full` — pill geometry the rules quarantine to premium CTAs and forbid for dense toolbar, table row, task, and destructive controls (`DESIGN_SYSTEM_RULES.md:277-279`).

What is authored: the `editorial` Button variant, Alert's 4px left rail, TableEmpty's bare primary dash, the z-index comment at `styles.css:42-45`, the `--color-control-border` WCAG 1.4.11 note, and the `forced-colors` block. Five moments of real authorship across 6,687 lines. Strip the shadows and the pill radius and a genuinely distinctive border-first system is underneath.

**Deterministic scan:** Static scan of `src/components`: **1 finding** — `side-tab` at `Table.tsx:114` (`border-l-4`), a **false positive** (a `data-selected=true` row marker, not a card accent). `src/stories`: clean. **Zero hardcoded colors** in `src/components/**/*.tsx`. Console: 0 errors, 0 warnings across 173 messages.

Rendered scans across 16 story URLs in both themes: 12 component findings — `cramped-padding` ×2 and `nested-cards` ×2 on Table states, `marquee` ×1 on Table (false positive: `.sf-skeleton::after` shimmer), `cramped-padding` ×1 on Tabs (false positive: flush-to-border is the underline-tab design). Button, Input, Select, Modal, Alert, DatePicker, MultiSelect, AutoComplete, DropdownMenu, Badge, Progress, Checkbox, Tooltip: clean in both themes. The Foundations docs story returned 10 more findings, but that is documentation, not shipped components.

**Where they disagree matters more than where they agree.** The detector is nearly silent while the design review scores 20/40. Every defect here is systemic and self-consistent: a uniformly applied wrong shadow, a uniformly applied wrong radius, a token collision, a missing state. Pattern detectors find local slop. This library has none. It has a coherent execution of a design different from the one it documents.

**Visual overlays:** Injection succeeded. Live server on port 8400, `detect.js` loaded, 10 globals registered, 17 overlay nodes, `impeccableDetectAsync()` returned 9 element groups on Foundations — consistent with the CLI URL scan. Live server and Storybook both stopped before reporting.

Two side effects from Assessment B: a pre-existing Storybook on port 6006 was killed by the agent's cleanup pattern. And commit `2c524db "refactor: audit ajust"` landed from another actor mid-session; all measurements are against that tree.

## Overall Impression

The engineering is better than the design discipline. Token coverage is total, the accessibility plumbing in the field family is above commercial average, and the forced-colors handling is something almost nobody gets right. Then the components apply a shadow-and-lift treatment that the project's own rules document forbids, on nearly every control.

The biggest opportunity is not adding anything. Delete `.sf-premium-control`, drop the hover-lift, un-pill the operational buttons — and the border-first system that `styles.css` already describes becomes visible for the first time.

## What's Working

1. **The focus contract beats most commercial libraries.** `styles.css:308-314` gives every focusable element — including the consumer's own markup — a 2px `--color-focus` outline. `styles.css:316-331` re-establishes it as a real `outline` under `@media (forced-colors: active)`, because Tailwind's `ring-*` utilities are box-shadows that Windows High Contrast refuses to paint. Measured live: **5.03:1 light, 7.79:1 dark**, on 27 of 30 tab stops, verified by real Tab traversal (49 focus events per theme).

2. **`utils/fieldStatus.ts:26-37` is the right abstraction.** It collapses `errorText`, explicit `status="error"`, and raw `aria-invalid` into one resolved truth. Select, AutoComplete, MultiSelect, and DatePicker all route through it and emit `aria-invalid`, `data-invalid`, `data-status`, and a `feedbackId` joined into `aria-describedby`.

3. **DatePicker's calendar keyboard model is hand-written and complete.** Arrow keys, Home, End, PageUp, PageDown with correct month-boundary rollover, roving `tabIndex`, and a `dayButtonRefs` map that refocuses the right cell after re-render. APG-grade grid navigation most libraries outsource.

## Priority Issues

### [P0] Dark theme: every `filled` field variant has zero boundary
**What:** `styles.css:201` sets `--color-surface-sunken: 24 24 26` — byte-identical to `--color-background` at line 197. In light they differ (236 236 238 vs 246 246 247). Every `filled` variant is `border-transparent bg-surface-sunken`, so in dark it measures **1.00:1** fill against the page with a transparent border. Affects Input (`:41`), Select (`:41`), Textarea (`:28`), MultiSelect (`:44`), AutoComplete (`:46`), DatePicker (`:167`).
**Why it matters:** PRODUCT.md commits to sufficient control-boundary contrast in both themes. WCAG 1.4.11 requires 3:1. This is 1.00. Light is 1.09 — also failing. A user in a dark Skyforge app cannot see where to click, and every consuming project inherits it identically.
**Fix:** Give dark `--color-surface-sunken` a distinct value, and give `filled` a real `--color-control-border` at ≥3:1 in both themes instead of `border-transparent`. Add a Foundations story asserting sunken ≠ background per theme.
**Suggested command:** `/impeccable audit`, then `/impeccable harden`

### [P0] Every portaled overlay escapes `ThemeProvider`
**What:** `src/theme/ThemeProvider.tsx:11-17` writes `data-theme` to a wrapper div. Modal, Select, DropdownMenu, Tooltip, DatePicker, AutoComplete, and MultiSelect all portal to `document.body` — outside that div — resolving `:root` light-theme variables.
**Why it matters:** A dark Skyforge app opens white modals and white dropdowns. Theme parity is a core product behavior and a durable brand commitment. Worse: `.storybook/preview.tsx:24-27` sets the theme on `documentElement`, so the library's only review surface structurally cannot reproduce the bug.
**Fix:** Write `data-theme` to `document.documentElement` in an effect (keep the div for nested scoping), default to `matchMedia("(prefers-color-scheme: dark)")` rather than hardcoded `"light"`, persist to `localStorage` in a try/catch. Add a story that mounts `ThemeProvider theme="dark"` and opens a Modal.
**Suggested command:** `/impeccable harden`

### [P1] `sf-premium-control` contradicts the stated identity on 30 call sites
**What:** `styles.css:575-591` applies `box-shadow: 0 10px 28px …` to every interactive control, deepening on hover. `sf-premium-surface` applies popover-grade `--shadow-2` to Alert, Table, and AccordionItem. Both sit outside `@layer base`, so they outrank every Tailwind utility a consumer could use to remove them.
**Why it matters:** This is the one decision that makes the library generic. It violates PRODUCT.md's shadow rule and four separate lines of `DESIGN_SYSTEM_RULES.md`. With the pill radius and hover-lift, it converts a border-first brutalist system into a hover-lift SaaS kit.
**Fix:** Delete `.sf-premium-control` and remove it from all 30 sites; let borders and `--color-control-border` carry the boundary. Keep `sf-premium-surface` on popover content and Modal only; strip it from `Alert.tsx:84`, `Table.tsx:62`, `Accordion.tsx:24`. Replace `hover:-translate-y-px` / `hover:scale-*` with tonal and border changes per `DESIGN_SYSTEM_RULES.md:240`; keep `active:` transforms. Un-pill operational buttons per `:277-279`.
**Suggested command:** `/impeccable distill`

### [P1] MultiSelect looks like a listbox and is a pile of toggle buttons
**What:** `MultiSelect.tsx:159-196` renders popover content with no `role="listbox"` and options as `<button aria-pressed>` with no `role="option"`. The trigger (`:124-137`) has no `aria-expanded`, `aria-haspopup`, or `aria-controls`. Radix Popover gives no roving focus, so every option is its own tab stop, with no arrow keys and no type-ahead.
**Why it matters:** A screen-reader user hears "button, pressed" — no list, no count, no selected total. A keyboard user Tabs through all N options to escape. `AutoComplete.tsx:210-215` gets the combobox pattern right in the same repo, making this a consistency failure, not a knowledge gap.
**Fix:** `role="listbox" aria-multiselectable="true"` on content, `role="option" aria-selected` on items, `aria-expanded`/`aria-haspopup="listbox"`/`aria-controls` on the trigger, and either `aria-activedescendant` with an arrow handler mirroring `AutoComplete.tsx:143-179` or roving `tabIndex`. Give the trigger an accessible summary.
**Suggested command:** `/impeccable harden`

### [P2] The `className` escape hatch does not work, and `required`/`readOnly` are specified but absent
**What:** `utils/cn.ts:1-3` is `filter(Boolean).join(" ")`, so consumer `className` overrides resolve by stylesheet order across all 26 components; `Button.stories.tsx:85` documents `className="w-sf-40 px-0"` as the icon-button pattern, which works only by luck of ordering. `required` exists only on `FormField`, renders an `aria-hidden` asterisk, and is absent from `FormFieldRenderProps`. `readOnly` has zero implementation despite `--color-field-bg-readonly` being defined in both themes and exposed in `tailwind.config.ts:56`.
**Why it matters:** A required field is invisible to assistive tech — the user submits, then learns it was mandatory. With no canonical treatment, each Skyforge project invents its own asterisk and read-only grey. That drift is what this library exists to prevent.
**Fix:** Swap `cn` for `twMerge` with a config registering the `sf-*` scales; remove `!rounded-none` from `Tabs.tsx:33`; add a first-class `iconOnly` prop to Button. Add `required` to the nine field components (asterisk in the label and `aria-required` on the control) and to `FormFieldRenderProps`. Implement `readOnly` on Input/Textarea/DatePicker using the token that already exists.
**Suggested command:** `/impeccable shape`, then `/impeccable optimize`

## Persona Red Flags

**Alex (developer consuming the library at speed)**
- `Input.tsx:19` offers only `md | lg`. A dense filter bar with `<Button size="sm">` (32px) beside `<Input>` (40px floor) cannot align. Select, Textarea, AutoComplete, MultiSelect, DatePicker share the gap.
- `AutoComplete.tsx:55`, `MultiSelect.tsx:53`, and `FormField.tsx:22` are not `forwardRef`. `react-hook-form`'s `register()` silently fails on three of nine field components.
- Nine value-bearing components, six change-handler shapes: `onValueChange(value)`, `onValueChange(value, option)`, `onDateChange`, `onPageChange`, `onRemove`, plus Radix's `onCheckedChange`.
- `DropdownMenuTrigger` is hardcoded `h-sf-40` with `secondary | ghost` only. No dropdown fits a 32px toolbar.
- `utils/aliases.ts:16-33` accepts `danger`↔`error`, `variant`↔`tone`, `ghost`↔`plain`, `default`↔`comfortable`. Two spellings for four concepts, no signal which is canonical.

**Sam (accessibility-dependent end user of apps built on this)**
- Dark theme, any `filled` field: 1.00:1 boundary — measured. He cannot find the input.
- `MultiSelect.tsx:172-178`: "button, pressed" instead of "option, selected, 2 of 8." No list semantics, N tab stops.
- `Pagination.tsx:107`: the current page is `disabled`, therefore unfocusable, therefore its `aria-current="page"` is never announced.
- `Avatar.tsx:47-52`: `busy` vs `away` vs `offline` conveyed by dot color alone, inside `aria-hidden="true"`. `DESIGN_SYSTEM_RULES.md:158` forbids exactly this.
- Three focusable containers have no focus styling at all — the `role="radiogroup"` div in Radio states and two `role="tablist"` divs in Tabs. Tabpanels are correctly styled; this is containers only.
- Dark disabled text measures 3.41:1 where light measures 5.54:1. WCAG exempts disabled controls, so not a conformance failure — but the story asserts "Disabled values remain readable," and dark is materially weaker than the stated intent.
- `Radio.tsx:18-24`: no `errorText`, no `aria-invalid`, no invalid styling.

**Luis (sole author, needs this to hold across projects for years)**
- **No `Card`.** `DESIGN_SYSTEM_RULES.md:285-287` specifies it, `:251` requires it for completeness, `--component-card-padding: 24px` sits unused at `styles.css:76`. Every app hand-rolls one.
- **`accent` already means two things in one release.** Badge and Avatar render teal; Tag and Chip render carbon at 10%.
- **Dead size scales that look alive.** `Radio.tsx:31-34` maps both `sm` and `md` to `h-sf-8`; `Pagination.tsx:26-29` maps both to `h-sf-16`.
- **`utils/aliases.ts` institutionalizes the drift rather than closing it.** Its rationale is not breaking consuming projects — at 0.3.0, with one consumer. This is the cheapest this rename will ever be.
- **Three field-status implementations.** `Input.tsx:51-63` and `Textarea.tsx:37-49` hold verbatim copies of what `utils/fieldStatus.ts` exports to four other components.

## Minor Observations

- **Table empty state renders off-screen at 375px.** `Table.tsx:78` sets `min-w-[640px]`; `Table.tsx:176` centers the empty block. Measured: the cell spans 640px inside a 277px scroller, so the centered block sits at x≈369 — outside the viewport. Everything else at 375px is clean: 0px page overflow on every story, 0 targets under 24×24px, Modal correct at 341–343px with stacked footer buttons.
- Placeholder contrast on DatePicker and AutoComplete `filled`: 4.17:1, under 4.5. Dark-theme placeholders were not measured.
- Ghost text inputs have no perceivable boundary in either theme when empty.
- Success/warning/invalid borders measure 1.6–2.2:1 as the state signal. Each state also carries an icon and helper text, so state is not color-alone — but the border does no perceptual work.
- `Select.tsx:94` and `MultiSelect.tsx:90` compute an `errorId` that is never used.
- `Modal.tsx:50` carries `ring-1 ring-inset ring-surface-raised` — an inset shadow the same color as its background, forbidden by `DESIGN_SYSTEM_RULES.md:184-185`. `Progress.tsx:128` has the same problem.
- `Tooltip.tsx:19-25` silently returns `null` when `children` is not a string.
- `p-sf-20` on `Alert.tsx:84` uses a sizing token as spacing, off the approved scale.
- `Textarea.tsx:33-34` uses raw `min-h-[96px]`/`min-h-[128px]` while `sf-96` and `sf-128` exist.
- `Modal`'s Header/Body/Footer are plain functions while Title/Description are `forwardRef`. Same split in `AvatarGroup` and `DropdownMenuShortcut`.
- `DatePicker` uses `role="row"` on `display:contents` elements, which has a documented history of dropping from the accessibility tree.

## Questions to Consider

1. Your rules document forbids premium treatment in operational surfaces, and your most-reused CSS class is named `sf-premium-control`. Which is the real system?
2. If a stranger installed the package with shadows and pill radii stripped, name three components that would still read as yours. If you can't name three, the identity lives in `design-tokens.json`, not in the library.
3. `utils/aliases.ts` defers a rename to avoid breaking consumers, at 0.3.0, with one consumer. What does that rename cost now, and what will it cost at 1.0?
4. Storybook themes via `documentElement`; `ThemeProvider` themes via a wrapper div. What else can your review environment structurally not show you?
5. `DESIGN_SYSTEM_RULES.md:251` says the library is not complete without a Card state matrix. Card does not exist. Which other rules in that file are currently aspirational rather than binding?
