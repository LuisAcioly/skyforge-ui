import type { Meta, StoryObj } from "@storybook/react";

import { AutoComplete, type AutoCompleteOption } from "./AutoComplete";

const ownerOptions: AutoCompleteOption[] = [
  { value: "maia-rocha", label: "Maia Rocha", description: "Design systems owner" },
  { value: "vera-calder", label: "Vera Calder", description: "Release operations" },
  { value: "niko-sato", label: "Niko Sato", description: "Accessibility review" },
  { value: "irina-vale", label: "Irina Vale", description: "Token pipeline" }
];

const meta = {
  title: "Components/AutoComplete",
  component: AutoComplete,
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
    helperText: "Search by reviewer name or ownership area.",
    label: "Release owner",
    options: ownerOptions,
    placeholder: "Search owners",
    size: "md",
    variant: "outline"
  }
} satisfies Meta<typeof AutoComplete>;

export default meta;

type Story = StoryObj<typeof meta>;

const playgroundSource = `<AutoComplete
  label="Release owner"
  helperText="Search by reviewer name or ownership area."
  placeholder="Search owners"
  options={ownerOptions}
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
      <AutoComplete label="Outline" defaultValue="maia-rocha" options={ownerOptions} variant="outline" />
      <AutoComplete label="Filled" defaultValue="vera-calder" options={ownerOptions} variant="filled" />
      <AutoComplete label="Ghost" defaultValue="niko-sato" options={ownerOptions} variant="ghost" />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <AutoComplete label="Default" helperText="List filters while typing." options={ownerOptions} />
      <AutoComplete label="Invalid" errorText="Select an owner before publishing." options={ownerOptions} />
      <AutoComplete label="Disabled" disabled defaultValue="irina-vale" helperText="Disabled value remains readable." options={ownerOptions} />
      <AutoComplete label="Empty" options={[]} emptyText="No owner records available." />
    </div>
  )
};
