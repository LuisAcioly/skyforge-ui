import * as SwitchPrimitive from "@radix-ui/react-switch";
import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef
} from "react";

import { cn } from "../../utils/cn";

export type SwitchSize = "sm" | "md";

export interface SwitchProps extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  containerClassName?: string;
  errorText?: string | null;
  helperText?: string | null;
  label?: string | null;
  labelClassName?: string;
  size?: SwitchSize;
}

const rootSizeClasses: Record<SwitchSize, string> = {
  sm: "h-sf-20 w-sf-40 p-[2px]",
  md: "h-sf-24 w-sf-48 p-[2px]"
};

const thumbSizeClasses: Record<SwitchSize, string> = {
  sm: "h-sf-16 w-sf-16 data-[state=checked]:translate-x-sf-20",
  md: "h-sf-20 w-sf-20 data-[state=checked]:translate-x-sf-24"
};

export const Switch = forwardRef<ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
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
    const switchId = id ?? `${generatedId}-switch`;
    const resolvedLabel = typeof label === "string" ? label : undefined;
    const hasLabel = resolvedLabel !== undefined;
    const resolvedHelperText = typeof helperText === "string" ? helperText : undefined;
    const hasHelperText = resolvedHelperText !== undefined;
    const resolvedErrorText = typeof errorText === "string" ? errorText : undefined;
    const hasErrorText = resolvedErrorText !== undefined;
    const helperId = hasHelperText ? `${switchId}-helper` : undefined;
    const errorId = hasErrorText ? `${switchId}-error` : undefined;
    const isInvalid = hasErrorText || ariaInvalid === true || ariaInvalid === "true";
    const describedBy = [ariaDescribedBy, helperId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("grid gap-sf-8", containerClassName)}>
        <div className="flex items-start gap-sf-12">
          <SwitchPrimitive.Root
            ref={ref}
            id={switchId}
            disabled={disabled}
            aria-describedby={describedBy}
            aria-invalid={isInvalid ? true : ariaInvalid}
            data-invalid={isInvalid || undefined}
            className={cn(
              "inline-flex shrink-0 cursor-pointer select-none items-center rounded-sf-full border border-border bg-surface-sunken outline-none shadow-none transition duration-sf-normal ease-sf-standard hover:border-border-strong hover:bg-hover-surface active:translate-y-px active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:translate-y-0 disabled:scale-100 disabled:border-disabled-border disabled:bg-disabled-bg disabled:opacity-100 data-[invalid=true]:border-error-border data-[invalid=true]:focus-visible:ring-error-icon data-[state=checked]:border-primary data-[state=checked]:bg-primary",
              rootSizeClasses[size],
              className
            )}
            {...props}
          >
            <SwitchPrimitive.Thumb
              className={cn(
                "block rounded-sf-full bg-surface-raised shadow-[0_1px_2px_rgb(var(--color-surface-inverse)_/_0.16)] transition duration-sf-normal ease-sf-standard data-[state=checked]:bg-primary-foreground",
                thumbSizeClasses[size]
              )}
            />
          </SwitchPrimitive.Root>

          {hasLabel || hasHelperText || hasErrorText ? (
            <div className="min-w-0 pt-[1px]">
              {hasLabel ? (
                <label
                  htmlFor={switchId}
                  className={cn(
                    "block cursor-pointer select-none text-label text-content-primary",
                    disabled && "cursor-not-allowed text-disabled-text",
                    labelClassName
                  )}
                >
                  {resolvedLabel}
                </label>
              ) : null}
              {hasHelperText ? (
                <p id={helperId} className="m-0 mt-sf-4 text-caption text-content-tertiary">
                  {resolvedHelperText}
                </p>
              ) : null}
              {hasErrorText ? (
                <p id={errorId} className="m-0 mt-sf-4 text-caption text-error-text">
                  {resolvedErrorText}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

Switch.displayName = "Switch";
