import { CodeBracketIcon, CommandLineIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fireEvent, waitFor, within } from "storybook/test";

import { cn } from "../../utils/cn";
import { TooltipProvider } from "../Tooltip/Tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger, type TabsVariant } from "./Tabs";

type DemoState = "rest" | "hover" | "focus" | "active" | "active-focus" | "disabled" | "tooltip";

const rows: Array<{ state: DemoState; label: string }> = [
  { state: "rest", label: "Repouso" },
  { state: "hover", label: "Hover" },
  { state: "focus", label: "Foco" },
  { state: "active", label: "Ativo" },
  { state: "active-focus", label: "Ativo + foco" },
  { state: "disabled", label: "Desabilitado" },
  { state: "tooltip", label: "Tooltip aberto" }
];

function StateRow({ state, label, variant }: { state: DemoState; label: string; variant: TabsVariant }) {
  const selectsTarget = state === "active" || state === "active-focus";

  return (
    // The open tooltip renders above its row; keep it clear of the disabled row.
    <div className={cn("grid grid-cols-[120px_auto] items-center gap-sf-16", state === "tooltip" && "mt-sf-48")}>
      <span className="text-caption text-content-tertiary">{label}</span>
      <TooltipProvider>
        <Tabs variant={variant} iconOnly defaultValue={selectsTarget ? "code" : "agents"}>
          <TabsList aria-label={`${label} (${variant})`}>
            <TabsTrigger value="agents" icon={<Squares2X2Icon />} label="Visão de Agentes" />
            <TabsTrigger
              value="code"
              icon={<CodeBracketIcon />}
              label="Visão de Código"
              disabled={state === "disabled"}
              data-demo={state}
            />
            <TabsTrigger value="terminal" icon={<CommandLineIcon />} label="Visão de Terminal" />
          </TabsList>
          <TabsContent value="agents" className="sr-only">
            Agentes
          </TabsContent>
          <TabsContent value="code" className="sr-only">
            Código
          </TabsContent>
        </Tabs>
      </TooltipProvider>
    </div>
  );
}

function StateMatrix({ variant }: { variant: TabsVariant }) {
  return (
    <div className="grid gap-sf-16 pb-sf-48 pt-sf-8">
      {rows.map((row) => (
        <StateRow key={row.state} variant={variant} {...row} />
      ))}
    </div>
  );
}

// Real :hover and :focus-visible cannot be held in a static render, so the
// pseudo-states addon forces them on the demo trigger of each row.
const pseudo = {
  hover: ['[data-demo="hover"]'],
  focusVisible: ['[data-demo="focus"]', '[data-demo="active-focus"]']
};

const meta = {
  title: "Components/Tabs/States",
  tags: ["!autodocs"],
  parameters: {
    a11y: { test: "error" },
    pseudo
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const rgb = (element: Element, token: string) =>
  `rgb(${getComputedStyle(element).getPropertyValue(token).trim().split(/\s+/).join(", ")})`;

/**
 * Applies the addon's state classes. The Storybook UI does this from the addon
 * decorator; the Vitest runner does not run it, so the play function mirrors the
 * same `pseudo` parameter (stylesheets are rewritten in .storybook/vitest.setup.ts).
 */
function forcePseudoStates(root: HTMLElement) {
  for (const selector of pseudo.hover) {
    root.querySelectorAll(selector).forEach((element) => element.classList.add("pseudo-hover"));
  }
  for (const selector of pseudo.focusVisible) {
    root.querySelectorAll(selector).forEach((element) => element.classList.add("pseudo-focus-visible"));
  }
}

function target(canvasElement: HTMLElement, state: DemoState) {
  return canvasElement.querySelector<HTMLElement>(`[data-demo="${state}"]`)!;
}

async function playStates(canvasElement: HTMLElement, variant: TabsVariant) {
  const page = within(canvasElement.ownerDocument.body);
  const hover = target(canvasElement, "hover");
  const active = target(canvasElement, "active");
  const activeFocus = target(canvasElement, "active-focus");
  const disabled = target(canvasElement, "disabled");
  const tooltip = target(canvasElement, "tooltip");
  const iconOf = (element: HTMLElement) => element.querySelector("svg")!.parentElement!;

  const gapToken = variant === "segmented" ? "--color-surface-sunken" : "--color-background";

  forcePseudoStates(canvasElement);

  // Settled (post-transition) styles.
  await waitFor(() => {
    expect(getComputedStyle(hover).backgroundColor).toBe(rgb(hover, "--color-hover-surface"));
    expect(getComputedStyle(activeFocus).boxShadow).toContain(`${rgb(activeFocus, gapToken)} 0px 0px 0px 1px`);
    expect(getComputedStyle(activeFocus).boxShadow).toContain(`${rgb(activeFocus, "--color-focus")} 0px 0px 0px 3px`);
  });

  await expect(active).toHaveAttribute("aria-selected", "true");
  await expect(disabled).toBeDisabled();

  // Borders exist at rest (transparent), so selection never moves the icon.
  await expect(hover.getBoundingClientRect().width).toBe(32);
  await expect(iconOf(active).getBoundingClientRect().left - active.getBoundingClientRect().left).toBe(
    iconOf(hover).getBoundingClientRect().left - hover.getBoundingClientRect().left
  );

  if (variant === "ghost") {
    await waitFor(() => {
      expect(getComputedStyle(active).backgroundColor).toBe(rgb(active, "--color-surface-sunken"));
      expect(getComputedStyle(active).borderColor).toBe("rgba(0, 0, 0, 0)");
      // Hover and selection can share a surface in light theme; the icon tells them apart.
      expect(getComputedStyle(iconOf(active)).color).toBe(rgb(active, "--color-icon-accent"));
      expect(getComputedStyle(iconOf(hover)).color).not.toBe(getComputedStyle(iconOf(active)).color);
    });
  } else {
    await waitFor(() => {
      expect(getComputedStyle(active).backgroundColor).toBe(rgb(active, "--color-accent-bg"));
      expect(getComputedStyle(active).borderColor).toBe(rgb(active, "--color-accent-border"));
      expect(getComputedStyle(active).color).toBe(rgb(active, "--color-accent-text"));
    });
  }

  fireEvent.pointerMove(tooltip, { pointerType: "mouse" });
  const content = await page.findByRole("tooltip");
  await expect(content).toHaveTextContent("Visão de Código");
}

export const SegmentedLight: Story = {
  name: "Segmented · light",
  globals: { theme: "light" },
  render: () => <StateMatrix variant="segmented" />,
  play: ({ canvasElement }) => playStates(canvasElement, "segmented")
};

export const SegmentedDark: Story = {
  name: "Segmented · dark",
  globals: { theme: "dark" },
  render: () => <StateMatrix variant="segmented" />,
  play: ({ canvasElement }) => playStates(canvasElement, "segmented")
};

export const GhostLight: Story = {
  name: "Ghost · light",
  globals: { theme: "light" },
  render: () => <StateMatrix variant="ghost" />,
  play: ({ canvasElement }) => playStates(canvasElement, "ghost")
};

export const GhostDark: Story = {
  name: "Ghost · dark",
  globals: { theme: "dark" },
  render: () => <StateMatrix variant="ghost" />,
  play: ({ canvasElement }) => playStates(canvasElement, "ghost")
};
