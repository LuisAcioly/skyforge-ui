import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Foundations",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const semanticColorGroups = [
  {
    title: "Structure",
    tokens: [
      { label: "Background", className: "bg-background", value: "--color-background" },
      { label: "Editorial background", className: "bg-background-editorial", value: "--color-background-editorial" },
      { label: "Surface", className: "bg-surface", value: "--color-surface" },
      { label: "Raised surface", className: "bg-surface-raised", value: "--color-surface-raised" },
      { label: "Sunken surface", className: "bg-surface-sunken", value: "--color-surface-sunken" },
      { label: "Inverse surface", className: "bg-surface-inverse", value: "--color-surface-inverse" },
      { label: "Border", className: "bg-border", value: "--color-border" },
      { label: "Strong border", className: "bg-border-strong", value: "--color-border-strong" },
      { label: "Divider", className: "bg-divider", value: "--color-divider" }
    ]
  },
  {
    title: "Content and icons",
    tokens: [
      { label: "Text primary", className: "bg-content-primary", value: "--color-text-primary" },
      { label: "Text secondary", className: "bg-content-secondary", value: "--color-text-secondary" },
      { label: "Text tertiary", className: "bg-content-tertiary", value: "--color-text-tertiary" },
      { label: "Text inverse", className: "bg-content-inverse", value: "--color-text-inverse" },
      { label: "Icon primary", className: "bg-icon-primary", value: "--color-icon-primary" },
      { label: "Icon secondary", className: "bg-icon-secondary", value: "--color-icon-secondary" },
      { label: "Icon tertiary", className: "bg-icon-tertiary", value: "--color-icon-tertiary" },
      { label: "Icon inverse", className: "bg-icon-inverse", value: "--color-icon-inverse" },
      { label: "Icon accent", className: "bg-icon-accent", value: "--color-icon-accent" },
      { label: "Icon disabled", className: "bg-icon-disabled", value: "--color-icon-disabled" }
    ]
  },
  {
    title: "Interaction",
    tokens: [
      { label: "Primary action", className: "bg-primary", value: "--color-primary" },
      { label: "Primary hover", className: "bg-primary-hover", value: "--color-primary-hover" },
      { label: "Primary active", className: "bg-primary-active", value: "--color-primary-active" },
      { label: "Primary foreground", className: "bg-primary-foreground", value: "--color-primary-foreground" },
      { label: "Secondary action", className: "bg-secondary", value: "--color-secondary" },
      { label: "Secondary hover", className: "bg-secondary-hover", value: "--color-secondary-hover" },
      { label: "Secondary foreground", className: "bg-secondary-foreground", value: "--color-secondary-foreground" },
      { label: "Focus", className: "bg-focus", value: "--color-focus" },
      { label: "Link", className: "bg-link", value: "--color-link" },
      { label: "Link hover", className: "bg-link-hover", value: "--color-link-hover" },
      { label: "Hover surface", className: "bg-hover-surface", value: "--color-hover-surface" },
      { label: "Active surface", className: "bg-active-surface", value: "--color-active-surface" }
    ]
  },
  {
    title: "Feedback and disabled",
    tokens: [
      { label: "Success background", className: "bg-success-bg", value: "--color-success-bg" },
      { label: "Success border", className: "bg-success-border", value: "--color-success-border" },
      { label: "Success text", className: "bg-success-text", value: "--color-success-text" },
      { label: "Success icon", className: "bg-success-icon", value: "--color-success-icon" },
      { label: "Warning background", className: "bg-warning-bg", value: "--color-warning-bg" },
      { label: "Warning border", className: "bg-warning-border", value: "--color-warning-border" },
      { label: "Warning text", className: "bg-warning-text", value: "--color-warning-text" },
      { label: "Warning icon", className: "bg-warning-icon", value: "--color-warning-icon" },
      { label: "Error background", className: "bg-error-bg", value: "--color-error-bg" },
      { label: "Error border", className: "bg-error-border", value: "--color-error-border" },
      { label: "Error text", className: "bg-error-text", value: "--color-error-text" },
      { label: "Error icon", className: "bg-error-icon", value: "--color-error-icon" },
      { label: "Info background", className: "bg-info-bg", value: "--color-info-bg" },
      { label: "Info border", className: "bg-info-border", value: "--color-info-border" },
      { label: "Info text", className: "bg-info-text", value: "--color-info-text" },
      { label: "Info icon", className: "bg-info-icon", value: "--color-info-icon" },
      { label: "Disabled background", className: "bg-disabled-bg", value: "--color-disabled-bg" },
      { label: "Disabled border", className: "bg-disabled-border", value: "--color-disabled-border" },
      { label: "Disabled text", className: "bg-disabled-text", value: "--color-disabled-text" }
    ]
  }
];

