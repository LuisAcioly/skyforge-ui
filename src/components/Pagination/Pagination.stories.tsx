import type { Meta, StoryObj } from "@storybook/react";

import { Pagination } from "./Pagination";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"]
    }
  },
  args: {
    page: 6,
    siblingCount: 1,
    size: "md",
    totalPages: 18
  }
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

const playgroundSource = `<Pagination page={6} totalPages={18} siblingCount={1} onPageChange={(page) => console.log(page)} />`;

export const Playground: Story = {
  render: (args) => <Pagination {...args} onPageChange={() => undefined} />,
  parameters: {
    docs: {
      source: {
        code: playgroundSource
      }
    }
  }
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-sf-16">
      <Pagination page={3} totalPages={9} size="sm" onPageChange={() => undefined} />
      <Pagination page={6} totalPages={18} size="md" onPageChange={() => undefined} />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="grid gap-sf-16">
      <Pagination page={1} totalPages={8} onPageChange={() => undefined} />
      <Pagination page={8} totalPages={8} onPageChange={() => undefined} />
      <Pagination disabled page={4} totalPages={8} onPageChange={() => undefined} />
    </div>
  )
};
