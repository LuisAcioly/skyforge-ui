import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

export interface DropdownMenuItemProps extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  danger?: boolean;
  inset?: boolean;
}

export interface DropdownMenuCheckboxItemProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> {
  inset?: boolean;
}

export interface DropdownMenuRadioItemProps extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {
  inset?: boolean;
}

export interface DropdownMenuSubTriggerProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> {
  inset?: boolean;
}

const contentClasses =
  "sf-popover-content z-sf-modal max-w-[calc(100vw-2rem)] min-w-[220px] origin-[var(--radix-dropdown-menu-content-transform-origin)] overflow-visible rounded-sf-md border border-border bg-surface-raised p-sf-4 text-content-primary shadow-sf-2 outline-none";

const itemClasses =
  "relative flex min-h-sf-40 cursor-pointer select-none items-center gap-sf-8 rounded-sf-sm px-sf-12 py-sf-8 font-body text-body-sm text-content-primary outline-none transition duration-sf-normal ease-sf-standard data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:text-disabled-text data-[disabled]:opacity-100 data-[highlighted]:bg-active-surface data-[highlighted]:text-content-primary data-[highlighted]:shadow-[inset_0_0_0_1px_rgb(var(--color-border-strong)_/_0.42)]";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const DropdownMenuTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex h-sf-40 max-w-full shrink-0 select-none items-center justify-center gap-sf-8 rounded-sf-md border border-border bg-secondary px-sf-16 font-body text-label text-secondary-foreground outline-none shadow-none transition duration-sf-normal ease-sf-standard hover:border-border-strong hover:bg-secondary-hover active:translate-y-px active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:translate-y-0 disabled:scale-100 disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100 data-[state=open]:border-border-strong data-[state=open]:bg-hover-surface",
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
        itemClasses,
        inset && "pl-sf-32",
        danger && "text-error-text data-[highlighted]:bg-error-bg data-[highlighted]:text-error-text data-[highlighted]:shadow-[inset_0_0_0_1px_rgb(var(--color-error-border)_/_0.72)]",
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
>(({ children, className, inset = false, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(itemClasses, "pl-sf-32", inset && "pl-sf-40", className)}
    {...props}
  >
    <DropdownMenuPrimitive.ItemIndicator className="absolute left-sf-8 inline-flex h-sf-16 w-sf-16 items-center justify-center text-icon-accent">
      <CheckIcon aria-hidden="true" className="h-sf-16 w-sf-16" strokeWidth={1.5} />
    </DropdownMenuPrimitive.ItemIndicator>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ children, className, inset = false, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(itemClasses, "pl-sf-32", inset && "pl-sf-40", className)}
    {...props}
  >
    <DropdownMenuPrimitive.ItemIndicator className="absolute left-sf-12 inline-flex h-sf-8 w-sf-8 items-center justify-center rounded-sf-full bg-primary" />
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
    className={cn("px-sf-12 py-sf-8 font-body text-label text-content-secondary", className)}
    {...props}
  />
));

DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cn("my-sf-4 h-px bg-divider", className)} {...props} />
));

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ children, className, inset = false, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(itemClasses, inset && "pl-sf-32", "data-[state=open]:bg-active-surface", className)}
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
  <span className={cn("ml-auto pl-sf-24 text-caption text-content-tertiary", className)} {...props} />
);

DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
