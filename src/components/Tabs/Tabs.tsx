import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
  type ElementRef
} from "react";

import { cn } from "../../utils/cn";

export type TabsVariant = "underline" | "segmented" | "rail";

export interface TabsProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: TabsVariant;
}

export interface TabsListProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  fullWidth?: boolean;
}

const TabsVariantContext = createContext<TabsVariant>("underline");

const listClasses: Record<TabsVariant, string> = {
  underline: "flex h-sf-40 items-end gap-sf-4 border-b border-divider",
  segmented:
    "inline-flex max-w-full min-h-sf-40 items-center gap-sf-4 overflow-x-auto rounded-sf-md border border-border bg-surface-sunken p-sf-4",
  rail: "flex flex-col gap-sf-4 border-l border-divider pl-sf-4"
};

const triggerClasses: Record<TabsVariant, string> = {
  underline:
    "!rounded-none border-b-2 border-transparent bg-transparent hover:bg-hover-surface hover:text-content-primary data-[state=active]:border-primary data-[state=active]:text-content-primary data-[state=active]:hover:bg-transparent",
  segmented:
    "h-sf-32 rounded-sf-sm bg-transparent px-sf-12 hover:bg-hover-surface hover:text-content-primary data-[state=active]:bg-surface-raised data-[state=active]:text-content-primary data-[state=active]:shadow-[inset_0_1px_0_rgb(var(--color-border)_/_0.45)]",
  rail:
    "w-full justify-start border border-transparent bg-transparent text-left hover:border-border hover:bg-hover-surface hover:text-content-primary data-[state=active]:border-border-strong data-[state=active]:bg-surface data-[state=active]:text-content-primary"
};

export const Tabs = forwardRef<ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ className, variant = "underline", ...props }, ref) => (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root ref={ref} className={cn("w-full", className)} {...props} />
    </TabsVariantContext.Provider>
  )
);

Tabs.displayName = "Tabs";

export const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, fullWidth, ...props }, ref) => {
    const variant = useContext(TabsVariantContext);

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

export const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const variant = useContext(TabsVariantContext);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex h-sf-40 shrink-0 select-none items-center justify-center rounded-sf-md px-sf-12 font-body text-label text-content-secondary outline-none transition duration-sf-normal ease-sf-standard active:translate-y-px focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:translate-y-0 disabled:text-disabled-text disabled:opacity-100 data-[state=active]:translate-y-0",
        triggerClasses[variant],
        className
      )}
      {...props}
    />
  );
});

TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-sf-16 rounded-sf-lg border border-border bg-surface p-sf-16 text-body-sm text-content-secondary outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className
    )}
    {...props}
  />
));

TabsContent.displayName = "TabsContent";
