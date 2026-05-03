import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    dot: {
      control: "boolean"
    },
    size: {
      control: "select",
      options: ["sm", "md"]
    },
    variant: {
      control: "select",
      options: ["neutral", "accent", "info", "success", "warning", "error"]
    }
  },
  args: {
    children: "Stable",
    dot: false,
    size: "md",
    variant: "neutral"
  }
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-modal-md flex-wrap items-center gap-sf-8">
      <Badge variant="neutral">Draft</Badge>
      <Badge variant="accent">Pinned</Badge>
      <Badge variant="info">Queued</Badge>
      <Badge variant="success">Validated</Badge>
      <Badge variant="warning">Review</Badge>
      <Badge variant="error">Blocked</Badge>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-sf-8">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Default</Badge>
    </div>
  )
};

export const WithDot: Story = {
  render: () => (
    <div className="flex max-w-modal-md flex-wrap items-center gap-sf-8">
      <Badge dot variant="success">
        Online
      </Badge>
      <Badge dot variant="warning">
        Delayed
      </Badge>
      <Badge dot variant="error">
        Failed
      </Badge>
    </div>
  )
};

export const WithIcon: Story = {
  render: () => (
    <Badge icon={<ShieldCheckIcon />} variant="success">
      Verified
    </Badge>
  )
};
