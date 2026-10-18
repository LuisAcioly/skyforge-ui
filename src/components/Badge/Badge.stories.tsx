import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    appearance: {
      control: "inline-radio",
      options: ["soft", "solid"]
    },
    dot: {
      control: "boolean"
    },
    customColor: {
      control: "text"
    },
    size: {
      control: "select",
      options: ["sm", "md"]
    },
    variant: {
      control: "select",
      options: ["neutral", "accent", "info", "success", "warning", "error", "custom"]
    }
  },
  args: {
    appearance: "solid",
    children: "Stable",
    customColor: "#147672",
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
      <Badge customColor="#147672" variant="custom">Custom</Badge>
    </div>
  )
};

export const Soft: Story = {
  render: () => (
    <div className="grid gap-sf-12">
      <div className="flex max-w-modal-md flex-wrap items-center gap-sf-8">
        <Badge appearance="soft" variant="neutral">Draft</Badge>
        <Badge appearance="soft" variant="accent">Pinned</Badge>
        <Badge appearance="soft" variant="info">Queued</Badge>
        <Badge appearance="soft" variant="success">Validated</Badge>
        <Badge appearance="soft" variant="warning">Review</Badge>
        <Badge appearance="soft" variant="error">Blocked</Badge>
        <Badge appearance="soft" customColor="#147672" variant="custom">Custom</Badge>
      </div>
      <div className="flex max-w-modal-md flex-wrap items-center gap-sf-8">
        <Badge appearance="soft" dot size="sm" variant="success">Online</Badge>
        <Badge appearance="soft" icon={<ShieldCheckIcon />} size="sm" variant="info">Verified</Badge>
        <Badge appearance="soft" size="sm" variant="error">Failed</Badge>
      </div>
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

export const CustomColor: Story = {
  render: () => (
    <div className="flex max-w-modal-md flex-wrap items-center gap-sf-8">
      <Badge customColor="#147672" dot variant="custom">
        Hex
      </Badge>
      <Badge customColor="rgb(20 118 114)" icon={<ShieldCheckIcon />} variant="custom">
        RGB
      </Badge>
    </div>
  )
};
