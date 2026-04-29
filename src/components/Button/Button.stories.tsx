import type { Meta, StoryObj } from "@storybook/react";
import { ArrowDownTrayIcon, ArrowRightIcon, PlusIcon } from "@heroicons/react/24/outline";

import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger", "editorial"]
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"]
    },
    fullWidth: {
      control: "boolean"
    }
  },
  args: {
    children: "Create project",
    fullWidth: false,
    size: "md",
    variant: "primary"
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sf-12">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="editorial">Editorial</Button>
    </div>
  )
};

export const SizesAndStates: Story = {
  render: () => (
    <div className="grid gap-sf-16">
      <div className="flex flex-wrap items-center gap-sf-12">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex flex-wrap items-center gap-sf-12">
        <Button loading>Saving</Button>
        <Button disabled variant="secondary">
          Disabled
        </Button>
      </div>
    </div>
  )
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-sf-12">
      <Button leftIcon={<PlusIcon />}>Button</Button>
      <Button variant="secondary" rightIcon={<ArrowRightIcon />}>
        Button
      </Button>
      <Button variant="ghost" leftIcon={<ArrowDownTrayIcon />}>
        Export
      </Button>
      <Button aria-label="Button" className="w-sf-40 px-0" leftIcon={<PlusIcon />} />
    </div>
  )
};

export const FullWidth: Story = {
  render: () => (
    <div className="grid max-w-modal-sm gap-sf-12">
      <Button fullWidth leftIcon={<PlusIcon />}>
        Button
      </Button>
      <Button fullWidth variant="secondary" rightIcon={<ArrowRightIcon />}>
        Button
      </Button>
    </div>
  )
};
