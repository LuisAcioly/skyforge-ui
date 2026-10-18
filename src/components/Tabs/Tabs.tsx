import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode
} from "react";

import { cn } from "../../utils/cn";
import { devError } from "../../utils/devWarning";
import { normalizeIcon } from "../../utils/icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip/Tooltip";

export type TabsVariant = "underline" | "segmented" | "rail" | "ghost";
/**
 * Selected-trigger treatment for `segmented` and `rail`: `solid` (default)
 * fills it with charcoal (neutral-solid); `soft` is the tinted accent surface.
 * `underline` and `ghost` ignore it.
 */
export type TabsAppearance = "soft" | "solid";

export interface TabsProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  appearance?: TabsAppearance;
  variant?: TabsVariant;
  /**
   * Renders every trigger as a 32×32 icon button whose `label` becomes the
   * accessible name and the tooltip. Requires a `TooltipProvider` ancestor.
   * Sized for pointer-driven desktop surfaces, not as a touch target.
   */
  iconOnly?: boolean;
}

export interface TabsListProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  fullWidth?: boolean;
}

type TabsTriggerBaseProps = Omit<ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, "children"> & {
  /**
   * Unread or pending items, shown in an accent badge (99+ above 99). Hidden at
   * 0. Icon-only triggers carry it on the icon's corner; others after the text.
   */
  count?: number;
  /** A dot for "something new" without a number. `count` wins when both are set. */
  dot?: boolean;
  /**
   * What the badge means, appended to the accessible name (for example
   * "3 novidades"). Defaults to the count; a `dot` without it is only visual.
   */
  badgeLabel?: string;
};

/**
 * A trigger is driven either by `label` (text, accessible name and tooltip) or
 * by `children`. A trigger without children must carry a `label`, so an icon
 * never ships without a name.
 */
export type TabsTriggerProps = TabsTriggerBaseProps &
  (
    | { label: string; icon?: ReactNode; children?: never }
    | { children: ReactNode; icon?: ReactNode; label?: never }
  );

interface TabsContextValue {
  appearance: TabsAppearance;
  variant: TabsVariant;
  iconOnly: boolean;
}

const TabsContext = createContext<TabsContextValue>({ appearance: "solid", variant: "underline", iconOnly: false });

const listClasses: Record<TabsVariant, string> = {
  underline: "flex h-sf-40 items-end gap-sf-4 border-b border-divider",
  // The focus halo gap matches the sunken track the triggers sit on.
  segmented:
    "sf-premium-control inline-flex max-w-full min-h-sf-40 items-center gap-sf-4 overflow-x-auto scroll-px-sf-4 rounded-sf-lg border border-border bg-surface-sunken p-sf-4 [--sf-focus-gap:var(--color-surface-sunken)]",
  rail: "flex flex-col gap-sf-4 border-l border-divider pl-sf-4",
  // No track, border or visible padding. The padding/negative-margin pair only
  // reserves room inside the scroll container so overflow does not clip the
  // focus halo (scroll padding keeps it clear when focus scrolls an item into
  // view); the halo gap inherits the surface of the surrounding container.
  ghost:
    "-m-sf-4 inline-flex max-w-[calc(100%_+_var(--space-8))] items-center gap-sf-4 overflow-x-auto scroll-px-sf-4 bg-transparent p-sf-4"
};

// Selection reads from aria-selected, not data-state: when a trigger is wrapped
// by TooltipTrigger, the tooltip's own data-state replaces the tab's.
const triggerToneClasses: Record<TabsVariant, string> = {
  underline:
    "!rounded-none border-b-2 border-transparent bg-transparent hover:bg-hover-surface hover:text-content-primary aria-selected:border-primary aria-selected:text-content-primary aria-selected:hover:bg-transparent",
  segmented:
    "border border-transparent bg-transparent hover:bg-hover-surface hover:text-content-primary aria-selected:border-accent-border aria-selected:bg-accent-bg aria-selected:text-accent-text aria-selected:hover:bg-accent-bg aria-selected:hover:text-accent-text",
  rail:
    "border border-transparent bg-transparent hover:border-border hover:bg-hover-surface hover:text-content-primary aria-selected:border-accent-border aria-selected:bg-accent-bg aria-selected:text-accent-text",
  // Selection is sunken with primary text and icon; hover-surface can equal
  // sunken (light theme), so hover reads from the lighter hover-subtle.
  ghost:
    "border border-transparent bg-transparent hover:bg-hover-subtle hover:text-content-primary aria-selected:bg-surface-sunken aria-selected:text-content-primary aria-selected:hover:bg-surface-sunken"
};

// Weight stays put on selection so the solid fill does not shift the row's width.
const solidTriggerToneClasses: Partial<Record<TabsVariant, string>> = {
  segmented:
    "border border-transparent bg-transparent hover:bg-hover-surface hover:text-content-primary aria-selected:bg-neutral-solid aria-selected:text-on-solid aria-selected:hover:bg-neutral-solid aria-selected:hover:text-on-solid",
  rail: "border border-transparent bg-transparent hover:bg-hover-surface hover:text-content-primary aria-selected:bg-neutral-solid aria-selected:text-on-solid aria-selected:hover:bg-neutral-solid aria-selected:hover:text-on-solid"
};

const triggerLayoutClasses: Record<TabsVariant, string> = {
  underline: "h-sf-40 gap-sf-8 px-sf-12",
  segmented: "h-sf-40 gap-sf-8 px-sf-12",
  rail: "h-sf-40 w-full justify-start gap-sf-8 px-sf-12 text-left",
  ghost: "h-sf-40 gap-sf-8 px-sf-12"
};

