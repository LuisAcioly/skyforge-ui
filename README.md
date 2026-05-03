# Skyforge UI

[![npm version](https://img.shields.io/npm/v/%40luiswagnerab%2Fskyforge-ui.svg)](https://www.npmjs.com/package/@luiswagnerab/skyforge-ui)
[![license](https://img.shields.io/npm/l/%40luiswagnerab%2Fskyforge-ui.svg)](./LICENSE)
[![types](https://img.shields.io/badge/types-TypeScript-blue.svg)](./dist/index.d.ts)

React component library for building interfaces in the Skyforge ecosystem. Built with TypeScript, Tailwind CSS, Radix primitives, Heroicons, and Skyforge design tokens.

Skyforge UI focuses on accessible product interfaces with a restrained technical visual language: semantic colors, border-first hierarchy, predictable spacing, and light/dark themes.

## Installation

```bash
npm install @luiswagnerab/skyforge-ui
```

Peer dependencies:

- `react >=18.2.0`
- `react-dom >=18.2.0`

## Quick Start

Most bundlers load the package stylesheet from the component entry automatically. If your app does not apply styles, import the stylesheet once in your app entry point:

```tsx
import "@luiswagnerab/skyforge-ui/styles.css";
```

Use components from the package entry:

```tsx
import { Button, Input, ThemeProvider } from "@luiswagnerab/skyforge-ui";

export function Example() {
  return (
    <ThemeProvider theme="light">
      <form className="grid gap-sf-16">
        <Input
          label="Project key"
          helperText="Use a short, stable identifier."
          placeholder="release-vault"
        />

        <Button type="submit" variant="primary">
          Publish
        </Button>
      </form>
    </ThemeProvider>
  );
}
```

## Theming

Use `ThemeProvider` when your app shell does not already set `data-theme`:

```tsx
import { ThemeProvider } from "@luiswagnerab/skyforge-ui";

export function App() {
  return (
    <ThemeProvider theme="dark">
      <ProductShell />
    </ThemeProvider>
  );
}
```

Supported themes:

- `light`
- `dark`

Skyforge UI ships compiled CSS variables and utility classes for tokens such as `bg-background`, `bg-surface`, `text-content-primary`, `border-border`, `ring-focus`, `px-sf-16`, and `rounded-sf-md`.

## Components

Core:

- `Alert`
- `Avatar`
- `Badge`
- `Button`
- `Modal`
- `Tabs`
- `Tooltip`

Forms:

- `AutoComplete`
- `Checkbox`
- `Chip`
- `DatePicker`
- `FormField`
- `Input`
- `MultiSelect`
- `RadioGroup`, `Radio`
- `Select`
- `Switch`
- `Textarea`

Data and feedback:

- `DropdownMenu`
- `Pagination`
- `Skeleton`
- `Spinner`
- `Tag`
- `Table`

Theme:

- `ThemeProvider`

Unsupported components: `Label`, `Loading`, `TableCaption`.

## Component Notes

- Use `Input` only for `type="text"` and `type="number"`.
- Use `Textarea` for long text.
- Use `DatePicker` for dates in `DD-MM-YYYY` format.
- Use `Badge` for compact non-interactive metadata and status counts.
- Use `Chip` for selectable or removable compact filters.
- Use `Skeleton` for layout-shaped loading states.
- Use `Spinner` for compact inline activity.
- Use `Tag` for compact metadata, status labels, and removable filters.
- Use `TableEmpty` and `TableLoading` for table states.
- Use Heroicons for product icons and keep `strokeWidth={1.5}`.
- Use semantic tokens instead of hardcoded colors.

## Package Exports

```ts
import { Button } from "@luiswagnerab/skyforge-ui";
import "@luiswagnerab/skyforge-ui/styles.css";
```

Available exports:

- `@luiswagnerab/skyforge-ui` -> ESM bundle and TypeScript declarations.
- `@luiswagnerab/skyforge-ui/styles.css` -> compiled stylesheet.

Published files are limited to `dist`, `README.md`, `LICENSE`, and `package.json`.

## Development

Install dependencies:

```bash
npm install
```

Run Storybook:

```bash
npm run storybook
```

Validate TypeScript:

```bash
npm run typecheck
```

Build package output:

```bash
npm run build
```

Preview package contents:

```bash
npm pack --dry-run
```

## Quality Gate

Run before publishing:

```bash
npm run typecheck
npm run build
npm pack --dry-run
```

## License

MIT. See `LICENSE`.
