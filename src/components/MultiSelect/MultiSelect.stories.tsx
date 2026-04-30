import type { Meta, StoryObj } from "@storybook/react";

import { MultiSelect, type MultiSelectOption } from "./MultiSelect";

const releaseOptions: MultiSelectOption[] = [
  { value: "tokens", label: "Token diff", description: "Compare source aliases and package output." },
  { value: "contrast", label: "Contrast pass", description: "Check text and essential icon ratios." },
  { value: "keyboard", label: "Keyboard pass", description: "Verify focus order and escape behavior." },
  { value: "docs", label: "Docs update", description: "Review component usage examples." }
];

const meta = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  argTypes: {
    errorText: {
      control: "text"
    },
    helperText: {
      control: "text"
    },
    label: {
      control: "text"
    },
    placeholder: {
      control: "text"
    },
    size: {
      control: "select",
      options: ["md", "lg"]
    },
    variant: {
      control: "select",
      options: ["outline", "filled", "ghost"]
    }
  },
  args: {
    defaultValue: ["tokens", "contrast"],
    helperText: "Select every review track needed before publish.",
    label: "Release checks",
    options: releaseOptions,
    placeholder: "Choose checks",
    size: "md",
    variant: "outline"
  }
} satisfies Meta<typeof MultiSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

const playgroundSource = `<MultiSelect
  label="Release checks"
  helperText="Select every review track needed before publish."
  placeholder="Choose checks"
  defaultValue={["tokens", "contrast"]}
  options={releaseOptions}
/>`;

export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        code: playgroundSource
      }
    }
  }
};

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <MultiSelect label="Outline" defaultValue={["tokens"]} options={releaseOptions} variant="outline" />
      <MultiSelect label="Filled" defaultValue={["contrast", "docs"]} options={releaseOptions} variant="filled" />
      <MultiSelect label="Ghost" defaultValue={["keyboard"]} options={releaseOptions} variant="ghost" />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <MultiSelect label="Default" helperText="Popover stays open for multiple selections." options={releaseOptions} />
      <MultiSelect label="Invalid" errorText="Choose at least one release check." options={releaseOptions} />
      <MultiSelect label="Disabled" disabled defaultValue={["tokens"]} helperText="Disabled selections remain visible." options={releaseOptions} />
      <MultiSelect label="Empty" options={[]} emptyText="No checks match this release scope." />
    </div>
  )
};
