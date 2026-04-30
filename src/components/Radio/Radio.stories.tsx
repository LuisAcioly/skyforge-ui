import type { Meta, StoryObj } from "@storybook/react";

import { Radio, RadioGroup } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"]
    }
  },
  args: {
    defaultValue: "stable",
    orientation: "vertical"
  }
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="stable" label="Stable" helperText="Publish after review gates pass." />
      <Radio value="candidate" label="Candidate" helperText="Route through design QA first." />
      <Radio value="frozen" label="Frozen" helperText="No edits until release window opens." />
    </RadioGroup>
  )
};

export const Orientation: Story = {
  render: () => (
    <div className="grid gap-sf-24">
      <RadioGroup defaultValue="light" orientation="horizontal">
        <Radio value="light" label="Light" />
        <Radio value="dark" label="Dark" />
        <Radio value="system" label="System" />
      </RadioGroup>
      <RadioGroup defaultValue="manual">
        <Radio value="manual" label="Manual publish" helperText="Operator chooses exact release time." />
        <Radio value="scheduled" label="Scheduled publish" helperText="Queue release during maintenance window." />
      </RadioGroup>
    </div>
  )
};

export const States: Story = {
  render: () => (
    <RadioGroup defaultValue="selected" className="max-w-modal-md">
      <Radio value="selected" label="Selected" helperText="Current choice uses primary token contrast." />
      <Radio value="resting" label="Resting" helperText="Hover and focus states remain visible." />
      <Radio disabled value="disabled" label="Disabled" helperText="Unavailable options do not lose legibility." />
    </RadioGroup>
  )
};
