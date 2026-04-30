import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
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
    helperText: "Stores preference in the workspace profile.",
    label: "Sync design tokens before publishing",
    size: "md"
  }
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-sf-16">
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <Checkbox defaultChecked label="Checked" helperText="Selected state uses primary action tokens." />
      <Checkbox checked="indeterminate" label="Indeterminate" helperText="Use for partially selected groups." />
      <Checkbox label="Invalid" errorText="Accept audit terms before continuing." />
      <Checkbox disabled label="Disabled" helperText="Disabled labels remain readable." />
    </div>
  )
};