const typography = [
  { label: "Display 2XL", className: "font-display text-display-2xl text-content-primary" },
  { label: "Display XL", className: "font-display text-display-xl text-content-primary" },
  { label: "Heading large", className: "font-display text-heading-lg text-content-primary" },
  { label: "Heading medium", className: "font-display text-heading-md text-content-primary" },
  { label: "Heading small", className: "font-display text-heading-sm text-content-primary" },
  { label: "Body medium", className: "text-body-md text-content-secondary" },
  { label: "Body small", className: "text-body-sm text-content-secondary" },
  { label: "Label", className: "text-label text-content-primary" },
  { label: "Caption", className: "text-caption text-content-tertiary" },
  { label: "Eyebrow", className: "text-eyebrow uppercase text-content-tertiary" }
];

const spacing = [
  { token: "sf-4", widthClass: "w-sf-4" },
  { token: "sf-8", widthClass: "w-sf-8" },
  { token: "sf-12", widthClass: "w-sf-12" },
  { token: "sf-16", widthClass: "w-sf-16" },
  { token: "sf-24", widthClass: "w-sf-24" },
  { token: "sf-32", widthClass: "w-sf-32" },
  { token: "sf-48", widthClass: "w-sf-48" },
  { token: "sf-64", widthClass: "w-sf-64" },
  { token: "sf-96", widthClass: "w-sf-96" },
  { token: "sf-128", widthClass: "w-sf-128" }
];

const iconography = [
  { label: "Library", value: "Heroicons" },
  { label: "Default style", value: "Outline" },
  { label: "Emphasis style", value: "Solid, only for feedback and strong status" },
  { label: "Stroke", value: "1.5" },
  { label: "Sizes", value: "16, 20, 24, 32" },
  { label: "Accessibility", value: "Decorative icons use aria-hidden; icon-only buttons need aria-label" }
];

export const Tokens: Story = {
  render: () => (
    <main className="grid gap-sf-48 p-sf-32">
      <section className="grid gap-sf-16">
        <div>
          <p className="m-0 text-eyebrow uppercase text-link">
            Foundations
          </p>
          <h1 className="m-0 mt-sf-8 font-display text-display-xl text-content-primary">Semantic tokens</h1>
          <p className="m-0 mt-sf-12 max-w-3xl text-body-md text-content-secondary">
            Os componentes usam semantic tokens em CSS variables para preservar light/dark mode sem recompilar Tailwind.
          </p>
        </div>
      </section>

      <section className="grid gap-sf-16">
        <h2 className="m-0 font-display text-heading-md text-content-primary">Colors</h2>
        <div className="grid gap-sf-16">
          {semanticColorGroups.map(({ title, tokens }) => (
            <div key={title} className="grid gap-sf-12">
              <h3 className="m-0 text-eyebrow uppercase text-content-tertiary">{title}</h3>
              <div className="grid gap-sf-12 md:grid-cols-3">
                {tokens.map(({ className, label, value }) => (
                  <div key={label} className="rounded-sf-lg border border-border bg-surface p-sf-16">
                    <div className={`${className} h-sf-48 rounded-sf-md border border-border`} />
                    <p className="m-0 mt-sf-12 text-label text-content-primary">{label}</p>
                    <p className="m-0 mt-sf-4 text-caption text-content-tertiary">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-sf-16">
        <h2 className="m-0 font-display text-heading-md text-content-primary">Typography</h2>
        <div className="grid gap-sf-12 rounded-sf-lg border border-border bg-surface p-sf-24">
          {typography.map(({ className, label }) => (
            <p key={label} className={`m-0 ${className}`}>
              {label}
            </p>
          ))}
        </div>
      </section>

      <section className="grid gap-sf-16">
        <h2 className="m-0 font-display text-heading-md text-content-primary">Iconography</h2>
        <div className="grid gap-sf-12 rounded-sf-lg border border-border bg-surface p-sf-24">
          <div className="flex h-sf-48 w-sf-48 items-center justify-center rounded-sf-md border border-border bg-surface-sunken text-icon-primary">
            <svg className="h-sf-24 w-sf-24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4.5 12.75L9.75 18L19.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="m-0 max-w-3xl text-body-md text-content-secondary">
            A iconografia oficial do projeto e Heroicons. Use Outline por padrao, Solid apenas para enfase,
            badges preenchidos e feedback visual forte.
          </p>
          <div className="grid gap-sf-8 md:grid-cols-2">
            {iconography.map(({ label, value }) => (
              <div key={label} className="rounded-sf-md border border-border bg-surface-sunken p-sf-12">
                <p className="m-0 text-label text-content-primary">{label}</p>
                <p className="m-0 mt-sf-4 text-body-sm text-content-secondary">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-sf-16">
        <h2 className="m-0 font-display text-heading-md text-content-primary">Spacing</h2>
        <div className="grid gap-sf-12 rounded-sf-lg border border-border bg-surface p-sf-24">
          {spacing.map(({ token, widthClass }) => (
            <div key={token} className="flex items-center gap-sf-16">
              <div className={`${widthClass} h-sf-16 rounded-sf-sm bg-link`} />
              <code className="text-body-sm text-content-secondary">{token}</code>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
};
