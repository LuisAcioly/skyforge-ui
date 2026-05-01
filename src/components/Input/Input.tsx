import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode
} from "react";

import { cn } from "../../utils/cn";

export type InputVariant = "outline" | "filled" | "ghost";
export type InputSize = "md" | "lg";
export type InputStatus = "default" | "success" | "warning" | "error";
export type InputType = "text" | "number";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  errorText?: string | null;
  helperText?: string | null;
  label?: string | null;
  leftIcon?: ReactNode;
  loading?: boolean;
  rightIcon?: ReactNode;
  size?: InputSize;
  status?: InputStatus;
  statusText?: string | null;
  type?: InputType;
  variant?: InputVariant;
}

const variantClasses: Record<InputVariant, string> = {
  outline:
    "border-border bg-surface hover:border-border-strong focus-visible:border-border-strong",
  filled:
    "border-transparent bg-hover-surface hover:border-border hover:bg-active-surface focus-visible:border-border-strong",
  ghost:
    "border-transparent bg-transparent hover:border-border hover:bg-hover-surface focus-visible:border-border-strong"
};

const sizeClasses: Record<InputSize, string> = {
  md: "h-sf-40 text-body-sm",
  lg: "h-sf-48 text-body-md"
};

const statusClasses: Record<InputStatus, string> = {
  default: "",
  success: "border-success-border focus-visible:ring-success-icon",
  warning: "border-warning-border focus-visible:ring-warning-icon",
  error: "border-error-border focus-visible:ring-error-icon"
};

const messageClasses: Record<InputStatus, string> = {
  default: "text-content-tertiary",
  success: "text-success-text",
  warning: "text-warning-text",
  error: "text-error-text"
};

const iconSizeClasses: Record<InputSize, string> = {
  md: "h-sf-16 w-sf-16",
  lg: "h-sf-20 w-sf-20"
};

const statusIconClasses: Record<Exclude<InputStatus, "default">, string> = {
  success: "text-success-icon",
  warning: "text-warning-icon",
  error: "text-error-icon"
};

function renderIcon(icon: ReactNode, size: InputSize) {
  if (!icon) {
    return null;
  }

  const normalizedIcon = isValidElement<{ className?: string; strokeWidth?: number | string }>(icon)
    ? cloneElement(icon as ReactElement<{ className?: string; strokeWidth?: number | string }>, {
        className: cn(iconSizeClasses[size], icon.props.className),
        strokeWidth: icon.props.strokeWidth ?? 1.5
      })
    : icon;

  return normalizedIcon;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      className,
      disabled,
      errorText,
      helperText,
      id,
      label,
      leftIcon,
      loading = false,
      rightIcon,
      size = "md",
      status = "default",
      statusText,
      type = "text",
      variant = "outline",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? `${generatedId}-input`;
    const resolvedType: InputType = type === "number" ? "number" : "text";
    const resolvedHelperText = typeof helperText === "string" ? helperText : undefined;
    const hasHelperText = resolvedHelperText !== undefined;
    const resolvedErrorText = typeof errorText === "string" ? errorText : undefined;
    const resolvedStatusText = typeof statusText === "string" ? statusText : undefined;
    const resolvedLabel = typeof label === "string" ? label : undefined;
    const hasLabel = resolvedLabel !== undefined;
    const helperId = hasHelperText ? `${inputId}-helper` : undefined;
    const feedbackText = resolvedErrorText ?? resolvedStatusText;
    const hasFeedbackText = feedbackText !== undefined;
    const feedbackId = hasFeedbackText ? `${inputId}-feedback` : undefined;
    const isInvalid = resolvedErrorText !== undefined || status === "error" || ariaInvalid === true || ariaInvalid === "true";
    const ariaInvalidValue = isInvalid ? true : ariaInvalid;
    const resolvedStatus: InputStatus = isInvalid ? "error" : status;
    const describedBy = [ariaDescribedBy, helperId, feedbackId].filter(Boolean).join(" ") || undefined;
    const isDisabled = disabled || loading;
    const showStatusIcon = !rightIcon && !loading && resolvedStatus !== "default";
    const StatusIcon =
      resolvedStatus === "success"
        ? CheckCircleIcon
        : resolvedStatus === "warning"
          ? ExclamationTriangleIcon
          : resolvedStatus === "error"
            ? XCircleIcon
            : null;

    return (
      <div className="grid w-full gap-sf-8">
        {hasLabel ? (
          <label htmlFor={inputId} className="min-w-0 break-words text-label text-content-primary">
            {resolvedLabel}
          </label>
        ) : null}

        <div className="relative">
          {leftIcon ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-sf-12 top-1/2 inline-flex -translate-y-1/2 text-icon-secondary"
            >
              {renderIcon(leftIcon, size)}
            </span>
          ) : null}

          <input
            ref={ref}
            id={inputId}
            type={resolvedType}
            disabled={isDisabled}
            aria-busy={loading || undefined}
            aria-describedby={describedBy}
            aria-invalid={ariaInvalidValue}
            data-loading={loading || undefined}
            data-status={resolvedStatus}
            className={cn(
              "sf-input-control block min-w-0 w-full rounded-sf-md border font-body text-content-primary outline-none shadow-none transition duration-sf-normal ease-sf-standard placeholder:text-content-tertiary focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100 disabled:placeholder:text-disabled-text",
              variantClasses[variant],
              sizeClasses[size],
              statusClasses[resolvedStatus],
              leftIcon ? "pl-sf-40" : "pl-sf-12",
              rightIcon || loading || showStatusIcon ? "pr-sf-40" : "pr-sf-12",
              loading && "border-border-strong",
              className
            )}
            {...props}
          />

          {rightIcon && !loading ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-sf-12 top-1/2 inline-flex -translate-y-1/2 text-icon-secondary"
            >
              {renderIcon(rightIcon, size)}
            </span>
          ) : null}

          {showStatusIcon && StatusIcon ? (
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute right-sf-12 top-1/2 inline-flex -translate-y-1/2",
                statusIconClasses[resolvedStatus]
              )}
            >
              <StatusIcon className={iconSizeClasses[size]} strokeWidth={1.5} />
            </span>
          ) : null}

          {loading ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-sf-12 top-1/2 inline-flex h-sf-16 w-sf-16 -translate-y-1/2 items-center justify-center text-icon-secondary"
            >
              <span className="h-sf-16 w-sf-16 animate-spin rounded-sf-full border border-border-strong border-t-transparent" />
            </span>
          ) : null}
        </div>

        {hasHelperText ? (
          <p id={helperId} className="m-0 text-caption text-content-tertiary">
            {resolvedHelperText}
          </p>
        ) : null}

        {hasFeedbackText ? (
          <p id={feedbackId} className={cn("m-0 text-caption", messageClasses[resolvedStatus])}>
            {feedbackText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
