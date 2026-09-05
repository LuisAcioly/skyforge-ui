# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user is Luis Wagner. He uses Skyforge UI to build interfaces for his own projects in the Skyforge ecosystem.

## Product Purpose

Skyforge UI is a reusable React component library for Luis's projects. It provides shared components, tokens, themes, and interaction patterns so those projects carry one consistent personal identity.

Success means Luis can build product interfaces from established Skyforge primitives instead of recreating their visual language and behavior in each project.

## Positioning

Skyforge UI encodes Luis's personal visual identity as a reusable system. Its value is not a generic component catalog; it is the canonical UI language for his projects.

## Operating Context

The library is consumed as the public npm package `@luiswagnerab/skyforge-ui`. Development and review happen through Storybook. Consumers use React and import the package stylesheet once at their application entry point.

## Capabilities and Constraints

- React and TypeScript component library built with Tailwind CSS, Radix primitives, and Heroicons.
- Supports light and dark themes through semantic tokens.
- Provides core, form, selection, navigation, data-display, loading, and feedback components.
- Preserves stable package exports from `@luiswagnerab/skyforge-ui` and `@luiswagnerab/skyforge-ui/styles.css`.
- Supports React and React DOM `>=18.2.0` as peer dependencies.
- Uses semantic tokens instead of hardcoded product colors.
- Uses existing Skyforge components before raw controls or duplicate local primitives.
- Branding is a durable constraint and must remain consistent across future work.

## Brand Commitments

- Product name: Skyforge UI.
- Identity: Luis's personal visual language for the Skyforge ecosystem.
- Established character: minimal, technical, sophisticated, and editorial, balancing restrained brutalism with system-driven interfaces.
- Border-first hierarchy; shadows are reserved for floating layers.
- Bebas Neue is the display typeface. Figtree supports product reading and forms.
- Heroicons is the product icon library, with `strokeWidth={1.5}` by default.
- Semantic colors, spacing, radii, typography, and interaction states remain token-driven.
- Existing light and dark themes remain part of the identity.

## Evidence on Hand

- Canonical design tokens: `design-tokens.json`.
- Runtime theme and CSS implementation: `src/styles.css`.
- Design-system rules: `DESIGN_SYSTEM_RULES.md`.
- Agent-facing component and usage guide: `SKYFORGE-UI.md`.
- Component behavior and APIs: `src/components/`.
- Visual examples and states: Storybook stories under `src/`.
- Package purpose, installation, exports, and supported component inventory: `README.md` and `package.json`.
- No testimonials, customer claims, benchmarks, or external product proof are established. Future work must not fabricate them.

## Product Principles

1. Preserve Luis's identity across every consuming project.
2. Reuse canonical components and tokens before creating local alternatives.
3. Keep component behavior predictable, accessible, and stable for consumers.
4. Treat theme parity and complete interaction states as core product behavior.
5. Keep documentation, Storybook examples, package exports, and implementation aligned.

## Accessibility & Inclusion

Skyforge UI targets accessible product interfaces. Components must retain keyboard operation, visible focus, relevant disabled and invalid states, semantic labeling, and sufficient control-boundary contrast across light and dark themes.
