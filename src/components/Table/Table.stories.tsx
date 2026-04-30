import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback } from "../Avatar/Avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableLoading,
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
    },
    surface: {
      control: "select",
      options: ["outline", "plain"]
    }
  },
  args: {
    density: "default",
    surface: "outline"
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
          <TableHead alignText="right" numeric>Risk</TableHead>
          <TableHead alignText="right" numeric>Updated</TableHead>
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
          <TableCell>
            <span className="inline-flex rounded-sf-sm border border-success-border bg-success-bg px-sf-8 py-sf-4 text-caption text-success-text">
              Ready
            </span>
          </TableCell>
          <TableCell alignText="right" numeric>18.7%</TableCell>
          <TableCell alignText="right" numeric>14m ago</TableCell>
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
          <TableCell>
            <span className="inline-flex rounded-sf-sm border border-warning-border bg-warning-bg px-sf-8 py-sf-4 text-caption text-warning-text">
              Review
            </span>
          </TableCell>
          <TableCell alignText="right" numeric>32.4%</TableCell>
          <TableCell alignText="right" numeric>41m ago</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Open release threads</TableCell>
          <TableCell alignText="right" numeric>2</TableCell>
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
          <TableHead alignText="right" numeric>Diff</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>tokens-core</TableCell>
          <TableCell>Synced</TableCell>
          <TableCell alignText="right" numeric>+12</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>react-primitives</TableCell>
          <TableCell>Queued</TableCell>
          <TableCell alignText="right" numeric>+7</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-modal-lg gap-sf-24">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Package</TableHead>
            <TableHead>Status</TableHead>
            <TableHead alignText="right" numeric>Changed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableLoading colSpan={3} rows={3} />
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Package</TableHead>
            <TableHead>Status</TableHead>
            <TableHead alignText="right" numeric>Changed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableEmpty
            colSpan={3}
            title="No release threads"
            description="Create a release draft to populate this table."
          />
        </TableBody>
      </Table>
    </div>
  )
};
