# SKYFORGE UI Agent Guide

## Purpose

`SKYFORGE-UI.md` is the AI-agent usage guide for Skyforge UI. Use it as the single operational reference when building interfaces with this component library.

This guide centralizes component usage, design-system rules, practical examples, variants, states, and implementation practices. It reduces ambiguity, prevents rework, and speeds up creation of scalable interfaces aligned with the Skyforge ecosystem.

## Source Order

When instructions conflict, follow this order:

1. `design-tokens.json`
2. `src/styles.css`
3. `DESIGN_SYSTEM_RULES.md`
4. `SKYFORGE-UI.md`
5. Component source in `src/components/*`
6. Storybook stories in `src/components/**/*.stories.tsx`

## Agent Rules

Use Skyforge UI components before raw HTML controls.

Do not create duplicate local versions of existing primitives.

Do not hardcode product colors. Use semantic Tailwind tokens such as `bg-surface`, `text-content-primary`, `border-border`, `ring-focus`, `text-error-text`.

Do not use visible pure black. `#000000` is only for alpha overlays and compositing.

Use Heroicons only for product icons. Keep `strokeWidth={1.5}`.

Labels, helper text, status text, error text, tooltip content, and similar user-facing string props must be strings, `null`, or `undefined`. Do not pass objects or React elements unless component API explicitly allows content nodes.

Every interactive surface must include hover, active, focus-visible, disabled, and invalid states where relevant.

Use `Progress` for determinate progress. Use skeleton loaders that match layout shape. Use `Spinner` only for compact inline indeterminate activity.

Use `FormField` for composed custom field layouts. Use built-in `label`, `helperText`, and `errorText` props on simple fields.

Prefer `TableEmpty` and `TableLoading` for table empty/loading states.

Do not use removed or unsupported components: `Label`, `Loading`, `TableCaption`.

## Package Installation

Current documented package version: `0.2.1`.

Install Skyforge UI from npm:

```bash
npm install @luiswagnerab/skyforge-ui
```

Peer dependencies required by the host app:

- `react >=18.2.0`
- `react-dom >=18.2.0`

Import package stylesheet once at app entry if your bundler does not apply styles automatically:

```tsx
import "@luiswagnerab/skyforge-ui/styles.css";
```

Import components from the package entry:

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  Button,
  Input,
  Progress,
  ThemeProvider
} from "@luiswagnerab/skyforge-ui";
```

## Setup

Wrap themed surfaces with `ThemeProvider` when app shell does not already set `data-theme`.

```tsx
<ThemeProvider theme="light">
  <App />
