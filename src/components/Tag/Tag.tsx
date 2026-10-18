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
import { normalizeToError } from "../../utils/aliases";

export type TagVariant = "neutral" | "accent" | "info" | "success" | "warning" | "error";
/** `danger` is accepted as a synonym of `error`. */
export type TagVariantInput = TagVariant | "danger";
export type TagSize = "sm" | "md";
/** `solid` (default) fills with the tone; `soft` is the quieter tinted surface. */
export type TagAppearance = "soft" | "solid";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  appearance?: TagAppearance;
  disabled?: boolean;
  leftIcon?: ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
  rightIcon?: ReactNode;
  size?: TagSize;
  variant?: TagVariantInput;
}


const variantClasses: Record<TagVariant, string> = {
  neutral: "border-border bg-surface-raised text-content-secondary",
  accent: "border-primary/30 bg-primary/10 text-content-primary",
  info: "border-info-border bg-info-bg text-info-text",
  success: "border-success-border bg-success-bg text-success-text",
  warning: "border-warning-border bg-warning-bg text-warning-text",
  error: "border-error-border bg-error-bg text-error-text"
};

// Medium weight keeps a solid Tag (classification) quieter than a solid Badge (status).
const solidVariantClasses: Record<TagVariant, string> = {
  neutral: "border-transparent bg-neutral-solid font-medium text-on-solid",
  accent: "border-transparent bg-accent-solid font-medium text-on-solid",
  info: "border-transparent bg-info-solid font-medium text-on-solid",
  success: "border-transparent bg-success-solid font-medium text-on-solid",
  warning: "border-transparent bg-warning-solid font-medium text-on-solid",
  error: "border-transparent bg-error-solid font-medium text-on-solid"
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

function renderTagIcon(icon: ReactNode, size: TagSize, iconClassName: string) {
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

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      appearance = "solid",
      children,
      className,
      disabled = false,
      leftIcon,
      onRemove,
      removeLabel = "Remove tag",
      rightIcon,
      size = "md",
      variant: variantProp = "neutral",
      ...props
    },
    ref
  ) => {
    const variant = normalizeToError<TagVariant>(variantProp);
    const hasChildren = children !== null && children !== undefined;
    const isRemovable = typeof onRemove === "function";
    const isSolid = appearance === "solid";
    const iconClassName = isSolid ? "text-current" : iconClasses[variant];

    const handleRemoveClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onRemove?.();
    };

    return (
      <span
        ref={ref}
        aria-disabled={disabled || undefined}
        data-appearance={appearance}
        data-disabled={disabled || undefined}
        className={cn(
          "inline-flex max-w-full shrink-0 select-none items-center rounded-sf-full border font-body leading-none tracking-[0.01em] transition-colors duration-sf-normal ease-sf-standard data-[disabled=true]:border-disabled-border data-[disabled=true]:bg-disabled-bg data-[disabled=true]:text-disabled-text",
          isSolid ? solidVariantClasses[variant] : cn("font-semibold", variantClasses[variant]),
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {renderTagIcon(leftIcon, size, iconClassName)}
        {hasChildren ? <span className="min-w-0 truncate">{children}</span> : null}
        {renderTagIcon(rightIcon, size, iconClassName)}
        {isRemovable ? (
          <button
            type="button"
            aria-label={removeLabel}
            disabled={disabled}
            onClick={handleRemoveClick}
            className={cn(
              "relative before:absolute before:-inset-[4px] before:content-[''] inline-flex shrink-0 items-center justify-center rounded-sf-full text-current outline-none transition duration-sf-fast ease-sf-standard active:scale-90 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60",
              // Darkening reads on both themes: the light fills are dark, the dark fills are light.
              isSolid ? "hover:bg-[rgb(24_24_26/0.14)] active:bg-[rgb(24_24_26/0.24)]" : "hover:bg-current/10",
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
