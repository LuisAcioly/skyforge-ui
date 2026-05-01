import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef
} from "react";

import { cn } from "../../utils/cn";

export type SelectSize = "md" | "lg";
export type SelectVariant = "outline" | "filled" | "ghost";

export interface SelectTriggerProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  containerClassName?: string;
  errorText?: string | null;
  helperText?: string | null;
  label?: string | null;
  labelClassName?: string;
  placeholder?: string;
  size?: SelectSize;
  variant?: SelectVariant;
}

export interface SelectItemProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  inset?: boolean;
}

const variantClasses: Record<SelectVariant, string> = {
  outline: "border-border bg-surface hover:border-border-strong data-[state=open]:border-border-strong",
  filled: "border-transparent bg-hover-surface hover:border-border hover:bg-active-surface data-[state=open]:border-border-strong",
  ghost: "border-transparent bg-transparent hover:border-border hover:bg-hover-surface data-[state=open]:border-border-strong"
};

const sizeClasses: Record<SelectSize, string> = {
  md: "h-sf-40 px-sf-12 text-body-sm",
  lg: "h-sf-48 px-sf-16 text-body-md"
};

const iconSizeClasses: Record<SelectSize, string> = {
  md: "h-sf-16 w-sf-16",
  lg: "h-sf-20 w-sf-20"
};

const itemClasses =
  "relative flex min-h-sf-40 cursor-pointer select-none items-center gap-sf-8 rounded-sf-sm px-sf-12 py-sf-8 pl-sf-32 font-body text-body-sm text-content-primary outline-none transition duration-sf-normal ease-sf-standard data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:text-disabled-text data-[disabled]:opacity-100 data-[highlighted]:bg-active-surface data-[highlighted]:text-content-primary data-[highlighted]:shadow-[inset_0_0_0_1px_rgb(var(--color-border-strong)_/_0.42)]";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = forwardRef<ElementRef<typeof SelectPrimitive.Trigger>, SelectTriggerProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      children,
      className,
      containerClassName,
      disabled,
      errorText,
      helperText,
      id,
      label,
      labelClassName,
      placeholder,
      size = "md",
      variant = "outline",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const triggerId = id ?? `${generatedId}-select`;
    const resolvedLabel = typeof label === "string" ? label : undefined;
    const hasLabel = resolvedLabel !== undefined;
    const resolvedHelperText = typeof helperText === "string" ? helperText : undefined;
    const hasHelperText = resolvedHelperText !== undefined;
    const resolvedErrorText = typeof errorText === "string" ? errorText : undefined;
    const hasErrorText = resolvedErrorText !== undefined;
    const helperId = hasHelperText ? `${triggerId}-helper` : undefined;
    const errorId = hasErrorText ? `${triggerId}-error` : undefined;
    const isInvalid = hasErrorText || ariaInvalid === true || ariaInvalid === "true";
    const describedBy = [ariaDescribedBy, helperId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("grid w-full gap-sf-8", containerClassName)}>
        {hasLabel ? (
          <label htmlFor={triggerId} className={cn("min-w-0 break-words text-label text-content-primary", disabled && "text-disabled-text", labelClassName)}>
            {resolvedLabel}
          </label>
        ) : null}

        <SelectPrimitive.Trigger
          ref={ref}
          id={triggerId}
          disabled={disabled}
          aria-describedby={describedBy}
          aria-invalid={isInvalid ? true : ariaInvalid}
          data-invalid={isInvalid || undefined}
          className={cn(
            "inline-flex max-w-full w-full select-none items-center justify-between gap-sf-8 rounded-sf-md border font-body text-content-primary outline-none shadow-none transition duration-sf-normal ease-sf-standard active:translate-y-px active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:translate-y-0 disabled:scale-100 disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100 data-[invalid=true]:border-error-border data-[invalid=true]:focus-visible:ring-error-icon [&>span]:truncate [&>span[data-placeholder]]:text-content-tertiary",
            variantClasses[variant],
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {children ?? <SelectPrimitive.Value placeholder={placeholder} />}
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon aria-hidden="true" className={cn("shrink-0 text-icon-secondary", iconSizeClasses[size])} strokeWidth={1.5} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        {hasHelperText ? (
          <p id={helperId} className="m-0 text-caption text-content-tertiary">
            {resolvedHelperText}
          </p>
        ) : null}

        {hasErrorText ? (
          <p id={errorId} className="m-0 text-caption text-error-text">
            {resolvedErrorText}
          </p>
        ) : null}
      </div>
    );
  }
);

SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, className, position = "popper", sideOffset = 8, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      sideOffset={sideOffset}
      className={cn(
        "sf-popover-content z-sf-modal max-w-[calc(100vw-2rem)] min-w-[var(--radix-select-trigger-width)] origin-[var(--radix-select-content-transform-origin)] overflow-hidden rounded-sf-md border border-border bg-surface-raised text-content-primary shadow-sf-2 outline-none",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex h-sf-32 cursor-default items-center justify-center text-icon-secondary">
        <ChevronUpIcon aria-hidden="true" className="h-sf-16 w-sf-16" strokeWidth={1.5} />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport className="max-h-[320px] p-sf-4">
        {children}
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex h-sf-32 cursor-default items-center justify-center text-icon-secondary">
        <ChevronDownIcon aria-hidden="true" className="h-sf-16 w-sf-16" strokeWidth={1.5} />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

SelectContent.displayName = "SelectContent";

export const SelectViewport = forwardRef<
  ElementRef<typeof SelectPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Viewport ref={ref} className={cn("max-h-[320px] p-sf-4", className)} {...props} />
));

SelectViewport.displayName = "SelectViewport";

export const SelectItem = forwardRef<ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(
  ({ children, className, inset = false, ...props }, ref) => (
    <SelectPrimitive.Item ref={ref} className={cn(itemClasses, inset && "pl-sf-40", className)} {...props}>
      <SelectPrimitive.ItemIndicator className="absolute left-sf-8 inline-flex h-sf-16 w-sf-16 items-center justify-center text-icon-accent">
        <CheckIcon aria-hidden="true" className="h-sf-16 w-sf-16" strokeWidth={1.5} />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);

SelectItem.displayName = "SelectItem";

export const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("px-sf-12 py-sf-8 font-body text-label text-content-secondary", className)} {...props} />
));

SelectLabel.displayName = "SelectLabel";

export const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("my-sf-4 h-px bg-divider", className)} {...props} />
));

SelectSeparator.displayName = "SelectSeparator";

export const SelectScrollUpButton = forwardRef<
  ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton ref={ref} className={cn("flex h-sf-32 cursor-default items-center justify-center text-icon-secondary", className)} {...props}>
    <ChevronUpIcon aria-hidden="true" className="h-sf-16 w-sf-16" strokeWidth={1.5} />
  </SelectPrimitive.ScrollUpButton>
));

SelectScrollUpButton.displayName = "SelectScrollUpButton";

export const SelectScrollDownButton = forwardRef<
  ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton ref={ref} className={cn("flex h-sf-32 cursor-default items-center justify-center text-icon-secondary", className)} {...props}>
    <ChevronDownIcon aria-hidden="true" className="h-sf-16 w-sf-16" strokeWidth={1.5} />
  </SelectPrimitive.ScrollDownButton>
));

SelectScrollDownButton.displayName = "SelectScrollDownButton";
