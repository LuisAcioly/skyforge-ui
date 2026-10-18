import {
  CircleStackIcon,
  CodeBracketIcon,
  CommandLineIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  Squares2X2Icon
} from "@heroicons/react/24/outline";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { expect, fireEvent, spyOn, userEvent, waitFor, within } from "storybook/test";

import { ThemeProvider } from "../../theme/ThemeProvider";
import { TooltipProvider } from "../Tooltip/Tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    appearance: {
      control: "inline-radio",
      options: ["solid", "soft"]
    },
    variant: {
      control: "select",
      options: ["underline", "segmented", "rail", "ghost"]
    },
    iconOnly: {
      control: "boolean"
    }
  },
  args: {
    appearance: "solid",
    defaultValue: "foundation",
    variant: "segmented"
  },
  parameters: {
    a11y: { test: "error" }
  }
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList aria-label="Documentation sections">
        <TabsTrigger value="foundation">Foundation</TabsTrigger>
        <TabsTrigger value="components">Components</TabsTrigger>
        <TabsTrigger value="usage">Usage</TabsTrigger>
      </TabsList>
      <TabsContent value="foundation">Canonical foundations resolve through semantic tokens.</TabsContent>
      <TabsContent value="components">Component states inherit theme behavior from CSS variables.</TabsContent>
      <TabsContent value="usage">Use tabs for related panels, not multi-select filtering.</TabsContent>
    </Tabs>
  )
};

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-modal-lg gap-sf-32">
      <Tabs defaultValue="structure" variant="underline">
        <TabsList aria-label="Underline tabs">
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="states">States</TabsTrigger>
        </TabsList>
        <TabsContent value="structure">Underline tabs keep the surface quiet and emphasize hierarchy.</TabsContent>
        <TabsContent value="tokens">Tokens keep the component aligned across themes.</TabsContent>
        <TabsContent value="states">Keyboard and selected states are handled by Radix.</TabsContent>
      </Tabs>

      <Tabs defaultValue="foundation" variant="segmented">
        <TabsList aria-label="Segmented tabs">
          <TabsTrigger value="foundation">Foundation</TabsTrigger>
          <TabsTrigger value="component">Component</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>
        <TabsContent value="foundation">Segmented tabs work well for compact product panels.</TabsContent>
        <TabsContent value="component">Selected state uses a raised surface without decorative glow.</TabsContent>
        <TabsContent value="usage">The list remains keyboard navigable by default.</TabsContent>
      </Tabs>

      <Tabs defaultValue="agents" variant="ghost">
        <TabsList aria-label="Ghost tabs">
          <TabsTrigger value="agents" icon={<Squares2X2Icon />} label="Agents" />
          <TabsTrigger value="code" icon={<CodeBracketIcon />} label="Code" />
          <TabsTrigger value="terminal" icon={<CommandLineIcon />} label="Terminal" />
        </TabsList>
        <TabsContent value="agents">Ghost tabs drop the track and border for toolbars inside an existing surface.</TabsContent>
        <TabsContent value="code">The selected item sits on the sunken surface with primary text and icon.</TabsContent>
        <TabsContent value="terminal">The focus halo gap inherits the surface of the container.</TabsContent>
      </Tabs>

      <Tabs defaultValue="audit" variant="rail" className="grid gap-sf-16 md:grid-cols-[180px_1fr]">
        <TabsList aria-label="Rail tabs">
          <TabsTrigger value="audit">Audit</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="release">Release</TabsTrigger>
        </TabsList>
        <TabsContent value="audit" className="mt-0">
          Rail tabs keep navigation structural for dense settings screens.
        </TabsContent>
        <TabsContent value="tokens" className="mt-0">
          Token references remain visible without adding another navigation layer.
        </TabsContent>
        <TabsContent value="release" className="mt-0">
          Release notes stay in a focused panel beside the rail.
        </TabsContent>
      </Tabs>
    </div>
  )
};