</ThemeProvider>
```

Supported themes are `light` and `dark`.

## Visual System

Skyforge UI is minimal, technical, sophisticated, and editorial. It balances restrained brutalism with system-driven interfaces.

Default experience context is `premium-experience`. Components should feel more haptic, spacious, and cinematic while preserving token-first implementation, accessibility, and stable APIs.

Use border-first hierarchy. Shadows are reserved for floating layers such as popovers, dropdowns, tooltips, and modals.

Use Plus Jakarta Sans for display and hierarchy. Use Inter for dense product reading and forms.

Use spacing tokens: `sf-4`, `sf-8`, `sf-12`, `sf-16`, `sf-24`, `sf-32`, `sf-48`, `sf-64`, `sf-96`, `sf-128`.

Use radius tokens: `sf-sm`, `sf-md`, `sf-lg`, `sf-xl`, `sf-2xl`, `sf-full`.

Do not use inner shadows. Use borders, outlines, rings, tonal contrast, outer shadows, or structural layers instead.

## Component Registry

| Component | Use for | Key variants or props |
| --- | --- | --- |
| `Accordion` | Progressive disclosure inside a surface | `Accordion`, `AccordionItem`, `AccordionHeader`, `AccordionTrigger`, `AccordionContent`, `type`, `collapsible`, `variant` |
| `Alert` | Status, success, warning, error messaging | `variant="info" | "success" | "warning" | "error"`, `title` string |
| `AutoComplete` | Searchable single selection | `options`, `value`, `defaultValue`, `onValueChange`, `variant`, `size` |
| `Avatar` | Identity display | `size="sm" | "md" | "lg"`, `status` |
| `Badge` | Compact non-interactive metadata and status counts | `variant="neutral" | "accent" | "info" | "success" | "warning" | "error"`, `size`, `dot`, `icon` |
| `Button` | Actions | `variant`, `size`, `loading`, `leftIcon`, `rightIcon` |
| `Checkbox` | Boolean or multi-select form item | `label`, `helperText`, `errorText`, `size` |
| `Chip` | Selectable or removable compact filters | `variant`, `size`, `selected`, `onClick`, `onRemove` |
| `DatePicker` | Date entry with calendar | `DD-MM-YYYY`, `locale="en" | "pt-BR"`, `onDateChange` |
| `DropdownMenu` | Action menus and contextual commands | Radix-style compound API |
| `FormField` | Composed custom fields | render prop gives `id`, `aria-describedby`, `aria-invalid` |
| `Input` | Single-line text or number entry | `type="text" | "number"`, `variant`, `size`, `status`, `loading` |
| `Modal` | Focus-trapped dialogs | `Modal`, `ModalTrigger`, `ModalContent`, title and description |
| `MultiSelect` | Multi-choice selection | `options`, `value`, `defaultValue`, `onValueChange` |
| `Pagination` | Page navigation | `page`, `totalPages`, `onPageChange`, `siblingCount` |
| `Progress` | Determinate task completion or measurable loading | `value`, `max`, `label`, `showValue`, `size`, `tone` |
| `RadioGroup`, `Radio` | Single-choice groups | `orientation`, `label`, `helperText` |
| `Select` | Single-choice dropdown | Radix-style compound API |
| `Skeleton` | Shape-matched loading state | `variant`, `size`, `lines` |
| `Spinner` | Compact inline loading | `size`, `tone`, `label` |
| `Switch` | Binary setting toggle | `label`, `helperText`, `errorText`, `size` |
| `Tabs` | Related panels | `variant="underline" | "segmented" | "rail"` |
| `Table` | Structured data | `density`, `surface`, `TableEmpty`, `TableLoading` |
| `Tag` | Compact metadata, status labels, removable filters | `variant="neutral" | "accent" | "info" | "success" | "warning" | "error"`, `size`, `onRemove` |
| `Textarea` | Multi-line text entry | `variant`, `size`, `status`, `loading` |
| `Tooltip` | Brief contextual hint | `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent` |

## Field Pattern

Simple fields should use built-in label and messages.

```tsx
<Input
  label="Project key"
  helperText="Use a short, stable identifier."
  placeholder="release-vault"
/>
```

Use `errorText` for invalid state. It sets error styling and connects feedback via `aria-describedby`.

```tsx
<Input
  label="Project key"
  errorText="Project key is required."
  placeholder="release-vault"
/>
```

Use `FormField` when composing controls manually.

```tsx
<FormField label="Project key" helperText="Use a short, stable identifier.">
  {(field) => (
    <Input
      {...field}
      label={null}
      helperText={null}
      placeholder="release-vault"
    />
  )}
</FormField>
```

## Buttons

Use short verb labels. Loading preserves width.

```tsx
<Button variant="primary" size="md">
  Publish
</Button>

<Button variant="secondary" loading>
  Saving
</Button>
```

Variants: `primary`, `secondary`, `ghost`, `danger`, `editorial`.

Sizes: `sm`, `md`, `lg`.

Use `danger` only for destructive actions.

## Text Inputs

Use `Input` for single-line text or number values, `Textarea` for long copy, and `DatePicker` for dates.

`Input` must use only `type="text"` or `type="number"`. Use `text` when value is identifiers, names, keys, emails, or formatted strings. Use `number` only for numeric values where browser number controls and numeric validation are useful.

```tsx
<Input
  type="text"
  label="Project key"
  helperText="Use lowercase letters and hyphens."
  placeholder="release-vault"
/>

<Input
  type="number"
  label="Retry limit"
  helperText="Use a value between 1 and 8."
  min={1}
  max={8}
  defaultValue={3}
/>
```

```tsx
<Textarea
  label="Release notes"
  helperText="Summarize token changes and review risk."
  placeholder="Updated color aliases and table states."
