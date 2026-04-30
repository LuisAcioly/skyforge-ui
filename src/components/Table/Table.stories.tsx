import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback } from "../Avatar/Avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "./Table";

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    density: {
      control: "select",
      options: ["default", "compact"]
    }
  },
  args: {
    density: "default"
  }
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Owner</TableHead>
          <TableHead>Status</TableHead>
          <TableHead alignText="right">Risk</TableHead>
          <TableHead alignText="right">Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow data-selected="true">
          <TableCell>
            <div className="flex items-center gap-sf-12">
              <Avatar size="sm">
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <span className="text-content-primary">Maia Rocha</span>
            </div>
          </TableCell>
          <TableCell>Ready</TableCell>
          <TableCell alignText="right">18.7%</TableCell>
          <TableCell alignText="right">14m ago</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="flex items-center gap-sf-12">
              <Avatar size="sm">
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <span className="text-content-primary">Vera Calder</span>
            </div>
          </TableCell>
          <TableCell>Review</TableCell>
          <TableCell alignText="right">32.4%</TableCell>
          <TableCell alignText="right">41m ago</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Open release threads</TableCell>
          <TableCell alignText="right">2</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
};

export const Compact: Story = {
  render: () => (
    <Table density="compact">
      <TableHeader>
        <TableRow>
          <TableHead>Package</TableHead>
          <TableHead>State</TableHead>
          <TableHead alignText="right">Diff</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>tokens-core</TableCell>
          <TableCell>Synced</TableCell>
          <TableCell alignText="right">+12</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>react-primitives</TableCell>
          <TableCell>Queued</TableCell>
          <TableCell alignText="right">+7</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
};