/** `appearance="soft"` keeps the tinted accent surface on segmented and rail. */
export const Soft: Story = {
  render: () => (
    <div className="grid max-w-modal-lg gap-sf-32">
      <Tabs appearance="soft" defaultValue="foundation" variant="segmented">
        <TabsList aria-label="Soft segmented tabs">
          <TabsTrigger value="foundation">Foundation</TabsTrigger>
          <TabsTrigger value="component">Component</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>
        <TabsContent value="foundation">The selected segment sits on the tinted accent surface.</TabsContent>
        <TabsContent value="component">Use it where a solid fill would compete with nearby content.</TabsContent>
        <TabsContent value="usage">The list remains keyboard navigable by default.</TabsContent>
      </Tabs>

      <Tabs appearance="soft" defaultValue="audit" variant="rail" className="grid gap-sf-16 md:grid-cols-[180px_1fr]">
        <TabsList aria-label="Soft rail tabs">
          <TabsTrigger value="audit">Audit</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="release">Release</TabsTrigger>
        </TabsList>
        <TabsContent value="audit" className="mt-0">
          Soft rail tabs keep the selected row tinted instead of filled.
        </TabsContent>
        <TabsContent value="tokens" className="mt-0">
          Token references remain visible without adding another navigation layer.
        </TabsContent>
        <TabsContent value="release" className="mt-0">
          Release notes stay in a focused panel beside the rail.
        </TabsContent>
      </Tabs>
    </div>
  )
};

/**
 * `count` and `dot` mark pending items with an accent badge, so the charcoal
 * fill stays reserved for selection. The count joins the accessible name;
 * a `dot` needs `badgeLabel` to be announced.
 */
export const WithCount: Story = {
  render: () => (
    <TooltipProvider>
      <div className="grid max-w-modal-lg gap-sf-32">
        <Tabs defaultValue="agents" variant="segmented" iconOnly>
          <TabsList aria-label="Painel com contadores">
            <TabsTrigger value="agents" icon={<Squares2X2Icon />} label="Agentes" />
            <TabsTrigger value="code" icon={<CodeBracketIcon />} label="Código" count={3} badgeLabel="3 novidades" />
            <TabsTrigger value="terminal" icon={<CommandLineIcon />} label="Terminal" count={128} />
            <TabsTrigger value="deploy" icon={<RocketLaunchIcon />} label="Deploy" dot badgeLabel="há novidades" />
          </TabsList>
          <TabsContent value="agents">Agentes em execução.</TabsContent>
          <TabsContent value="code">Três arquivos alterados.</TabsContent>
          <TabsContent value="terminal">Saída do terminal.</TabsContent>
          <TabsContent value="deploy">Novo deploy disponível.</TabsContent>
        </Tabs>

        <Tabs defaultValue="inbox" variant="segmented">
          <TabsList aria-label="Caixa com contadores">
            <TabsTrigger value="inbox" count={12}>
              Entrada
            </TabsTrigger>
            <TabsTrigger value="review" count={4}>
              Em revisão
            </TabsTrigger>
            <TabsTrigger value="done">Concluídas</TabsTrigger>
          </TabsList>
          <TabsContent value="inbox">Doze itens aguardando.</TabsContent>
          <TabsContent value="review">Quatro itens em revisão.</TabsContent>
          <TabsContent value="done">Nenhum item pendente.</TabsContent>
        </Tabs>

        <Tabs defaultValue="inbox" variant="rail" className="max-w-[220px]">
          <TabsList aria-label="Rail com contadores">
            <TabsTrigger value="inbox" icon={<CircleStackIcon />} count={12}>
              Entrada
            </TabsTrigger>
            <TabsTrigger value="search" icon={<MagnifyingGlassIcon />} dot badgeLabel="há novidades">
              Busca
            </TabsTrigger>
            <TabsTrigger value="code" icon={<CodeBracketIcon />}>
              Código
            </TabsTrigger>
          </TabsList>
          <TabsContent value="inbox">Doze itens aguardando.</TabsContent>
          <TabsContent value="search">Resultados novos.</TabsContent>
          <TabsContent value="code">Editor de código.</TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("tab", { name: "Código, 3 novidades" })).toBeInTheDocument();
    await expect(canvas.getByRole("tab", { name: "Terminal, 99+" })).toBeInTheDocument();
    await expect(canvas.getByRole("tab", { name: "Deploy, há novidades" })).toBeInTheDocument();
    await expect(canvas.getByRole("tab", { name: "Agentes" })).toBeInTheDocument();
    // Text triggers join visible text and the visually hidden badge text.
    await expect(canvas.getAllByRole("tab", { name: /^Entrada\s*, 12$/ })).toHaveLength(2);
    await expect(canvas.getByRole("tab", { name: /^Busca\s*, há novidades$/ })).toBeInTheDocument();
    await expect(canvas.getByRole("tab", { name: "Concluídas" })).toBeInTheDocument();
  }
};

