import type { Meta, StoryObj } from "@storybook/react";

import { DatePicker } from "./DatePicker";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
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
      options: ["md", "lg"]
    },
    variant: {
      control: "select",
      options: ["outline", "filled", "ghost"]
    }
  },
  args: {
    helperText: "Use local release date in DD-MM-YYYY format.",
    label: "Release date",
    size: "md",
    value: "18-05-2026",
    variant: "outline"
  }
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <DatePicker label="Outline" defaultValue="18-05-2026" variant="outline" />
      <DatePicker label="Filled" defaultValue="04-06-2026" variant="filled" />
      <DatePicker label="Ghost" defaultValue="21-06-2026" variant="ghost" />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <DatePicker label="Default" defaultValue="18-05-2026" helperText="Helper text remains connected by aria-describedby." />
      <DatePicker label="Invalid" defaultValue="" errorText="Release date is required." />
      <DatePicker label="Disabled" disabled defaultValue="02-07-2026" helperText="Disabled values remain readable." />
    </div>
  )
};
