import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "@heroicons/react/24/outline";
import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode
} from "react";

import { cn } from "../../utils/cn";

export type CheckboxSize = "sm" | "md";

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  containerClassName?: string;
  errorText?: ReactNode;
  helperText?: ReactNode;
  label?: ReactNode;
  labelClassName?: string;
  size?: CheckboxSize;
}

const sizeClasses: Record<CheckboxSize, string> = {
  sm: "h-sf-16 w-sf-16",
  md: "h-sf-20 w-sf-20"
};

const iconSizeClasses: Record<CheckboxSize, string> = {
  sm: "h-sf-12 w-sf-12",
  md: "h-sf-16 w-sf-16"
};

export const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      className,
      containerClassName,
      disabled,
      errorText,
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
    const checkboxId = id ?? `${generatedId}-checkbox`;
    const helperId = helperText ? `${checkboxId}-helper` : undefined;
    const errorId = errorText ? `${checkboxId}-error` : undefined;
    const isInvalid = Boolean(errorText) || ariaInvalid === true || ariaInvalid === "true";
    const describedBy = [ariaDescribedBy, helperId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("grid gap-sf-8", containerClassName)}>
        <div className="flex items-start gap-sf-12">
          <CheckboxPrimitive.Root
            ref={ref}
            id={checkboxId}
            disabled={disabled}
            aria-describedby={describedBy}
            aria-invalid={isInvalid ? true : ariaInvalid}
            data-invalid={isInvalid || undefined}
            className={cn(
              "inline-flex shrink-0 select-none items-center justify-center rounded-sf-sm border border-border bg-surface text-primary-foreground outline-none shadow-none transition duration-sf-normal ease-sf-standard hover:border-border-strong hover:bg-hover-surface active:translate-y-px active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100 data-[invalid=true]:border-error-border data-[invalid=true]:focus-visible:ring-error-icon data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
              sizeClasses[size],
              className
            )}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="group inline-flex items-center justify-center text-current">
              <CheckIcon
                aria-hidden="true"
                className={cn(iconSizeClasses[size], "group-data-[state=indeterminate]:hidden")}
                strokeWidth={1.5}
              />
              <MinusIcon
                aria-hidden="true"
                className={cn("hidden", iconSizeClasses[size], "group-data-[state=indeterminate]:block")}
                strokeWidth={1.5}
              />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>

          {label || helperText || errorText ? (
            <div className="min-w-0 pt-[1px]">
              {label ? (
                <label
                  htmlFor={checkboxId}
                  className={cn(
                    "block cursor-pointer select-none text-label text-content-primary",
                    disabled && "cursor-not-allowed text-disabled-text",
                    labelClassName
                  )}
                >
                  {label}
                </label>
              ) : null}
              {helperText ? (
                <p id={helperId} className="m-0 mt-sf-4 text-caption text-content-tertiary">
                  {helperText}
                </p>
              ) : null}
              {errorText ? (
                <p id={errorId} className="m-0 mt-sf-4 text-caption text-error-text">
                  {errorText}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
