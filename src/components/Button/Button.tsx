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
    "border-primary bg-primary text-primary-foreground hover:border-primary-hover hover:bg-primary-hover active:border-primary-hover active:bg-primary-hover",
  secondary:
    "border-border bg-secondary text-secondary-foreground hover:border-border-strong hover:bg-secondary-hover active:border-border-strong active:bg-active-surface",
  ghost:
    "border-transparent bg-transparent text-content-primary hover:border-border hover:bg-hover-surface active:border-border-strong active:bg-active-surface",
  danger:
    "border-error-border bg-error-bg text-error-text hover:border-error-icon hover:bg-error-border/20 active:border-error-icon active:bg-error-border/30",
  editorial:
    "border-transparent bg-surface-inverse text-content-inverse hover:border-border-strong active:border-border-strong"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-sf-32 px-sf-12 text-label-sm",
  md: "h-sf-40 px-sf-16 text-label",
  lg: "h-sf-48 px-sf-24 text-label"
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
    <span aria-hidden="true" className="inline-flex shrink-0 text-current">
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
          "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-sf-md border font-body font-semibold leading-none outline-none shadow-none transition duration-sf-normal ease-sf-standard active:translate-y-px active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:translate-y-0 disabled:scale-100 disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        <span className={cn("inline-flex items-center justify-center gap-sf-8", loading && "invisible")}>
          {renderIcon(leftIcon, size)}
          {hasChildren ? <span>{children}</span> : null}
          {renderIcon(rightIcon, size)}
        </span>
        {loading ? (
          <span className="absolute inset-0 inline-flex items-center justify-center gap-sf-8" aria-hidden="true">
            <span className="h-sf-4 w-sf-4 animate-pulse rounded-sf-full bg-current opacity-70" />
            {hasChildren ? <span>{children}</span> : null}
          </span>
        ) : null}
      </button>
    );
  }
);

Button.displayName = "Button";