export const States: Story = {
  render: () => (
    <Tabs defaultValue="active" variant="segmented">
      <TabsList aria-label="Tab states">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="resting">Resting</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active">Active tab content uses surface tokens and remains keyboard reachable.</TabsContent>
      <TabsContent value="resting">Resting tabs keep enough contrast without competing with content.</TabsContent>
      <TabsContent value="disabled">Disabled content is intentionally unreachable from the trigger.</TabsContent>
    </Tabs>
  )
};

/** Tokens are space-separated channels; computed styles print them comma-separated. */
function channelsToRgb(element: Element, token: string) {
  return `rgb(${getComputedStyle(element).getPropertyValue(token).trim().split(/\s+/).join(", ")})`;
}

/** 1px gap in the surface behind the trigger, then a 2px focus ring (3px total spread). */
async function expectFocusHalo(trigger: HTMLElement, gapToken: string) {
  const gap = channelsToRgb(trigger, gapToken);
  const focus = channelsToRgb(trigger, "--color-focus");

  // The trigger transitions box-shadow, so wait for the settled value.
  await waitFor(() => {
    const shadow = getComputedStyle(trigger).boxShadow;
    expect(shadow).toContain(`${gap} 0px 0px 0px 1px`);
    expect(shadow).toContain(`${focus} 0px 0px 0px 3px`);
  });
}

const iconOnlySource = `<TooltipProvider>
  <Tabs variant="ghost" iconOnly value={view} onValueChange={setView}>
    <TabsList aria-label="Visão do painel">
      <TabsTrigger value="agents" icon={<Squares2X2Icon />} label="Visão de Agentes" />
      <TabsTrigger value="code" icon={<CodeBracketIcon />} label="Visão de Código" />
    </TabsList>
  </Tabs>
</TooltipProvider>`;

function IconOnlyPanel() {
  const [view, setView] = useState("agents");

  return (
    <TooltipProvider>
      <Tabs variant="ghost" iconOnly value={view} onValueChange={setView}>
        <TabsList aria-label="Visão do painel">
          <TabsTrigger value="agents" icon={<Squares2X2Icon />} label="Visão de Agentes" />
          <TabsTrigger value="code" icon={<CodeBracketIcon />} label="Visão de Código" />
          <TabsTrigger value="terminal" icon={<CommandLineIcon />} label="Visão de Terminal" />
          <TabsTrigger value="deploy" icon={<RocketLaunchIcon />} label="Visão de Deploy" disabled />
        </TabsList>
        <TabsContent value="agents">Agentes em execução.</TabsContent>
        <TabsContent value="code">Editor de código.</TabsContent>
        <TabsContent value="terminal">Terminal integrado.</TabsContent>
        <TabsContent value="deploy">Deploy indisponível.</TabsContent>
      </Tabs>
    </TooltipProvider>
  );
}

/**
 * Icon-only triggers are 32×32 with 20px icons: sized for pointer-driven
 * desktop surfaces such as IDE toolbars, not as touch targets. `label` is the
 * accessible name and the tooltip; a `TooltipProvider` ancestor is required.
 */
