import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MouseEvent,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode
} from "react";

import { cn } from "../../utils/cn";

export type ChipVariant = "neutral" | "accent" | "info" | "success" | "warning" | "error";
export type ChipSize = "sm" | "md";

export interface ChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, "onClick"> {
  actionLabel?: string;
  disabled?: boolean;
  leftIcon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onRemove?: () => void;
  removeLabel?: string;
  rightIcon?: ReactNode;
  selected?: boolean;
  size?: ChipSize;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant?: ChipVariant;
}

const variantClasses: Record<ChipVariant, string> = {
  neutral: "border-border bg-surface-raised text-content-secondary",
  accent: "border-primary/30 bg-primary/10 text-content-primary",
  info: "border-info-border bg-info-bg text-info-text",
  success: "border-success-border bg-success-bg text-success-text",
  warning: "border-warning-border bg-warning-bg text-warning-text",
  error: "border-error-border bg-error-bg text-error-text"
};

const iconClasses: Record<ChipVariant, string> = {
  neutral: "text-icon-secondary",
  accent: "text-icon-accent",
  info: "text-info-icon",
  success: "text-success-icon",
  warning: "text-warning-icon",
  error: "text-error-icon"
};

const sizeClasses: Record<ChipSize, string> = {
  sm: "h-[var(--component-badge-height-sm)] text-label-sm",
  md: "h-[var(--component-badge-height-md)] text-label"
};

const contentClasses: Record<ChipSize, string> = {
  sm: "gap-sf-4 px-sf-8",
  md: "gap-sf-4 px-sf-8"
};

const iconSizeClasses: Record<ChipSize, string> = {
  sm: "h-sf-12 w-sf-12",
  md: "h-sf-16 w-sf-16"
};

const removeButtonClasses: Record<ChipSize, string> = {
  sm: "mr-[2px] h-sf-16 w-sf-16",
  md: "mr-sf-4 h-sf-16 w-sf-16"
};

function renderChipIcon(icon: ReactNode, size: ChipSize, variant: ChipVariant) {
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

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      actionLabel,
      children,
      className,
      disabled = false,
      leftIcon,
      onClick,
      onRemove,
      removeLabel = "Remove chip",
      rightIcon,
      selected = false,
      size = "md",
      type = "button",
      variant = "neutral",
      ...props
    },
    ref
  ) => {
    const hasChildren = children !== null && children !== undefined;
    const isInteractive = typeof onClick === "function";
    const isRemovable = typeof onRemove === "function";
    const leadingIcon = selected && !leftIcon ? <CheckIcon /> : leftIcon;

    const chipContent = (
      <>
        {renderChipIcon(leadingIcon, size, variant)}
        {hasChildren ? <span className="min-w-0 truncate">{children}</span> : null}
        {renderChipIcon(rightIcon, size, variant)}
      </>
    );

    const handleRemoveClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onRemove?.();
    };

    return (
      <span
        ref={ref}
        aria-disabled={disabled || undefined}
        data-disabled={disabled || undefined}
        data-interactive={isInteractive || undefined}
        data-selected={selected || undefined}
        className={cn(
          "inline-flex max-w-full shrink-0 select-none items-center overflow-hidden rounded-sf-full border font-body font-semibold leading-none tracking-[0.01em] transition-colors duration-sf-normal ease-sf-standard data-[disabled=true]:border-disabled-border data-[disabled=true]:bg-disabled-bg data-[disabled=true]:text-disabled-text data-[selected=true]:ring-1 data-[selected=true]:ring-current/25",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isInteractive ? (
          <button
            type={type}
            aria-label={actionLabel}
            aria-pressed={selected}
            disabled={disabled}
            onClick={onClick}
            className={cn(
              "inline-flex h-full min-w-0 items-center rounded-sf-full bg-transparent text-current outline-none transition duration-sf-fast ease-sf-standard hover:bg-current/10 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed",
              contentClasses[size]
            )}
          >
            {chipContent}
          </button>
        ) : (
          <span className={cn("inline-flex h-full min-w-0 items-center", contentClasses[size])}>{chipContent}</span>
        )}

        {isRemovable ? (
          <button
            type="button"
            aria-label={removeLabel}
            disabled={disabled}
            onClick={handleRemoveClick}
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-sf-full text-current outline-none transition duration-sf-fast ease-sf-standard hover:bg-current/10 active:scale-90 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60",
              removeButtonClasses[size]
            )}
          >
            <XMarkIcon aria-hidden="true" className={iconSizeClasses[size]} strokeWidth={1.5} />
          </button>
        ) : null}
      </span>
    );
  }
);

Chip.displayName = "Chip";
