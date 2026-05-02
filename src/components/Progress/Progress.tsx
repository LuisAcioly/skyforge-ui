import * as ProgressPrimitive from "@radix-ui/react-progress";
import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementRef
} from "react";

import { cn } from "../../utils/cn";

export type ProgressSize = "sm" | "md" | "lg";
export type ProgressTone = "primary" | "success" | "warning" | "error";

export interface ProgressProps extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  containerClassName?: string;
  helperText?: string | null;
  label?: string | null;
  showValue?: boolean;
  size?: ProgressSize;
  tone?: ProgressTone;
  valueFormatter?: (value: number, max: number) => string;
}

const sizeClasses: Record<ProgressSize, string> = {
  sm: "h-sf-4",
  md: "h-sf-8",
  lg: "h-sf-12"
};

const toneClasses: Record<ProgressTone, string> = {
  primary: "bg-primary",
  success: "bg-success-icon",
  warning: "bg-warning-icon",
  error: "bg-error-icon"
};

function normalizeMax(max: number | undefined) {
  return typeof max === "number" && Number.isFinite(max) && max > 0 ? max : 100;
}

function normalizeValue(value: number | null | undefined, max: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  return Math.min(Math.max(value, 0), max);
}

function formatProgressValue(value: number | null, max: number, valueFormatter?: (value: number, max: number) => string) {
  if (value === null) {
    return "In progress";
  }

  if (valueFormatter) {
    return valueFormatter(value, max);
  }

  return `${Math.round((value / max) * 100)}%`;
}

export const Progress = forwardRef<ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-labelledby": ariaLabelledBy,
      className,
      containerClassName,
      helperText,
      id,
      label,
      max,
      showValue = false,
      size = "md",
      tone = "primary",
      value,
      valueFormatter,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const progressId = id ?? `${generatedId}-progress`;
    const resolvedLabel = typeof label === "string" ? label : undefined;
    const hasLabel = resolvedLabel !== undefined;
    const resolvedHelperText = typeof helperText === "string" ? helperText : undefined;
    const hasHelperText = resolvedHelperText !== undefined;
    const labelId = hasLabel ? `${progressId}-label` : undefined;
    const helperId = hasHelperText ? `${progressId}-helper` : undefined;
    const describedBy = [ariaDescribedBy, helperId].filter(Boolean).join(" ") || undefined;
    const labelledBy = [ariaLabelledBy, labelId].filter(Boolean).join(" ") || undefined;
    const normalizedMax = normalizeMax(max);
    const normalizedValue = normalizeValue(value, normalizedMax);
    const percentage = normalizedValue === null ? 42 : (normalizedValue / normalizedMax) * 100;
    const indicatorStyle = {
      transform: `translateX(-${100 - percentage}%)`
    } satisfies CSSProperties;
    const formattedValue = formatProgressValue(normalizedValue, normalizedMax, valueFormatter);

    return (
      <div className={cn("grid gap-sf-8", containerClassName)}>
        {hasLabel || showValue ? (
          <div className="flex min-w-0 items-end justify-between gap-sf-12">
            {hasLabel ? (
              <span id={labelId} className="min-w-0 truncate text-label text-content-primary">
                {resolvedLabel}
              </span>
            ) : null}
            {showValue ? <span className="shrink-0 text-caption text-content-tertiary">{formattedValue}</span> : null}
          </div>
        ) : null}

        <ProgressPrimitive.Root
          ref={ref}
          id={progressId}
          value={normalizedValue}
          max={normalizedMax}
          aria-describedby={describedBy}
          aria-labelledby={labelledBy}
          className={cn(
            "sf-premium-control relative w-full overflow-hidden rounded-sf-full bg-surface-sunken ring-1 ring-inset ring-border",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(
              "h-full w-full rounded-sf-full transition-transform duration-sf-slow ease-sf-standard will-change-transform data-[state=indeterminate]:animate-pulse",
              toneClasses[tone]
            )}
            style={indicatorStyle}
          />
        </ProgressPrimitive.Root>

        {hasHelperText ? (
          <p id={helperId} className="m-0 text-caption text-content-tertiary">
            {resolvedHelperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Progress.displayName = "Progress";
