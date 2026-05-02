import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode
} from "react";

import { cn } from "../../utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "editorial";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-primary bg-primary text-primary-foreground hover:border-primary-hover hover:bg-primary-hover active:border-primary-active active:bg-primary-active",
  secondary:
    "border-border bg-surface-raised text-secondary-foreground hover:border-border-strong hover:bg-secondary-hover active:border-border-strong active:bg-active-surface",
  ghost:
    "border-transparent bg-transparent text-content-primary hover:border-border hover:bg-hover-surface active:border-border-strong active:bg-active-surface",
  danger:
    "border-error-border bg-error-bg text-error-text hover:border-error-icon hover:bg-error-border/20 active:border-error-icon active:bg-error-border/30",
  editorial:
    "border-border-strong bg-surface-inverse text-content-inverse hover:border-border-strong hover:bg-surface-inverse/90 active:border-border-strong active:bg-surface-inverse/80"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-sf-32 px-sf-12 text-label-sm",
  md: "h-sf-40 px-sf-16 text-label",
  lg: "h-sf-48 px-sf-24 text-label"
};

const loadingInsetClasses: Record<ButtonSize, string> = {
  sm: "px-sf-12",
  md: "px-sf-16",
  lg: "px-sf-24"
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: "h-sf-16 w-sf-16",
  md: "h-sf-16 w-sf-16",
  lg: "h-sf-20 w-sf-20"
};

function renderIcon(icon: ReactNode, size: ButtonSize) {
  if (!icon) {
    return null;
  }

  const normalizedIcon = isValidElement<{ className?: string; strokeWidth?: number | string }>(icon)
    ? cloneElement(icon as ReactElement<{ className?: string; strokeWidth?: number | string }>, {
        className: cn(iconSizeClasses[size], icon.props.className),
        strokeWidth: icon.props.strokeWidth ?? 1.5
      })
    : icon;

  return (
    <span aria-hidden="true" className="inline-flex shrink-0 text-current transition-transform duration-sf-slow ease-sf-standard group-hover:translate-x-[1px] group-hover:-translate-y-px group-hover:scale-105">
      {normalizedIcon}
    </span>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      fullWidth = false,
      leftIcon,
      loading = false,
      rightIcon,
      size = "md",
      type = "button",
      variant = "primary",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const hasChildren = children !== null && children !== undefined;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        className={cn(
          "sf-premium-control group relative inline-flex max-w-full shrink-0 select-none items-center justify-center overflow-hidden rounded-sf-full border font-body font-semibold leading-none tracking-[0.01em] outline-none transition duration-sf-slow ease-sf-standard hover:-translate-y-px hover:scale-[1.01] active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:translate-y-0 disabled:scale-100 disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        <span className={cn("inline-flex min-w-0 items-center justify-center gap-sf-8", loading && "invisible")}>
          {renderIcon(leftIcon, size)}
          {hasChildren ? <span className="min-w-0 truncate">{children}</span> : null}
          {renderIcon(rightIcon, size)}
        </span>
        {loading ? (
          <span className={cn("absolute inset-0 inline-flex min-w-0 items-center justify-center", loadingInsetClasses[size])} aria-hidden="true">
            {hasChildren ? <span className="min-w-0 truncate">{children}</span> : null}
            <span className="absolute bottom-[3px] left-1/2 h-[2px] w-sf-16 -translate-x-1/2 animate-pulse rounded-sf-full bg-current opacity-70" />
          </span>
        ) : null}
      </button>
    );
  }
);

Button.displayName = "Button";