export const IconOnly: Story = {
  render: () => <IconOnlyPanel />,
  parameters: {
    docs: {
      source: {
        code: iconOnlySource
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const tablist = canvas.getByRole("tablist", { name: "Visão do painel" });
    const agents = canvas.getByRole("tab", { name: "Visão de Agentes" });
    const code = canvas.getByRole("tab", { name: "Visão de Código" });
    const terminal = canvas.getByRole("tab", { name: "Visão de Terminal" });
    const deploy = canvas.getByRole("tab", { name: "Visão de Deploy" });

    await step("exposes tab semantics and names", async () => {
      await expect(canvas.getAllByRole("tab")).toHaveLength(4);
      await expect(agents).toHaveAttribute("aria-selected", "true");
      await expect(code).toHaveAttribute("aria-selected", "false");
      await expect(deploy).toBeDisabled();

      for (const tab of [agents, code, terminal, deploy]) {
        const panelId = tab.getAttribute("aria-controls");
        await expect(panelId).toBeTruthy();
        await expect(tab.parentElement).toBe(tablist);
      }

      const panel = canvas.getByRole("tabpanel");
      await expect(panel.id).toBe(agents.getAttribute("aria-controls"));
      await expect(panel).toHaveAccessibleName("Visão de Agentes");
    });

    await step("renders square 32px triggers with 20px icons", async () => {
      for (const tab of [agents, code, deploy]) {
        const rect = tab.getBoundingClientRect();
        await expect(rect.width).toBe(32);
        await expect(rect.height).toBe(32);

        const icon = tab.querySelector("svg")!.getBoundingClientRect();
        await expect(icon.width).toBe(20);
        await expect(icon.height).toBe(20);
      }
    });

    await step("moves focus and selection with arrows, Home and End", async () => {
      const before = code.getBoundingClientRect();

      await userEvent.tab();
      await expect(agents).toHaveFocus();

      await userEvent.keyboard("{ArrowRight}");
      await expect(code).toHaveFocus();
      await expect(code).toHaveAttribute("aria-selected", "true");
      await expect(agents).toHaveAttribute("aria-selected", "false");

      const after = code.getBoundingClientRect();
      await expect([after.width, after.height, after.left]).toEqual([before.width, before.height, before.left]);

      await userEvent.keyboard("{End}");
      await expect(terminal).toHaveFocus();
      await expect(terminal).toHaveAttribute("aria-selected", "true");

      await userEvent.keyboard("{Home}");
      await expect(agents).toHaveFocus();

      await userEvent.keyboard("{ArrowLeft}");
      await expect(terminal).toHaveFocus();
      await expect(deploy).not.toHaveFocus();

      await userEvent.keyboard("{ArrowRight}");
      await expect(agents).toHaveFocus();
      await expect(canvas.getByRole("tabpanel")).toHaveAccessibleName("Visão de Agentes");
    });

    await step("shows the label as tooltip without duplicating it as description", async () => {
      const tooltip = await page.findByRole("tooltip");
      await expect(tooltip).toHaveTextContent("Visão de Agentes");
      await expect(agents).not.toHaveAttribute("aria-describedby");
    });

    await step("draws the focus halo over the container surface", async () => {
      await expect(agents.matches(":focus-visible")).toBe(true);
      await expectFocusHalo(agents, "--color-background");
    });

    await step("gives disabled triggers no tooltip and no hover", async () => {
      await expect(getComputedStyle(deploy).pointerEvents).toBe("none");
      // Not wrapped by TooltipTrigger: the tab keeps its own data-state.
      await expect(deploy).toHaveAttribute("data-state", "inactive");
      fireEvent.pointerMove(deploy, { pointerType: "mouse" });
      await new Promise((resolve) => setTimeout(resolve, 300));
      await expect(page.queryByText("Visão de Deploy", { selector: "[role=tooltip]" })).toBeNull();
    });
  }
};

/** The segmented track paints surface-sunken, so the halo gap uses it. */
export const IconOnlySegmented: Story = {
  render: () => (
    <TooltipProvider>
      <Tabs variant="segmented" iconOnly defaultValue="agents">
        <TabsList aria-label="Visão do painel">
          <TabsTrigger value="agents" icon={<Squares2X2Icon />} label="Visão de Agentes" />
          <TabsTrigger value="code" icon={<CodeBracketIcon />} label="Visão de Código" />
          <TabsTrigger value="terminal" icon={<CommandLineIcon />} label="Visão de Terminal" />
        </TabsList>
        <TabsContent value="agents">Agentes em execução.</TabsContent>
        <TabsContent value="code">Editor de código.</TabsContent>
        <TabsContent value="terminal">Terminal integrado.</TabsContent>
      </Tabs>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const agents = canvas.getByRole("tab", { name: "Visão de Agentes" });
    const code = canvas.getByRole("tab", { name: "Visão de Código" });
    const rectBefore = code.getBoundingClientRect();

    await userEvent.tab();
    await userEvent.keyboard("{ArrowRight}");
    await expect(code).toHaveAttribute("aria-selected", "true");
    await expect(code.getBoundingClientRect().left).toBe(rectBefore.left);

    await expect(code.matches(":focus-visible")).toBe(true);
    await expectFocusHalo(code, "--color-surface-sunken");
    await expect(agents).toHaveAttribute("aria-selected", "false");
  }
};

const overflowItems = [
  { value: "agents", icon: <Squares2X2Icon />, label: "Visão de Agentes" },
  { value: "code", icon: <CodeBracketIcon />, label: "Visão de Código" },
  { value: "terminal", icon: <CommandLineIcon />, label: "Visão de Terminal" },
  { value: "search", icon: <MagnifyingGlassIcon />, label: "Busca" },
  { value: "data", icon: <CircleStackIcon />, label: "Dados" }
];

function OverflowPanel({ theme }: { theme: "light" | "dark" }) {
  return (
    <ThemeProvider theme={theme} className="grid gap-sf-16 rounded-sf-lg border border-border p-sf-16">
      {(["segmented", "ghost"] as const).map((variant) => (
        <div key={variant} className="grid gap-sf-8">
          <span className="text-caption text-content-tertiary">
            {variant} · {theme}
          </span>
          <div className="w-[120px] bg-surface p-sf-8 [--sf-focus-gap:var(--color-surface)]">
            <TooltipProvider>
              <Tabs variant={variant} iconOnly defaultValue="agents">
                <TabsList aria-label={`Visão do painel ${variant} ${theme}`}>
                  {overflowItems.map((item) => (
                    <TabsTrigger key={item.value} value={item.value} icon={item.icon} label={item.label} />
                  ))}
                </TabsList>
                {overflowItems.map((item) => (
                  <TabsContent key={item.value} value={item.value} className="sr-only">
                    {item.label}
                  </TabsContent>
                ))}
              </Tabs>
            </TooltipProvider>
          </div>
        </div>
      ))}
    </ThemeProvider>
  );
}

/** Five triggers in a 120px container: the list scrolls and the halo stays inside the scroll box. */
export const Overflow: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sf-24">
      <OverflowPanel theme="light" />
      <OverflowPanel theme="dark" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole("tablist", { name: "Visão do painel ghost light" });
    await expect(list.scrollWidth).toBeGreaterThan(list.clientWidth);

    const tabs = within(list).getAllByRole("tab");
    await expect(tabs).toHaveLength(5);

    await userEvent.click(tabs[0]);
    await userEvent.keyboard("{End}");
    const last = tabs[4];
    await expect(last).toHaveFocus();
    await waitFor(() => expect(list.scrollLeft).toBeGreaterThan(0));

    const listRect = list.getBoundingClientRect();
    const lastRect = last.getBoundingClientRect();
    // 3px halo (1px gap + 2px ring) must fit inside the scroll box.
    await expect(lastRect.right + 3).toBeLessThanOrEqual(listRect.right);
    await expect(lastRect.top - 3).toBeGreaterThanOrEqual(listRect.top);
  }
};

/** Guards the development check: an iconOnly trigger without a label reports an error. */
export const IconOnlyMissingLabel: Story = {
  tags: ["!dev", "!autodocs"],
  beforeEach: () => {
    const spy = spyOn(console, "error").mockImplementation(() => undefined);
    return () => spy.mockRestore();
  },
  render: () => (
    <TooltipProvider>
      <Tabs variant="ghost" iconOnly defaultValue="agents">
        <TabsList aria-label="Visão do painel">
          <TabsTrigger value="agents">Agentes</TabsTrigger>
        </TabsList>
        <TabsContent value="agents">Agentes em execução.</TabsContent>
      </Tabs>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }) => {
    await waitFor(() =>
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining("without a non-empty label"))
    );
    // Falls back to a text trigger instead of an unnamed icon button.
    await expect(within(canvasElement).getByRole("tab", { name: "Agentes" })).toBeInTheDocument();
  }
};
