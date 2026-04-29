import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button/Button";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from "./Modal";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"]
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Publish notes</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Publish documentation</ModalTitle>
          <ModalDescription>
            Confirm that this release of the visual documentation package is ready for the design system.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          The modal uses a raised surface, visible focus handling, Escape close behavior, and focus trapping from Radix Dialog.
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">Cancel</Button>
          </ModalClose>
          <Button>Publish</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sf-12">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <Modal key={size}>
          <ModalTrigger asChild>
            <Button variant="secondary">{size.toUpperCase()}</Button>
          </ModalTrigger>
          <ModalContent size={size}>
            <ModalHeader>
              <ModalTitle>{size.toUpperCase()} modal</ModalTitle>
              <ModalDescription>Modal width follows the component tokens defined for the library.</ModalDescription>
            </ModalHeader>
            <ModalBody>Use larger widths only when the content needs the additional reading area.</ModalBody>
          </ModalContent>
        </Modal>
      ))}
    </div>
  )
};

export const DangerState: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="danger">Delete token</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Delete token</ModalTitle>
          <ModalDescription>This action removes the primitive reference from the current package.</ModalDescription>
        </ModalHeader>
        <ModalBody className="rounded-sf-lg border border-error-border bg-error-bg p-sf-16 text-error-text">
          Confirm the dependent aliases before removing this token.
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">Cancel</Button>
          </ModalClose>
          <Button variant="danger">Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export const LoadingState: Story = {
  render: () => (
    <div className="max-w-modal-sm rounded-sf-2xl border border-border bg-surface-raised p-sf-24 shadow-sf-3">
      <div className="h-sf-20 w-1/2 animate-pulse rounded-sf-full bg-disabled-border" />
      <div className="mt-sf-12 h-sf-12 w-4/5 animate-pulse rounded-sf-full bg-disabled-border" />
      <div className="mt-sf-8 h-sf-12 w-3/5 animate-pulse rounded-sf-full bg-disabled-border" />
    </div>
  )
};
