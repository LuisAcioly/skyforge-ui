import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
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
    status: {
      control: "select",
      options: ["default", "success", "warning", "error"]
    },
    statusText: {
      control: "text"
    },
    variant: {
      control: "select",
      options: ["outline", "filled", "ghost"]
    }
  },
  args: {
    helperText: "Use short operational notes for release review.",
    label: "Release notes",
    placeholder: "Summarize token changes and review risk.",
    size: "md",
    status: "default",
    variant: "outline"
  }
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <Textarea label="Outline" defaultValue="Canonical tokens synced with package output." variant="outline" />
      <Textarea label="Filled" defaultValue="QA notes stay grouped with the release draft." variant="filled" />
      <Textarea label="Ghost" defaultValue="Use for quiet inline editing surfaces." variant="ghost" />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <Textarea label="Default" defaultValue="Component state inherits semantic theme tokens." helperText="Helper text remains below the control." />
      <Textarea label="Success" defaultValue="Accessibility pass completed." status="success" statusText="Ready for release notes." />
      <Textarea label="Warning" defaultValue="Design token export is older than source file." status="warning" statusText="Regenerate before publishing." />
      <Textarea label="Invalid" defaultValue="" errorText="Release note summary is required." />
      <Textarea label="Loading" loading placeholder="Loading draft content" />
      <Textarea label="Disabled" disabled defaultValue="Locked after publish." helperText="Disabled content remains readable." />
    </div>
  )
};