/>
```

`DatePicker` uses `DD-MM-YYYY` and supports English or Brazilian Portuguese calendar labels.

```tsx
<DatePicker
  label="Release date"
  defaultValue="18-05-2026"
  locale="pt-BR"
  onDateChange={(value) => console.log(value)}
/>
```

## Selection Controls

Use `Checkbox` for boolean or multi-check items.

```tsx
<Checkbox
  label="Sync design tokens before publishing"
  helperText="Stores preference in the workspace profile."
/>
```

Use `Switch` for binary settings.

```tsx
<Switch
  label="Auto-sync tokens"
  helperText="Applies to new release drafts."
/>
```

Use `RadioGroup` and `Radio` for exactly one choice.

```tsx
<RadioGroup defaultValue="stable">
  <Radio value="stable" label="Stable" />
  <Radio value="candidate" label="Candidate" />
</RadioGroup>
```

Use `Select` for single-choice menus.

```tsx
<Select defaultValue="stable">
  <SelectTrigger label="Release channel" placeholder="Choose channel" />
  <SelectContent>
    <SelectItem value="stable">Stable</SelectItem>
    <SelectItem value="candidate">Candidate</SelectItem>
  </SelectContent>
</Select>
```

Use `MultiSelect` for multiple choices.

```tsx
const checks = [
  { value: "tokens", label: "Token diff" },
  { value: "contrast", label: "Contrast pass" }
];

<MultiSelect
  label="Release checks"
  defaultValue={["tokens"]}
  options={checks}
/>
```

Use `AutoComplete` for searchable single selection.

```tsx
const owners = [
  { value: "maia-rocha", label: "Maia Rocha", description: "Design systems owner" },
  { value: "vera-calder", label: "Vera Calder", description: "Release operations" }
];

<AutoComplete
  label="Release owner"
  options={owners}
  placeholder="Search owners"
/>
```

## Overlays

Use `DropdownMenu` for contextual actions.

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Release actions</DropdownMenuLabel>
    <DropdownMenuItem>Duplicate draft</DropdownMenuItem>
    <DropdownMenuItem danger>Archive release</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

Use `Tooltip` only for short non-critical hints.

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="secondary">Token status</Button>
    </TooltipTrigger>
    <TooltipContent>Latest token export completed 14 minutes ago.</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

Use `Modal` for focus-trapped blocking decisions or short workflows.

```tsx
<Modal>
  <ModalTrigger asChild>
    <Button>Open review</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Review release</ModalTitle>
      <ModalDescription>Confirm package changes before publishing.</ModalDescription>
    </ModalHeader>
    <ModalBody>Token diff and accessibility pass are ready.</ModalBody>
  </ModalContent>
</Modal>
```

## Navigation

Use `Accordion` for progressive disclosure inside a page or panel. Do not use it as primary navigation.

Variants: `outline`, `ghost`.

Accordion content animates open and closed through Radix height variables. Respect `prefers-reduced-motion`; do not add JavaScript height measurement or scroll listeners.

```tsx
<Accordion type="single" collapsible defaultValue="tokens" variant="outline">
  <AccordionItem value="tokens">
    <AccordionHeader>
      <AccordionTrigger>Token validation</AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>
      Token aliases were checked against light and dark themes.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

Use `type="multiple"` only when users need several sections open at once.

Use `Tabs` for related panels, not multi-select filters.

```tsx
<Tabs defaultValue="audit" variant="segmented">
  <TabsList aria-label="Release sections">
    <TabsTrigger value="audit">Audit</TabsTrigger>
    <TabsTrigger value="tokens">Tokens</TabsTrigger>
  </TabsList>
  <TabsContent value="audit">Audit content.</TabsContent>
  <TabsContent value="tokens">Token content.</TabsContent>
</Tabs>
```

Use `Pagination` for page navigation.

```tsx
<Pagination
  page={6}
  totalPages={18}
  siblingCount={1}
  onPageChange={(page) => setPage(page)}
/>
```

## Data Display

Use `Table` for tabular data. Use `numeric` for numbers so digits align. Use `TableEmpty` and `TableLoading` for states.

