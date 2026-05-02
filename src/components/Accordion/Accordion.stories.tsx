import type { Meta, StoryObj } from "@storybook/react";

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  type AccordionVariant
} from "./Accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "ghost"]
    }
  },
  args: {
    variant: "outline"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: ({ variant }: { variant?: AccordionVariant }) => (
    <Accordion type="single" collapsible variant={variant} className="max-w-modal-md" defaultValue="tokens">
      <AccordionItem value="tokens">
        <AccordionHeader>
          <AccordionTrigger>Token validation</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Token aliases were checked against light and dark themes before release review.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="contrast">
        <AccordionHeader>
          <AccordionTrigger>Contrast review</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Text, focus rings, and essential icon states meet the required contrast ratios.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="max-w-modal-md" defaultValue={["release", "audit"]}>
      <AccordionItem value="release">
        <AccordionHeader>
          <AccordionTrigger>Release scope</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Accordion content supports dense release notes without moving users away from the current surface.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="audit">
        <AccordionHeader>
          <AccordionTrigger>Audit trail</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Use this pattern for progressive disclosure, not primary navigation or unrelated panels.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const Ghost: Story = {
  render: () => (
    <Accordion type="single" collapsible variant="ghost" className="max-w-modal-md">
      <AccordionItem value="handoff">
        <AccordionHeader>
          <AccordionTrigger>Design handoff notes</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Ghost variant works inside existing framed surfaces where another card boundary would add noise.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="keyboard">
        <AccordionHeader>
          <AccordionTrigger>Keyboard behavior</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Radix handles roving focus, keyboard navigation, and ARIA state attributes.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};
