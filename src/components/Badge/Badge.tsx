import {
  cloneElement,
  forwardRef,
  isValidElement,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode
} from "react";

import { cn } from "../../utils/cn";
import { normalizeToError } from "../../utils/aliases";
import { resolveCustomColor } from "../../utils/customColor";

export type BadgeVariant = "neutral" | "accent" | "info" | "success" | "warning" | "error" | "custom";
/** `danger` is accepted as a synonym of `error`. */
export type BadgeVariantInput = BadgeVariant | "danger";
export type BadgeSize = "sm" | "md";
/** `solid` (default) fills with the tone; `soft` is the quieter tinted surface. */
export type BadgeAppearance = "soft" | "solid";

type BadgeCustomColorStyle = CSSProperties & {
  "--sf-badge-custom-bg"?: string;
  "--sf-badge-custom-border"?: string;
  "--sf-badge-custom-color"?: string;
  "--sf-badge-custom-text"?: string;
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  appearance?: BadgeAppearance;
  /** With the default `solid` appearance the label is white, so the colour must hold 4.5:1 against white. */
  customColor?: string;
  dot?: boolean;
  icon?: ReactNode;
  size?: BadgeSize;
  variant?: BadgeVariantInput;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "border-border bg-surface-raised text-content-secondary",
  accent: "border-accent-border bg-accent-bg text-accent-text",
  info: "border-info-border bg-info-bg text-info-text",
  success: "border-success-border bg-success-bg text-success-text",
  warning: "border-warning-border bg-warning-bg text-warning-text",
  error: "border-error-border bg-error-bg text-error-text",
  custom: "border-[color:var(--sf-badge-custom-border)] bg-[color:var(--sf-badge-custom-bg)] text-[color:var(--sf-badge-custom-text)]"
};

const solidVariantClasses: Record<BadgeVariant, string> = {
  neutral: "border-transparent bg-neutral-solid text-on-solid",
  accent: "border-transparent bg-accent-solid text-on-solid",
  info: "border-transparent bg-info-solid text-on-solid",
  success: "border-transparent bg-success-solid text-on-solid",
  warning: "border-transparent bg-warning-solid text-on-solid",
  error: "border-transparent bg-error-solid text-on-solid",
  custom: "border-transparent bg-[color:var(--sf-badge-custom-color)] text-[#FFFFFF]"
};

const iconClasses: Record<BadgeVariant, string> = {
  neutral: "text-icon-secondary",
  accent: "text-icon-accent",
  info: "text-info-icon",
  success: "text-success-icon",
  warning: "text-warning-icon",
  error: "text-error-icon",
  custom: "text-[color:var(--sf-badge-custom-text)]"
};

const dotClasses: Record<BadgeVariant, string> = {
  neutral: "bg-icon-secondary",
  accent: "bg-icon-accent",
  info: "bg-info-icon",
  success: "bg-success-icon",
  warning: "bg-warning-icon",
  error: "bg-error-icon",
  custom: "bg-[color:var(--sf-badge-custom-text)]"
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

function renderBadgeIcon(icon: ReactNode, size: BadgeSize, iconClassName: string) {
  if (!icon) {
    return null;
  }

  const normalizedIcon = isValidElement<{ className?: string; strokeWidth?: number | string }>(icon)
    ? cloneElement(icon as ReactElement<{ className?: string; strokeWidth?: number | string }>, {
        className: cn(iconSizeClasses[size], iconClassName, icon.props.className),
        strokeWidth: icon.props.strokeWidth ?? 1.5
      })
    : icon;

  return (
    <span aria-hidden="true" className="inline-flex shrink-0 text-current">
      {normalizedIcon}
    </span>
  );
}

function getBadgeCustomColorStyle(customColor: string | undefined, style: CSSProperties | undefined): BadgeCustomColorStyle {
  return {
    ...style,
    "--sf-badge-custom-bg": "color-mix(in srgb, var(--sf-badge-custom-color) 14%, rgb(var(--color-surface-raised)))",
    "--sf-badge-custom-border": "color-mix(in srgb, var(--sf-badge-custom-color) 42%, rgb(var(--color-border)))",
    "--sf-badge-custom-color": resolveCustomColor(customColor),
    "--sf-badge-custom-text":
      "color-mix(in srgb, var(--sf-badge-custom-color) 35%, rgb(var(--color-text-primary)))"
  };
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      appearance = "solid",
      children,
      className,
      customColor,
      dot = false,
      icon,
      size = "md",
      style,
      variant: variantProp = "neutral",
      ...props
    },
    ref
  ) => {
    const variant = normalizeToError<BadgeVariant>(variantProp);
    const isSolid = appearance === "solid";
    const hasChildren = children !== null && children !== undefined;
    const resolvedStyle = variant === "custom" ? getBadgeCustomColorStyle(customColor, style) : style;

    return (
      <span
        ref={ref}
        style={resolvedStyle}
        data-appearance={appearance}
        className={cn(
          "inline-flex max-w-full shrink-0 select-none items-center rounded-sf-full border font-body font-semibold leading-none tracking-[0.01em]",
          isSolid ? solidVariantClasses[variant] : variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {dot ? (
          <span
            aria-hidden="true"
            className={cn("shrink-0 rounded-sf-full", dotSizeClasses[size], isSolid ? "bg-current" : dotClasses[variant])}
          />
        ) : null}
        {renderBadgeIcon(icon, size, isSolid ? "text-current" : iconClasses[variant])}
        {hasChildren ? <span className="min-w-0 truncate">{children}</span> : null}
      </span>
    );
  }
);

Badge.displayName = "Badge";
