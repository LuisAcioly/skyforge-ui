import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button/Button";
import { Alert } from "./Alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"]
    },
    title: {
      control: "text"
    }
  },
  args: {
    children: "Semantic tokens are available for light and dark runtime themes.",
    title: "Tokens synchronized",
    variant: "info"
  }
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-modal-lg gap-sf-12">
      <Alert title="Status" variant="info">
        System notes are available for this release.
      </Alert>
      <Alert title="Success" variant="success">
        Release passed validation and can move to review.
      </Alert>
      <Alert title="Warning" variant="warning">
        Publishing is still in progress for two dependent packages.
      </Alert>
      <Alert title="Error" variant="error">
        Contract check failed for this state reference.
      </Alert>
    </div>
  )
};

export const WithAction: Story = {
  render: () => (
    <div className="max-w-modal-md">
      <Alert
        action={
          <Button size="sm" variant="secondary">
            Review issue
          </Button>
        }
        title="Missing primitive reference"
        variant="error"
      >
        Fix the token alias before publishing the package.
      </Alert>
    </div>
  )
};
