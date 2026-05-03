import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  cloneElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode
} from "react";

import { cn } from "../../utils/cn";

export type TagVariant = "neutral" | "accent" | "info" | "success" | "warning" | "error";
export type TagSize = "sm" | "md";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  disabled?: boolean;
  leftIcon?: ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
  rightIcon?: ReactNode;
  size?: TagSize;
  variant?: TagVariant;
}

const variantClasses: Record<TagVariant, string> = {
  neutral: "border-border bg-surface-raised text-content-secondary",
  accent: "border-primary/30 bg-primary/10 text-content-primary",
  info: "border-info-border bg-info-bg text-info-text",
  success: "border-success-border bg-success-bg text-success-text",
  warning: "border-warning-border bg-warning-bg text-warning-text",
  error: "border-error-border bg-error-bg text-error-text"
};

const iconClasses: Record<TagVariant, string> = {
  neutral: "text-icon-secondary",
  accent: "text-icon-accent",
  info: "text-info-icon",
  success: "text-success-icon",
  warning: "text-warning-icon",
  error: "text-error-icon"
};

const sizeClasses: Record<TagSize, string> = {
  sm: "h-[var(--component-badge-height-sm)] gap-sf-4 px-sf-8 text-label-sm",
  md: "h-[var(--component-badge-height-md)] gap-sf-4 px-sf-8 text-label"
};

const iconSizeClasses: Record<TagSize, string> = {
  sm: "h-sf-12 w-sf-12",
  md: "h-sf-16 w-sf-16"
};

const removeButtonClasses: Record<TagSize, string> = {
  sm: "h-sf-16 w-sf-16",
  md: "h-sf-16 w-sf-16"
};

function renderTagIcon(icon: ReactNode, size: TagSize, variant: TagVariant) {
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

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      children,
      className,
      disabled = false,
      leftIcon,
      onRemove,
      removeLabel = "Remove tag",
      rightIcon,
      size = "md",
      variant = "neutral",
      ...props
    },
    ref
  ) => {
    const hasChildren = children !== null && children !== undefined;
    const isRemovable = typeof onRemove === "function";

    const handleRemoveClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onRemove?.();
    };

    return (
      <span
        ref={ref}
        aria-disabled={disabled || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          "inline-flex max-w-full shrink-0 select-none items-center rounded-sf-full border font-body font-semibold leading-none tracking-[0.01em] transition-colors duration-sf-normal ease-sf-standard data-[disabled=true]:border-disabled-border data-[disabled=true]:bg-disabled-bg data-[disabled=true]:text-disabled-text",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {renderTagIcon(leftIcon, size, variant)}
        {hasChildren ? <span className="min-w-0 truncate">{children}</span> : null}
        {renderTagIcon(rightIcon, size, variant)}
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

Tag.displayName = "Tag";
