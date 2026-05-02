import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import { forwardRef, useId, type TextareaHTMLAttributes } from "react";

import { cn } from "../../utils/cn";

export type TextareaVariant = "outline" | "filled" | "ghost";
export type TextareaSize = "md" | "lg";
export type TextareaStatus = "default" | "success" | "warning" | "error";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  errorText?: string | null;
  helperText?: string | null;
  label?: string | null;
  loading?: boolean;
  size?: TextareaSize;
  status?: TextareaStatus;
  statusText?: string | null;
  variant?: TextareaVariant;
}

const variantClasses: Record<TextareaVariant, string> = {
  outline: "border-border bg-surface-raised hover:border-border-strong focus-visible:border-border-strong",
  filled:
    "border-transparent bg-surface-sunken hover:border-border hover:bg-hover-surface focus-visible:border-border-strong",
  ghost: "border-transparent bg-transparent hover:border-border hover:bg-surface-raised focus-visible:border-border-strong"
};

const sizeClasses: Record<TextareaSize, string> = {
  md: "min-h-[96px] px-sf-12 py-sf-8 text-body-sm",
  lg: "min-h-[128px] px-sf-16 py-sf-12 text-body-md"
};

const statusClasses: Record<TextareaStatus, string> = {
  default: "",
  success: "border-success-border focus-visible:ring-success-icon",
  warning: "border-warning-border focus-visible:ring-warning-icon",
  error: "border-error-border focus-visible:ring-error-icon"
};

const messageClasses: Record<TextareaStatus, string> = {
  default: "text-content-tertiary",
  success: "text-success-text",
  warning: "text-warning-text",
  error: "text-error-text"
};

const statusIconClasses: Record<Exclude<TextareaStatus, "default">, string> = {
  success: "text-success-icon",
  warning: "text-warning-icon",
  error: "text-error-icon"
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      loading = false,
      size = "md",
      status = "default",
      statusText,
      variant = "outline",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id ?? `${generatedId}-textarea`;
    const resolvedLabel = typeof label === "string" ? label : undefined;
    const hasLabel = resolvedLabel !== undefined;
    const resolvedHelperText = typeof helperText === "string" ? helperText : undefined;
    const hasHelperText = resolvedHelperText !== undefined;
    const resolvedErrorText = typeof errorText === "string" ? errorText : undefined;
    const resolvedStatusText = typeof statusText === "string" ? statusText : undefined;
    const feedbackText = resolvedErrorText ?? resolvedStatusText;
    const hasFeedbackText = feedbackText !== undefined;
    const helperId = hasHelperText ? `${textareaId}-helper` : undefined;
    const feedbackId = hasFeedbackText ? `${textareaId}-feedback` : undefined;
    const isInvalid = resolvedErrorText !== undefined || status === "error" || ariaInvalid === true || ariaInvalid === "true";
    const ariaInvalidValue = isInvalid ? true : ariaInvalid;
    const resolvedStatus: TextareaStatus = isInvalid ? "error" : status;
    const describedBy = [ariaDescribedBy, helperId, feedbackId].filter(Boolean).join(" ") || undefined;
    const isDisabled = disabled || loading;
    const StatusIcon =
      resolvedStatus === "success"
        ? CheckCircleIcon
        : resolvedStatus === "warning"
          ? ExclamationTriangleIcon
          : resolvedStatus === "error"
            ? XCircleIcon
            : null;
    const statusIconClass = resolvedStatus !== "default" ? statusIconClasses[resolvedStatus] : undefined;

    return (
      <div className="grid w-full gap-sf-8">
        {hasLabel ? (
          <label htmlFor={textareaId} className="min-w-0 break-words text-label text-content-primary">
            {resolvedLabel}
          </label>
        ) : null}

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            disabled={isDisabled}
            aria-busy={loading || undefined}
            aria-describedby={describedBy}
            aria-invalid={ariaInvalidValue}
            data-loading={loading || undefined}
            data-status={resolvedStatus}
            className={cn(
              "sf-input-control sf-premium-control block min-w-0 w-full resize-y rounded-sf-lg border font-body text-content-primary outline-none transition duration-sf-slow ease-sf-standard placeholder:text-content-tertiary focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100 disabled:placeholder:text-disabled-text",
              variantClasses[variant],
              sizeClasses[size],
              statusClasses[resolvedStatus],
              (loading || StatusIcon) && "pr-sf-40",
              loading && "border-border-strong",
              className
            )}
            {...props}
          />

          {loading ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-sf-12 top-sf-12 inline-flex h-sf-16 w-sf-16 items-center justify-center text-icon-secondary"
            >
              <span className="h-sf-16 w-sf-16 animate-spin rounded-sf-full border border-border-strong border-t-transparent" />
            </span>
          ) : null}

          {!loading && StatusIcon ? (
            <span aria-hidden="true" className={cn("pointer-events-none absolute right-sf-12 top-sf-12 inline-flex", statusIconClass)}>
              <StatusIcon className="h-sf-16 w-sf-16" strokeWidth={1.5} />
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

Textarea.displayName = "Textarea";
