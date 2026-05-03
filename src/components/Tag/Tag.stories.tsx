import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import type { Meta, StoryObj } from "@storybook/react";

import { Tag } from "./Tag";

const meta = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
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
    disabled: false,
    size: "md",
    variant: "neutral"
  }
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-modal-md flex-wrap items-center gap-sf-8">
      <Tag variant="neutral">Draft</Tag>
      <Tag variant="accent">Pinned</Tag>
      <Tag variant="info">Queued</Tag>
      <Tag variant="success">Validated</Tag>
      <Tag variant="warning">Review</Tag>
      <Tag variant="error">Blocked</Tag>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-sf-8">
      <Tag size="sm">Small</Tag>
      <Tag size="md">Default</Tag>
    </div>
  )
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex max-w-modal-md flex-wrap items-center gap-sf-8">
      <Tag leftIcon={<CheckCircleIcon />} variant="success">
        Passed
      </Tag>
      <Tag leftIcon={<ClockIcon />} variant="info">
        Waiting
      </Tag>
      <Tag leftIcon={<ExclamationTriangleIcon />} variant="warning">
        Needs review
      </Tag>
    </div>
  )
};

export const Removable: Story = {
  render: () => (
    <div className="flex max-w-modal-md flex-wrap items-center gap-sf-8">
      <Tag onRemove={() => undefined} removeLabel="Remove release tag" variant="accent">
        Release
      </Tag>
      <Tag onRemove={() => undefined} removeLabel="Remove blocked tag" variant="error">
        Blocked
      </Tag>
      <Tag disabled onRemove={() => undefined} removeLabel="Remove archived tag">
        Archived
      </Tag>
    </div>
  )
};
