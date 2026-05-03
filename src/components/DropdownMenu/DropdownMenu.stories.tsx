import type { Meta, StoryFn } from "@storybook/react";
import { ArrowDownTrayIcon, Cog6ToothIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "./DropdownMenu";

const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"]
} satisfies Meta<typeof DropdownMenu>;

export default meta;

const playgroundSource = `<DropdownMenu>
  <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Release actions</DropdownMenuLabel>
    <DropdownMenuItem>
      <DocumentDuplicateIcon aria-hidden="true" className="h-sf-16 w-sf-16 text-icon-secondary" strokeWidth={1.5} />
      Duplicate draft
      <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <ArrowDownTrayIcon aria-hidden="true" className="h-sf-16 w-sf-16 text-icon-secondary" strokeWidth={1.5} />
      Export notes
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Cog6ToothIcon aria-hidden="true" className="h-sf-16 w-sf-16 text-icon-secondary" strokeWidth={1.5} />
        Review mode
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Design audit</DropdownMenuItem>
        <DropdownMenuItem>Accessibility pass</DropdownMenuItem>
        <DropdownMenuItem>Token diff</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem danger>Archive release</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

const selectionSource = `<DropdownMenu>
  <DropdownMenuTrigger>View options</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Visible layers</DropdownMenuLabel>
    <DropdownMenuCheckboxItem checked>Token aliases</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem>Deprecated values</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked>Contrast notes</DropdownMenuCheckboxItem>
    <DropdownMenuSeparator />
    <DropdownMenuLabel>Density</DropdownMenuLabel>
    <DropdownMenuRadioGroup value="comfortable">
      <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="spacious">Spacious</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`;

const statesSource = `<DropdownMenu defaultOpen>
  <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Default item</DropdownMenuItem>
    <DropdownMenuItem disabled>Disabled item</DropdownMenuItem>
    <DropdownMenuItem danger>Danger item</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

const triggerVariantsSource = `<div className="flex flex-wrap items-center gap-sf-8">
  <DropdownMenu>
    <DropdownMenuTrigger>Secondary trigger</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Duplicate draft</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <DropdownMenu>
    <DropdownMenuTrigger variant="ghost">Ghost trigger</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Export notes</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>`;
type Story = StoryFn<typeof DropdownMenu>;

export const Playground: Story = () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Release actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <DocumentDuplicateIcon aria-hidden="true" className="h-sf-16 w-sf-16 text-icon-secondary" strokeWidth={1.5} />
          Duplicate draft
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ArrowDownTrayIcon aria-hidden="true" className="h-sf-16 w-sf-16 text-icon-secondary" strokeWidth={1.5} />
          Export notes
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Cog6ToothIcon aria-hidden="true" className="h-sf-16 w-sf-16 text-icon-secondary" strokeWidth={1.5} />
            Review mode
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Design audit</DropdownMenuItem>
            <DropdownMenuItem>Accessibility pass</DropdownMenuItem>
            <DropdownMenuItem>Token diff</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem danger>Archive release</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

Playground.parameters = {
  docs: {
    source: {
      code: playgroundSource
    }
  }
};

export const Selection: Story = () => (
    <DropdownMenu>
      <DropdownMenuTrigger>View options</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Visible layers</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked>Token aliases</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Deprecated values</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Contrast notes</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Density</DropdownMenuLabel>
        <DropdownMenuRadioGroup value="comfortable">
          <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="spacious">Spacious</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

Selection.parameters = {
  docs: {
    source: {
      code: selectionSource
    }
  }
};

export const States: Story = () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Default item</DropdownMenuItem>
        <DropdownMenuItem disabled>Disabled item</DropdownMenuItem>
        <DropdownMenuItem danger>Danger item</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

States.parameters = {
  docs: {
    source: {
      code: statesSource
    }
  }
};

export const TriggerVariants: Story = () => (
    <div className="flex flex-wrap items-center gap-sf-8">
      <DropdownMenu>
        <DropdownMenuTrigger>Secondary trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Duplicate draft</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger variant="ghost">Ghost trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Export notes</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

TriggerVariants.parameters = {
  docs: {
    source: {
      code: triggerVariantsSource
    }
  }
};