const iconOnlyLayoutClasses = "h-control-sm w-control-sm min-w-control-sm p-0";

// The badge sits on the icon's corner, so a 2px ring of the surface behind the
// trigger separates them; on a solid selected fill the ring takes the fill.
const badgeRingClasses = "shadow-[0_0_0_2px_rgb(var(--sf-focus-gap,var(--color-background)))]";
const solidSelectedBadgeRingClasses = "group-aria-selected:shadow-[0_0_0_2px_rgb(var(--color-neutral-solid))]";

function formatCount(count: number) {
  return count > 99 ? "99+" : String(count);
}

export const Tabs = forwardRef<ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ appearance = "solid", className, iconOnly = false, variant = "underline", ...props }, ref) => (
    <TabsContext.Provider value={{ appearance, variant, iconOnly }}>
      <TabsPrimitive.Root ref={ref} data-appearance={appearance} className={cn("w-full", className)} {...props} />
    </TabsContext.Provider>
  )
);

Tabs.displayName = "Tabs";

export const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, fullWidth, ...props }, ref) => {
    const { variant } = useContext(TabsContext);

    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn(listClasses[variant], fullWidth && "w-full", className)}
        {...props}
      />
    );
  }
);

TabsList.displayName = "TabsList";

export const TabsTrigger = forwardRef<ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  ({ badgeLabel, children, className, count, dot = false, icon, label, ...props }, ref) => {
    const { appearance, variant, iconOnly } = useContext(TabsContext);
    const solidTone = appearance === "solid" ? solidTriggerToneClasses[variant] : undefined;
    const toneClasses = solidTone ?? triggerToneClasses[variant];
    const hasLabel = typeof label === "string" && label.trim() !== "";
    const hasIcon = icon !== null && icon !== undefined && icon !== false;
    const renderIconOnly = iconOnly && hasLabel && hasIcon;
    const hasCount = typeof count === "number" && count > 0;
    const showDot = !hasCount && dot;
    const countText = hasCount ? formatCount(count) : undefined;
    const badgeText = badgeLabel ?? countText;
    const ringClasses = cn(badgeRingClasses, solidTone && solidSelectedBadgeRingClasses);

    useEffect(() => {
      if (!iconOnly || renderIconOnly) {
        return;
      }

      devError(
        hasLabel
          ? `TabsTrigger "${props.value}" is inside an iconOnly Tabs but has no icon. It renders its label as text.`
          : `TabsTrigger "${props.value}" is inside an iconOnly Tabs without a non-empty label. Icon-only triggers need a label for their accessible name and tooltip.`
      );
    }, [iconOnly, renderIconOnly, hasLabel, props.value]);

    const iconClasses = "inline-flex shrink-0 text-current";

    const trigger = (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          "group relative inline-flex max-w-full shrink-0 select-none items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded-sf-md font-body text-label text-content-secondary outline-none transition duration-sf-slow ease-sf-standard hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 focus-visible:ring-offset-focus-gap disabled:pointer-events-none disabled:cursor-not-allowed disabled:translate-y-0 disabled:text-disabled-text disabled:opacity-100 aria-selected:translate-y-0",
          toneClasses,
          renderIconOnly ? iconOnlyLayoutClasses : triggerLayoutClasses[variant],
          className
        )}
        {...props}
        {...(renderIconOnly
          ? {
              "aria-label": badgeText ? `${label}, ${badgeText}` : label,
              // Explicit key so the tooltip does not also describe the trigger
              // with the text that is already its name.
              "aria-describedby": props["aria-describedby"]
            }
          : null)}
      >
        {renderIconOnly ? (
          <>
            <span aria-hidden="true" className={iconClasses}>
              {normalizeIcon(icon, "h-sf-20 w-sf-20")}
            </span>
            {hasCount ? (
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute right-0 top-0 inline-flex h-sf-16 min-w-[16px] items-center justify-center rounded-sf-full bg-accent-solid px-[4px] text-[10px] font-bold leading-none tabular-nums text-on-solid",
                  ringClasses
                )}
              >
                {countText}
              </span>
            ) : showDot ? (
              <span
                aria-hidden="true"
                className={cn("pointer-events-none absolute right-[5px] top-[5px] h-[7px] w-[7px] rounded-sf-full bg-accent-solid", ringClasses)}
              />
            ) : null}
          </>
        ) : (
          <>
            {hasIcon ? (
              <span aria-hidden="true" className={iconClasses}>
                {normalizeIcon(icon, "h-sf-16 w-sf-16")}
              </span>
            ) : null}
            {label !== undefined ? <span className="min-w-0 truncate">{label}</span> : children}
            {hasCount ? (
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex h-[20px] min-w-[20px] shrink-0 items-center justify-center rounded-sf-full bg-accent-solid px-[6px] text-label-sm font-semibold leading-none tabular-nums text-on-solid",
                  variant === "rail" && "ml-auto"
                )}
              >
                {countText}
              </span>
            ) : showDot ? (
              <span
                aria-hidden="true"
                className={cn("h-sf-8 w-sf-8 shrink-0 rounded-sf-full bg-accent-solid", variant === "rail" && "ml-auto")}
              />
            ) : null}
            {badgeText ? <span className="sr-only">{`, ${badgeText}`}</span> : null}
          </>
        )}
      </TabsPrimitive.Trigger>
    );

    if (!renderIconOnly || props.disabled) {
      return trigger;
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-sf-16 min-w-0 text-body-sm text-content-secondary outline-none focus-visible:rounded-sf-md focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className
    )}
    {...props}
  />
));

TabsContent.displayName = "TabsContent";
