import type { Meta, StoryFn } from "@storybook/react";

import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";
import { FormField } from "./FormField";

const meta = {
  title: "Components/FormField",
  component: FormField,
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
    optionalText: {
      control: "text"
    },
    required: {
      control: "boolean"
    }
  },
  args: {
    helperText: "Use a short, stable identifier.",
    label: "Project key",
    optionalText: null,
    required: false
  }
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryFn<typeof FormField>;

const playgroundSource = `<FormField label="Project key" helperText="Use a short, stable identifier.">
  {(field) => <Input {...field} label={null} helperText={null} placeholder="release-vault" />}
</FormField>`;

const statesSource = `<div className="grid max-w-modal-md gap-sf-16">
  <FormField label="Default" helperText="Helper text sits below the field.">
    {(field) => <Input {...field} label={null} helperText={null} defaultValue="token-map" />}
  </FormField>
  <FormField label="Required" required errorText="Release owner is required.">
    {(field) => <Input {...field} label={null} helperText={null} defaultValue="" />}
  </FormField>
  <FormField label="Notes" optionalText="Optional" helperText="Long copy can use Textarea inside FormField.">
    {(field) => <Textarea {...field} label={null} helperText={null} defaultValue="Review scope changed after token audit." />}
  </FormField>
</div>`;

export const Playground: Story = (args) => (
  <div className="max-w-modal-md">
    <FormField {...args}>
      {(field) => <Input {...field} label={null} helperText={null} placeholder="release-vault" />}
    </FormField>
  </div>
);

Playground.args = {
  helperText: "Use a short, stable identifier.",
  label: "Project key",
  optionalText: null,
  required: false
};

Playground.parameters = {
  docs: {
    source: {
      code: playgroundSource
    }
  }
};

export const States: Story = () => (
  <div className="grid max-w-modal-md gap-sf-16">
    <FormField label="Default" helperText="Helper text sits below the field.">
      {(field) => <Input {...field} label={null} helperText={null} defaultValue="token-map" />}
    </FormField>
    <FormField label="Required" required errorText="Release owner is required.">
      {(field) => <Input {...field} label={null} helperText={null} defaultValue="" />}
    </FormField>
    <FormField label="Notes" optionalText="Optional" helperText="Long copy can use Textarea inside FormField.">
      {(field) => <Textarea {...field} label={null} helperText={null} defaultValue="Review scope changed after token audit." />}
    </FormField>
  </div>
);

States.parameters = {
  docs: {
    source: {
      code: statesSource
    }
  }
};
