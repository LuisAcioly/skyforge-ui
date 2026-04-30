import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button/Button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./Tooltip";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"]
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

const playgroundSource = `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="secondary">Token status</Button>
    </TooltipTrigger>
    <TooltipContent>Latest token export completed 14 minutes ago.</TooltipContent>
  </Tooltip>
</TooltipProvider>`;

export const Playground: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Token status</Button>
        </TooltipTrigger>
        <TooltipContent>Latest token export completed 14 minutes ago.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      source: {
        code: playgroundSource
      }
    }
  }
};

export const Placement: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex flex-wrap gap-sf-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">Tooltip above trigger.</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">Tooltip beside trigger.</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Tooltip below trigger.</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
};
