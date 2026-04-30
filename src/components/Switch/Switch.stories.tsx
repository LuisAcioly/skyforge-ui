import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
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
    size: {
      control: "select",
      options: ["sm", "md"]
    }
  },
  args: {
    helperText: "Applies to new release drafts.",
    label: "Auto-sync tokens",
    size: "md"
  }
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-sf-16">
      <Switch label="Small switch" size="sm" />
      <Switch label="Medium switch" size="md" />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <Switch defaultChecked label="Enabled" helperText="Selected state uses primary action tokens." />
      <Switch label="Disabled" disabled helperText="Disabled values remain readable." />
      <Switch label="Invalid" errorText="Review automation requires a release branch." />
    </div>
  )
};
