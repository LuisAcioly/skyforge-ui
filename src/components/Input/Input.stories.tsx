import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircleIcon, EnvelopeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["md", "lg"]
    },
    status: {
      control: "select",
      options: ["default", "success", "warning", "error"]
    },
    variant: {
      control: "select",
      options: ["outline", "filled", "ghost"]
    }
  },
  args: {
    helperText: "Use a short, recognizable release label.",
    label: "Project key",
    placeholder: "ledger-release-v2",
    size: "md",
    status: "default",
    variant: "outline"
  }
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <Input label="Outline" defaultValue="canonical-token-system" variant="outline" />
      <Input label="Filled" defaultValue="release-notes" variant="filled" />
      <Input label="Ghost" defaultValue="internal-draft" variant="ghost" />
    </div>
  )
};

export const SizesAndIcons: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <Input label="Medium" defaultValue="ui-foundation" leftIcon={<MagnifyingGlassIcon />} size="md" />
      <Input label="Large" defaultValue="design-review@skyforge.dev" leftIcon={<EnvelopeIcon />} size="lg" />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <Input label="Default" defaultValue="release-v2" helperText="Readable helper text stays below the control." />
      <Input label="Success" defaultValue="token-map" rightIcon={<CheckCircleIcon />} status="success" statusText="Validation passed." />
      <Input label="Warning" defaultValue="review-copy" status="warning" statusText="Confirm the publishing window before release." />
      <Input label="Invalid" defaultValue="missing-theme" errorText="Theme token is required before publishing." />
      <Input label="Loading" loading placeholder="Loading release metadata" />
      <Input label="Disabled" disabled defaultValue="locked-field" helperText="Disabled values remain readable." />
    </div>
  )
};
