import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"]
    },
    status: {
      control: "select",
      options: ["online", "away", "busy", "offline"]
    }
  },
  args: {
    size: "md",
    status: "online"
  }
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://picsum.photos/seed/maia-rocha/96/96" alt="Maia Rocha" />
      <AvatarFallback>MR</AvatarFallback>
    </Avatar>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-sf-12">
      <Avatar size="sm">
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarFallback>IR</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>NS</AvatarFallback>
      </Avatar>
    </div>
  )
};

export const Status: Story = {
  render: () => (
    <div className="flex items-center gap-sf-12">
      <Avatar status="online">
        <AvatarFallback>ON</AvatarFallback>
      </Avatar>
      <Avatar status="away">
        <AvatarFallback>AW</AvatarFallback>
      </Avatar>
      <Avatar status="busy">
        <AvatarFallback>BY</AvatarFallback>
      </Avatar>
      <Avatar status="offline">
        <AvatarFallback>OF</AvatarFallback>
      </Avatar>
    </div>
  )
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>NS</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  )
};
