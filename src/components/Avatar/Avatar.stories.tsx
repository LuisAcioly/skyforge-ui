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
    },
    customColor: {
      control: "text"
    },
    variant: {
      control: "select",
      options: ["neutral", "custom"]
    }
  },
  args: {
    customColor: "#367656",
    size: "md",
    status: "online",
    variant: "neutral"
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

export const CustomColor: Story = {
  render: () => (
    <div className="flex items-center gap-sf-12">
      <Avatar customColor="#367656" variant="custom">
        <AvatarFallback>SF</AvatarFallback>
      </Avatar>
      <Avatar customColor="rgb(54 118 86)" status="online" variant="custom">
        <AvatarFallback>UI</AvatarFallback>
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