```tsx
<Table density="default" surface="outline">
  <TableHeader>
    <TableRow>
      <TableHead>Owner</TableHead>
      <TableHead>Status</TableHead>
      <TableHead alignText="right" numeric>Risk</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow data-selected="true">
      <TableCell>Maia Rocha</TableCell>
      <TableCell>Ready</TableCell>
      <TableCell alignText="right" numeric>18.7%</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

```tsx
<TableBody>
  <TableLoading colSpan={3} rows={3} />
</TableBody>

<TableBody>
  <TableEmpty
    colSpan={3}
    title="No release threads"
    description="Create a release draft to populate this table."
  />
</TableBody>
```

Do not use `TableCaption`; it does not exist.

## Feedback And Status

Use `Alert` for inline system feedback.

```tsx
<Alert title="Tokens synchronized" variant="success">
  Release passed validation and can move to review.
</Alert>
```

Use `Progress` for measurable completion. Pass `value={null}` only when progress exists but current measurement is unavailable.

```tsx
<Progress
  label="Release progress"
  helperText="Validation passed in two of three environments."
  value={64}
  showValue
/>
```

Use `Skeleton` for loading shapes.

```tsx
<Skeleton variant="text" lines={4} label="Loading release notes" />
```

Use `Spinner` only for compact inline indeterminate activity.

```tsx
<Spinner size="sm" label="Loading" />
```

Use `Badge` for compact non-interactive metadata, status labels, and counts. Do not use it as a CTA.

```tsx
<Badge dot variant="success">Online</Badge>
<Badge variant="warning">3 pending</Badge>
```

Use `Chip` for selectable or removable compact filters.

```tsx
<Chip onClick={() => setFilter("active")} selected>
  Active
</Chip>

<Chip onRemove={() => removeFilter("blocked")} removeLabel="Remove blocked filter" variant="error">
  Blocked
</Chip>
```

Use `Tag` for compact metadata, status labels, and removable filters. Do not use it as a CTA.

```tsx
<Tag variant="success">Validated</Tag>

<Tag onRemove={() => removeFilter("blocked")} removeLabel="Remove blocked filter" variant="error">
  Blocked
</Tag>
```

## Identity

Use `Avatar` for people or service identities. Prefer initials fallback. Use realistic names in examples.

```tsx
<Avatar status="online">
  <AvatarImage src="https://picsum.photos/seed/maia-rocha/96/96" alt="Maia Rocha" />
  <AvatarFallback>MR</AvatarFallback>
</Avatar>
```

## Required States

Every new UI surface built with Skyforge UI must consider these states:

| State | Required treatment |
| --- | --- |
| Default | Token-aligned resting style |
| Hover | Tonal or border change, not opacity-only |
| Active | Subtle translate or scale for tactile feedback |
| Focus visible | `ring-focus` with offset |
| Disabled | Non-interactive but readable |
| Loading | `Progress`, `Skeleton`, `TableLoading`, `Spinner`, or component loading prop |
| Invalid | `errorText`, `aria-invalid`, error token styling |
| Empty | Composed empty state with useful next step |
| Danger | Error semantics, not arbitrary red values |

## Accessibility Rules

Connect helper and error text with `aria-describedby`.

Use `aria-label` for icon-only controls.

Use `aria-hidden="true"` for decorative icons.

Do not rely on color alone for status. Pair status color with text or shape.

Keep keyboard interaction intact for Radix-backed components.

Do not remove focus rings.

## Content Rules

Use real, contextual copy. Avoid placeholder Latin.

Avoid generic names such as `John Doe` and `Jane Smith`.

Avoid fake perfect numbers such as `99.99%` and `50%`.

Use direct error messages: `Connection failed. Please try again.`

Do not use hype words such as `Elevate`, `Seamless`, `Unleash`, or `Next-Gen`.

## Implementation Checklist

Before shipping UI, verify:

1. Component exists in Skyforge UI before custom code is written.
2. Semantic tokens are used for color, spacing, radius, and focus.
3. Light and dark themes both work.
4. Labels, helper text, and errors are string-safe.
5. Focus, hover, active, disabled, loading, empty, and invalid states are handled.
6. Icons are Heroicons with `strokeWidth={1.5}`.
7. Tables use `numeric` for numeric columns.
8. Forms connect helper and error text to controls.
9. No removed components are referenced.
10. Build and typecheck pass.
