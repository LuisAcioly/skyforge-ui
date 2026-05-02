import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
  type ElementRef
} from "react";

import { cn } from "../../utils/cn";

export type AccordionVariant = "outline" | "ghost";

type AccordionRootProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;

export type AccordionProps = AccordionRootProps & {
  variant?: AccordionVariant;
};

const AccordionVariantContext = createContext<AccordionVariant>("outline");

const itemClasses: Record<AccordionVariant, string> = {
  outline: "sf-premium-surface border-border bg-surface-raised",
  ghost: "border-transparent bg-transparent data-[state=open]:border-border data-[state=open]:bg-surface-raised"
};

export const Accordion = forwardRef<ElementRef<typeof AccordionPrimitive.Root>, AccordionProps>(
  ({ className, variant = "outline", ...props }, ref) => {
    const rootProps = props as AccordionRootProps;

    return (
      <AccordionVariantContext.Provider value={variant}>
        <AccordionPrimitive.Root ref={ref} className={cn("grid w-full gap-sf-8", className)} {...rootProps} />
      </AccordionVariantContext.Provider>
    );
  }
);

Accordion.displayName = "Accordion";

export const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const variant = useContext(AccordionVariantContext);

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        "overflow-hidden rounded-sf-xl border text-content-primary transition duration-sf-slow ease-sf-standard data-[state=open]:border-border-strong",
        itemClasses[variant],
        className
      )}
      {...props}
    />
  );
});

AccordionItem.displayName = "AccordionItem";

export const AccordionHeader = forwardRef<
  ElementRef<typeof AccordionPrimitive.Header>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Header ref={ref} className={cn("m-0 flex", className)} {...props} />
));

AccordionHeader.displayName = "AccordionHeader";

export const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Trigger
    ref={ref}
    className={cn(
      "group flex min-h-sf-48 w-full select-none items-center justify-between gap-sf-16 px-sf-16 py-sf-12 text-left font-body text-label tracking-[0.01em] text-content-primary outline-none transition duration-sf-slow ease-sf-standard hover:bg-hover-surface focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:text-disabled-text disabled:opacity-100 data-[state=open]:bg-hover-surface",
      className
    )}
    {...props}
  >
    <span className="min-w-0 flex-1 truncate pb-[1px] leading-normal">{children}</span>
    <ChevronDownIcon
      aria-hidden="true"
      className="h-sf-16 w-sf-16 shrink-0 text-icon-secondary transition-transform duration-sf-slow ease-sf-standard group-data-[state=open]:rotate-180"
      strokeWidth={1.5}
    />
  </AccordionPrimitive.Trigger>
));

AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn("sf-accordion-content overflow-hidden text-body-sm text-content-secondary", className)}
    {...props}
  >
    <div className="px-sf-16 pb-sf-16 pt-sf-4">{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = "AccordionContent";
