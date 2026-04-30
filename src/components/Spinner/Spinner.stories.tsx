import type { Meta, StoryObj } from "@storybook/react";

import { Spinner } from "./Spinner";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text"
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"]
    },
    tone: {
      control: "select",
      options: ["primary", "secondary", "inverse"]
    }
  },
  args: {
    label: "Loading",
    size: "md",
    tone: "secondary"
  }
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-sf-16">
      <Spinner size="sm" label="Loading small task" />
      <Spinner size="md" label="Loading medium task" />
      <Spinner size="lg" label="Loading large task" />
    </div>
  )
};

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-sf-16">
      <Spinner tone="primary" label="Loading primary task" />
      <Spinner tone="secondary" label="Loading secondary task" />
      <div className="rounded-sf-md bg-surface-inverse p-sf-12">
        <Spinner tone="inverse" label="Loading inverse task" />
      </div>
    </div>
  )
};
