import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";
import {
  optionCheckboxClasses,
  optionGroupLabelClasses,
  optionInsetClasses,
  optionItemClasses,
  optionPanelClasses,
  optionRadioClasses,
  optionSeparatorClasses,
  optionShortcutClasses
} from "../../utils/optionStyles";

export type DropdownMenuTriggerVariant = "secondary" | "ghost";

export interface DropdownMenuTriggerProps extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> {
  variant?: DropdownMenuTriggerVariant;
}

export interface DropdownMenuItemProps extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  danger?: boolean;
  inset?: boolean;
}

export interface DropdownMenuCheckboxItemProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> {
  /** @deprecated The checkbox now sits in the leading slot, so labels already align. No effect. */
  inset?: boolean;
}

export interface DropdownMenuRadioItemProps extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {
  /** @deprecated The radio now sits in the leading slot, so labels already align. No effect. */
  inset?: boolean;
}

export interface DropdownMenuSubTriggerProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> {
  inset?: boolean;
}

const contentClasses = cn(
  "sf-popover-content z-sf-dropdown max-w-[calc(100vw-2rem)] min-w-[220px] origin-[var(--radix-dropdown-menu-content-transform-origin)] overflow-visible p-sf-8",
  optionPanelClasses
);

const triggerVariantClasses: Record<DropdownMenuTriggerVariant, string> = {
  secondary:
    "border-border bg-surface-raised text-secondary-foreground hover:border-border-strong hover:bg-secondary-hover data-[state=open]:border-border-strong data-[state=open]:bg-hover-surface",
  ghost:
    "border-transparent bg-transparent text-content-primary hover:border-border hover:bg-hover-surface active:border-border-strong active:bg-active-surface data-[state=open]:border-border data-[state=open]:bg-hover-surface"
};

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const DropdownMenuTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  DropdownMenuTriggerProps
>(({ className, variant = "secondary", ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      "sf-premium-control inline-flex h-sf-40 max-w-full shrink-0 select-none items-center justify-center gap-sf-8 rounded-sf-full border px-sf-16 font-body text-label outline-none transition duration-sf-slow ease-sf-standard hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:translate-y-0 disabled:scale-100 disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100",
      triggerVariantClasses[variant],
      className
    )}
    {...props}
  />
));

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ align = "start", className, sideOffset = 8, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(contentClasses, className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));

DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = forwardRef<ElementRef<typeof DropdownMenuPrimitive.Item>, DropdownMenuItemProps>(
  ({ className, danger = false, inset = false, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        optionItemClasses,
        inset && optionInsetClasses,
        danger && "text-error-text data-[highlighted]:bg-error-bg data-[highlighted]:text-error-text",
        className
      )}
      {...props}
    />
  )
);

DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ children, className, inset: _inset, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem ref={ref} className={cn(optionItemClasses, className)} {...props}>
    <span aria-hidden="true" className={optionCheckboxClasses}>
      <DropdownMenuPrimitive.ItemIndicator className="inline-flex">
        <CheckIcon className="h-sf-12 w-sf-12" strokeWidth={1.5} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ children, className, inset: _inset, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem ref={ref} className={cn(optionItemClasses, className)} {...props}>
    <span aria-hidden="true" className={optionRadioClasses}>
      <DropdownMenuPrimitive.ItemIndicator className="block h-sf-8 w-sf-8 rounded-sf-full bg-primary" />
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

export const DropdownMenuLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(optionGroupLabelClasses, className)}
    {...props}
  />
));

DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cn(optionSeparatorClasses, className)} {...props} />
));

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ children, className, inset = false, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(optionItemClasses, inset && optionInsetClasses, "data-[state=open]:bg-option-highlight", className)}
    {...props}
  >
    {children}
    <ChevronRightIcon aria-hidden="true" className="ml-auto h-sf-16 w-sf-16 text-icon-tertiary" strokeWidth={1.5} />
  </DropdownMenuPrimitive.SubTrigger>
));

DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export const DropdownMenuSubContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    sideOffset={sideOffset}
    className={cn(contentClasses, className)}
    {...props}
  />
));

DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

export const DropdownMenuShortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn(optionShortcutClasses, className)} {...props} />
);

DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
