import type { Meta, StoryObj } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["underline", "segmented", "rail"]
    }
  },
  args: {
    defaultValue: "foundation",
    variant: "segmented"
  }
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList aria-label="Documentation sections">
        <TabsTrigger value="foundation">Foundation</TabsTrigger>
        <TabsTrigger value="components">Components</TabsTrigger>
        <TabsTrigger value="usage">Usage</TabsTrigger>
      </TabsList>
      <TabsContent value="foundation">Canonical foundations resolve through semantic tokens.</TabsContent>
      <TabsContent value="components">Component states inherit theme behavior from CSS variables.</TabsContent>
      <TabsContent value="usage">Use tabs for related panels, not multi-select filtering.</TabsContent>
    </Tabs>
  )
};

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-modal-lg gap-sf-32">
      <Tabs defaultValue="structure" variant="underline">
        <TabsList aria-label="Underline tabs">
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="states">States</TabsTrigger>
        </TabsList>
        <TabsContent value="structure">Underline tabs keep the surface quiet and emphasize hierarchy.</TabsContent>
        <TabsContent value="tokens">Tokens keep the component aligned across themes.</TabsContent>
        <TabsContent value="states">Keyboard and selected states are handled by Radix.</TabsContent>
      </Tabs>

      <Tabs defaultValue="foundation" variant="segmented">
        <TabsList aria-label="Segmented tabs">
          <TabsTrigger value="foundation">Foundation</TabsTrigger>
          <TabsTrigger value="component">Component</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>
        <TabsContent value="foundation">Segmented tabs work well for compact product panels.</TabsContent>
        <TabsContent value="component">Selected state uses a raised surface without decorative glow.</TabsContent>
        <TabsContent value="usage">The list remains keyboard navigable by default.</TabsContent>
      </Tabs>

      <Tabs defaultValue="audit" variant="rail" className="grid gap-sf-16 md:grid-cols-[180px_1fr]">
        <TabsList aria-label="Rail tabs">
          <TabsTrigger value="audit">Audit</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="release">Release</TabsTrigger>
        </TabsList>
        <TabsContent value="audit" className="mt-0">
          Rail tabs keep navigation structural for dense settings screens.
        </TabsContent>
        <TabsContent value="tokens" className="mt-0">
          Token references remain visible without adding another navigation layer.
        </TabsContent>
        <TabsContent value="release" className="mt-0">
          Release notes stay in a focused panel beside the rail.
        </TabsContent>
      </Tabs>
    </div>
  )
};

export const States: Story = {
  render: () => (
    <Tabs defaultValue="active" variant="segmented">
      <TabsList aria-label="Tab states">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="resting">Resting</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active">Active tab content uses surface tokens and remains keyboard reachable.</TabsContent>
      <TabsContent value="resting">Resting tabs keep enough contrast without competing with content.</TabsContent>
      <TabsContent value="disabled">Disabled content is intentionally unreachable from the trigger.</TabsContent>
    </Tabs>
  )
};
