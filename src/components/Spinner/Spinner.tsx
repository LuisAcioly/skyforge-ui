import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

export type SpinnerSize = "sm" | "md" | "lg";
export type SpinnerTone = "primary" | "secondary" | "inverse";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string | null;
  size?: SpinnerSize;
  tone?: SpinnerTone;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "h-sf-16 w-sf-16 border",
  md: "h-sf-20 w-sf-20 border",
  lg: "h-sf-32 w-sf-32 border-2"
};

const toneClasses: Record<SpinnerTone, string> = {
  primary: "text-icon-accent",
  secondary: "text-icon-secondary",
  inverse: "text-icon-inverse"
};

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, label = "Loading", role, size = "md", tone = "secondary", ...props }, ref) => {
    const resolvedLabel = typeof label === "string" ? label : undefined;

    return (
      <span
        ref={ref}
        role={resolvedLabel ? (role ?? "status") : undefined}
        aria-label={resolvedLabel}
        aria-hidden={resolvedLabel ? undefined : true}
        className={cn("inline-flex shrink-0 animate-spin rounded-sf-full border-current border-t-transparent", sizeClasses[size], toneClasses[tone], className)}
        {...props}
      />
    );
  }
);

Spinner.displayName = "Spinner";
