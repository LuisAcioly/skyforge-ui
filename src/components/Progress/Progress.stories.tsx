import type { Meta, StoryObj } from "@storybook/react";

import { Progress } from "./Progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    helperText: {
      control: "text"
    },
    label: {
      control: "text"
    },
    max: {
      control: "number"
    },
    showValue: {
      control: "boolean"
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"]
    },
    tone: {
      control: "select",
      options: ["primary", "success", "warning", "error"]
    },
    value: {
      control: "number"
    },
    valueFormatter: {
      table: {
        disable: true
      }
    }
  },
  args: {
    helperText: "Release checks completed across three environments.",
    label: "Release progress",
    max: 100,
    showValue: true,
    size: "md",
    tone: "primary",
    value: 64
  }
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <Progress label="Small progress" size="sm" value={28} showValue />
      <Progress label="Medium progress" size="md" value={52} showValue />
      <Progress label="Large progress" size="lg" value={76} showValue />
    </div>
  )
};

export const Tones: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <Progress label="Syncing tokens" tone="primary" value={46} showValue />
      <Progress label="Validation passed" tone="success" value={100} showValue />
      <Progress label="Manual review" tone="warning" value={68} showValue />
      <Progress label="Blocked checks" tone="error" value={22} showValue />
    </div>
  )
};

export const Indeterminate: Story = {
  render: () => (
    <Progress
      label="Preparing release"
      helperText="Waiting for build metrics before progress can be measured."
      value={null}
      showValue
    />
  )
};
