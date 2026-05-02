import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode
} from "react";

import { cn } from "../../utils/cn";

export type RadioSize = "sm" | "md";

export interface RadioGroupProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  fullWidth?: boolean;
}

export interface RadioProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  containerClassName?: string;
  helperText?: string | null;
  label?: ReactNode;
  labelClassName?: string;
  size?: RadioSize;
}

const itemSizeClasses: Record<RadioSize, string> = {
  sm: "h-sf-16 w-sf-16",
  md: "h-sf-20 w-sf-20"
};

const indicatorSizeClasses: Record<RadioSize, string> = {
  sm: "h-sf-8 w-sf-8",
  md: "h-sf-8 w-sf-8"
};

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  ({ className, fullWidth = false, orientation = "vertical", ...props }, ref) => (
    <RadioGroupPrimitive.Root
      ref={ref}
      orientation={orientation}
      className={cn(
        orientation === "horizontal" ? "flex flex-wrap items-start gap-sf-16" : "grid gap-sf-12",
        fullWidth && "w-full",
        className
      )}
      {...props}
    />
  )
);

RadioGroup.displayName = "RadioGroup";

export const Radio = forwardRef<ElementRef<typeof RadioGroupPrimitive.Item>, RadioProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      className,
      containerClassName,
      disabled,
      helperText,
      id,
      label,
      labelClassName,
      size = "md",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const radioId = id ?? `${generatedId}-radio`;
    const resolvedHelperText = typeof helperText === "string" ? helperText : undefined;
    const hasHelperText = resolvedHelperText !== undefined;
    const helperId = hasHelperText ? `${radioId}-helper` : undefined;
    const describedBy = [ariaDescribedBy, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("flex items-start gap-sf-12", containerClassName)}>
        <RadioGroupPrimitive.Item
          ref={ref}
          id={radioId}
          disabled={disabled}
          aria-describedby={describedBy}
          className={cn(
            "sf-premium-control inline-flex shrink-0 select-none items-center justify-center rounded-sf-full border border-border bg-surface-raised outline-none transition duration-sf-slow ease-sf-standard hover:-translate-y-px hover:border-border-strong hover:bg-hover-surface active:translate-y-0 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:translate-y-0 disabled:border-disabled-border disabled:bg-disabled-bg disabled:opacity-100 data-[state=checked]:border-primary data-[state=checked]:bg-surface-raised",
            itemSizeClasses[size],
            className
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="inline-flex items-center justify-center">
            <span className={cn("block rounded-sf-full bg-primary", indicatorSizeClasses[size])} />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>

        {label || hasHelperText ? (
          <div className="min-w-0 pt-[1px]">
            {label ? (
              <label
                htmlFor={radioId}
                className={cn(
                  "block cursor-pointer select-none break-words text-label text-content-primary",
                  disabled && "cursor-not-allowed text-disabled-text",
                  labelClassName
                )}
              >
                {label}
              </label>
            ) : null}
            {hasHelperText ? (
              <p id={helperId} className="m-0 mt-sf-4 text-caption text-content-tertiary">
                {resolvedHelperText}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);

Radio.displayName = "Radio";
