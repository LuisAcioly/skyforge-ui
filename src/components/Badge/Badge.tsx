import {
  cloneElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode
} from "react";

import { cn } from "../../utils/cn";

export type BadgeVariant = "neutral" | "accent" | "info" | "success" | "warning" | "error";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  dot?: boolean;
  icon?: ReactNode;
  size?: BadgeSize;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "border-border bg-surface-raised text-content-secondary",
  accent: "border-primary/30 bg-primary/10 text-content-primary",
  info: "border-info-border bg-info-bg text-info-text",
  success: "border-success-border bg-success-bg text-success-text",
  warning: "border-warning-border bg-warning-bg text-warning-text",
  error: "border-error-border bg-error-bg text-error-text"
};

const iconClasses: Record<BadgeVariant, string> = {
  neutral: "text-icon-secondary",
  accent: "text-icon-accent",
  info: "text-info-icon",
  success: "text-success-icon",
  warning: "text-warning-icon",
  error: "text-error-icon"
};

const dotClasses: Record<BadgeVariant, string> = {
  neutral: "bg-icon-secondary",
  accent: "bg-icon-accent",
  info: "bg-info-icon",
  success: "bg-success-icon",
  warning: "bg-warning-icon",
  error: "bg-error-icon"
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "h-[var(--component-badge-height-sm)] gap-sf-4 px-sf-8 text-label-sm",
  md: "h-[var(--component-badge-height-md)] gap-sf-4 px-sf-8 text-label"
};

const iconSizeClasses: Record<BadgeSize, string> = {
  sm: "h-sf-12 w-sf-12",
  md: "h-sf-16 w-sf-16"
};

const dotSizeClasses: Record<BadgeSize, string> = {
  sm: "h-sf-4 w-sf-4",
  md: "h-sf-8 w-sf-8"
};

function renderBadgeIcon(icon: ReactNode, size: BadgeSize, variant: BadgeVariant) {
  if (!icon) {
    return null;
  }

  const normalizedIcon = isValidElement<{ className?: string; strokeWidth?: number | string }>(icon)
    ? cloneElement(icon as ReactElement<{ className?: string; strokeWidth?: number | string }>, {
        className: cn(iconSizeClasses[size], iconClasses[variant], icon.props.className),
        strokeWidth: icon.props.strokeWidth ?? 1.5
      })
    : icon;

  return (
    <span aria-hidden="true" className="inline-flex shrink-0 text-current">
      {normalizedIcon}
    </span>
  );
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, className, dot = false, icon, size = "md", variant = "neutral", ...props }, ref) => {
    const hasChildren = children !== null && children !== undefined;

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex max-w-full shrink-0 select-none items-center rounded-sf-full border font-body font-semibold leading-none tracking-[0.01em]",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {dot ? <span aria-hidden="true" className={cn("shrink-0 rounded-sf-full", dotSizeClasses[size], dotClasses[variant])} /> : null}
        {renderBadgeIcon(icon, size, variant)}
        {hasChildren ? <span className="min-w-0 truncate">{children}</span> : null}
      </span>
    );
  }
);

Badge.displayName = "Badge";
