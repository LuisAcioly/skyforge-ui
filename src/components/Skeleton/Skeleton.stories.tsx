import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton } from "./Skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text"
    },
    lines: {
      control: "number"
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"]
    },
    variant: {
      control: "select",
      options: ["block", "text", "avatar"]
    }
  },
  args: {
    label: "Loading preview",
    lines: 1,
    size: "md",
    variant: "block"
  }
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-24">
      <Skeleton variant="block" size="lg" label="Loading block" />
      <Skeleton variant="text" lines={4} label="Loading text" />
      <div className="flex items-center gap-sf-12">
        <Skeleton variant="avatar" label="Loading avatar" />
        <div className="grid flex-1 gap-sf-8">
          <Skeleton variant="text" label="Loading title" />
          <Skeleton variant="text" size="sm" className="w-[64%]" label="Loading subtitle" />
        </div>
      </div>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-12">
      <Skeleton size="sm" label="Loading small block" />
      <Skeleton size="md" label="Loading medium block" />
      <Skeleton size="lg" label="Loading large block" />
    </div>
  )
};
