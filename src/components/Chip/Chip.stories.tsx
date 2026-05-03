import { FunnelIcon, SparklesIcon } from "@heroicons/react/24/outline";
import type { Meta, StoryObj } from "@storybook/react";

import { Chip } from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean"
    },
    selected: {
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
    children: "Priority",
    disabled: false,
    selected: false,
    size: "md",
    variant: "neutral"
  }
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Selectable: Story = {
  render: () => (
    <div className="flex max-w-modal-md flex-wrap items-center gap-sf-8">
      <Chip onClick={() => undefined}>Open</Chip>
      <Chip onClick={() => undefined} selected variant="accent">
        Active
      </Chip>
      <Chip onClick={() => undefined} selected variant="success">
        Validated
      </Chip>
      <Chip disabled onClick={() => undefined}>
        Archived
      </Chip>
    </div>
  )
};

export const Removable: Story = {
  render: () => (
    <div className="flex max-w-modal-md flex-wrap items-center gap-sf-8">
      <Chip leftIcon={<FunnelIcon />} onRemove={() => undefined} removeLabel="Remove owner filter">
        Owner: Maia
      </Chip>
      <Chip onClick={() => undefined} onRemove={() => undefined} removeLabel="Remove blocked filter" selected variant="error">
        Blocked
      </Chip>
      <Chip disabled onRemove={() => undefined} removeLabel="Remove locked filter">
        Locked
      </Chip>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-sf-8">
      <Chip size="sm">Small</Chip>
      <Chip size="md">Default</Chip>
    </div>
  )
};

export const WithIcon: Story = {
  render: () => (
    <Chip leftIcon={<SparklesIcon />} selected variant="accent">
      Curated
    </Chip>
  )
};
