# Skyforge UI

React component library for Skyforge products. Built with TypeScript, Tailwind CSS, Storybook, Radix primitives and Heroicons.

Skyforge UI provides accessible, themeable product components with a restrained technical visual language: semantic colors, border-first hierarchy, predictable spacing, and dark/light themes.

## Features

- React 18 and TypeScript component API.
- Tailwind v3 utilities mapped to Skyforge semantic tokens.
- Light and dark themes through `data-theme`.
- Accessible behavior powered by Radix primitives where needed.
- Storybook documentation for component variants, states, and usage.
- ESM library build with generated TypeScript declarations.

## Requirements

- Node.js compatible with the installed Vite and Storybook versions.
- React `>=18.2.0`.
- React DOM `>=18.2.0`.

## Installation

Install dependencies for local development:

```bash
npm install
```

If consumed as a package, install it in the host app:

```bash
npm install @luiswagnerab/skyforge-ui
```

## Usage

Import components from the package entry point:

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

The library imports its stylesheet from the package entry. If the host setup needs an explicit CSS import, use:

```tsx
import "@luiswagnerab/skyforge-ui/styles.css";
```

## Theming

Use `ThemeProvider` when the app shell does not already set `data-theme`:

```tsx
<ThemeProvider theme="dark">
  <App />
</ThemeProvider>
```

Supported themes:

- `light`
- `dark`

Design tokens live in `src/styles.css` and are exposed through semantic Tailwind utilities such as `bg-background`, `bg-surface`, `text-content-primary`, `border-border`, `ring-focus`, `px-sf-16`, and `rounded-sf-md`.

## Components

Currently exported components:

- `Alert`
- `AutoComplete`
- `Avatar`
- `Button`
- `Checkbox`
- `DatePicker`
- `DropdownMenu`
- `FormField`
- `Input`
- `Modal`
- `MultiSelect`
- `Pagination`
- `RadioGroup`, `Radio`
- `Select`
- `Skeleton`
- `Spinner`
- `Switch`
- `Tabs`
- `Table`
- `Textarea`
- `Tooltip`
- `ThemeProvider`

Removed or unsupported components should not be used: `Label`, `Loading`, `TableCaption`.

## Development

Run Storybook locally:

```bash
npm run storybook
```

Build static Storybook:

```bash
npm run build-storybook
```

Run TypeScript validation:

```bash
npm run typecheck
```

Build library output:

```bash
npm run build
```

## Project Structure

```text
src/
  components/       React components and Storybook stories
  theme/            ThemeProvider
  utils/            Shared utilities
  index.ts          Public package exports
  styles.css        Design tokens and component styles
DESIGN_SYSTEM_RULES.md
SKYFORGE-UI.md
```

## Design Guidelines

- Use Skyforge UI components before raw HTML controls.
- Use semantic tokens instead of hardcoded colors.
- Use Heroicons for product icons and keep `strokeWidth={1.5}`.
- Use `Input` only for `type="text"` and `type="number"`.
- Use `Textarea` for long text and `DatePicker` for dates.
- Use `Skeleton` for layout-shaped loading and `Spinner` for compact inline activity.
- Use `TableEmpty` and `TableLoading` for table states.
- Keep labels, helper text, status text, error text, and tooltip content as strings, `null`, or `undefined` unless component API explicitly allows React nodes.

For agent-facing implementation rules, see `SKYFORGE-UI.md`.

## Quality Gate

Before opening a PR or publishing a build, run:

```bash
npm run typecheck
npm run build
```

## Package Output

The package exports:

- `@luiswagnerab/skyforge-ui` -> ESM bundle and TypeScript declarations from `dist`.
- `@luiswagnerab/skyforge-ui/styles.css` -> built stylesheet.

Only `dist` is included in published package files.

## License

MIT. See `LICENSE`.
