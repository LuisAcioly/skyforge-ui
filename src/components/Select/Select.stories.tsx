import type { Meta, StoryObj } from "@storybook/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger
} from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"]
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const playgroundSource = `<Select defaultValue="stable">
  <SelectTrigger label="Release channel" placeholder="Choose channel" helperText="Choose one publishing track." />
  <SelectContent>
    <SelectItem value="stable">Stable</SelectItem>
    <SelectItem value="candidate">Candidate</SelectItem>
    <SelectItem value="internal">Internal</SelectItem>
  </SelectContent>
</Select>`;

export const Playground: Story = {
  render: () => (
    <div className="max-w-modal-sm">
      <Select defaultValue="stable">
        <SelectTrigger label="Release channel" placeholder="Choose channel" helperText="Choose one publishing track." />
        <SelectContent>
          <SelectItem value="stable">Stable</SelectItem>
          <SelectItem value="candidate">Candidate</SelectItem>
          <SelectItem value="internal">Internal</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: playgroundSource
      }
    }
  }
};

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <Select defaultValue="outline">
        <SelectTrigger label="Outline" variant="outline" />
        <SelectContent>
          <SelectItem value="outline">Outline</SelectItem>
          <SelectItem value="filled">Filled</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="filled">
        <SelectTrigger label="Filled" variant="filled" />
        <SelectContent>
          <SelectItem value="outline">Outline</SelectItem>
          <SelectItem value="filled">Filled</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="ghost">
        <SelectTrigger label="Ghost" variant="ghost" />
        <SelectContent>
          <SelectItem value="ghost">Ghost</SelectItem>
          <SelectItem value="outline">Outline</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-modal-md gap-sf-16">
      <Select defaultValue="ready">
        <SelectTrigger label="Default" helperText="Keyboard support comes from Radix Select." />
        <SelectContent>
          <SelectItem value="ready">Ready</SelectItem>
          <SelectItem value="review">In review</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="invalid">
        <SelectTrigger label="Invalid" errorText="Select a valid publishing state." />
        <SelectContent>
          <SelectItem value="invalid">Invalid state</SelectItem>
          <SelectItem value="valid">Valid state</SelectItem>
        </SelectContent>
      </Select>
      <Select disabled defaultValue="locked">
        <SelectTrigger label="Disabled" helperText="Disabled values remain readable." />
        <SelectContent>
          <SelectItem value="locked">Locked</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
};

export const Grouped: Story = {
  render: () => (
    <div className="max-w-modal-sm">
      <Select defaultValue="contrast">
        <SelectTrigger label="Audit focus" placeholder="Choose audit" />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Interface</SelectLabel>
            <SelectItem value="contrast">Contrast pass</SelectItem>
            <SelectItem value="keyboard">Keyboard pass</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Release</SelectLabel>
            <SelectItem value="tokens">Token diff</SelectItem>
            <SelectItem value="docs">Documentation pass</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
};
