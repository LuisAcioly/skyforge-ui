import { useId, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../utils/cn";

export interface FormFieldRenderProps {
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  id: string;
  invalid: boolean;
}

export interface FormFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children?: ReactNode | ((field: FormFieldRenderProps) => ReactNode);
  disabled?: boolean;
  errorText?: string | null;
  helperText?: string | null;
  label?: string | null;
  optionalText?: string | null;
  required?: boolean;
}

export const FormField = ({
  children,
  className,
  disabled = false,
  errorText,
  helperText,
  id,
  label,
  optionalText,
  required = false,
  ...props
}: FormFieldProps) => {
  const generatedId = useId();
  const controlId = id ?? `${generatedId}-field`;
  const resolvedLabel = typeof label === "string" ? label : undefined;
  const hasLabel = resolvedLabel !== undefined;
  const resolvedOptionalText = typeof optionalText === "string" ? optionalText : undefined;
  const resolvedHelperText = typeof helperText === "string" ? helperText : undefined;
  const hasHelperText = resolvedHelperText !== undefined;
  const resolvedErrorText = typeof errorText === "string" ? errorText : undefined;
  const hasErrorText = resolvedErrorText !== undefined;
  const helperId = hasHelperText ? `${controlId}-helper` : undefined;
  const errorId = hasErrorText ? `${controlId}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;
  const fieldProps: FormFieldRenderProps = {
    id: controlId,
    invalid: hasErrorText,
    ...(describedBy ? { "aria-describedby": describedBy } : {}),
    ...(hasErrorText ? { "aria-invalid": true } : {})
  };

  return (
    <div className={cn("grid w-full gap-sf-8", className)} data-invalid={hasErrorText || undefined} {...props}>
      {hasLabel ? (
        <label
          htmlFor={controlId}
          className={cn(
            "inline-flex min-w-0 flex-wrap items-baseline gap-sf-4 text-label tracking-[0.01em] text-content-primary",
            disabled && "text-disabled-text"
          )}
        >
          <span className="min-w-0 break-words">{resolvedLabel}</span>
          {required ? (
            <span aria-hidden="true" className="text-error-text">
              *
            </span>
          ) : null}
          {resolvedOptionalText !== undefined ? (
            <span className="shrink-0 rounded-sf-full bg-surface-sunken px-sf-8 py-sf-4 text-caption text-content-tertiary">{resolvedOptionalText}</span>
          ) : null}
        </label>
      ) : null}

      {typeof children === "function" ? children(fieldProps) : children}

      {hasHelperText ? (
        <p id={helperId} className="m-0 text-caption text-content-tertiary">
          {resolvedHelperText}
        </p>
      ) : null}

      {hasErrorText ? (
        <p id={errorId} className="m-0 text-caption text-error-text">
          {resolvedErrorText}
        </p>
      ) : null}
    </div>
  );
};

FormField.displayName = "FormField";
