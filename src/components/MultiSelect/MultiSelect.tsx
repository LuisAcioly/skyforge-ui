import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useId, useState, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

export type MultiSelectSize = "md" | "lg";
export type MultiSelectVariant = "outline" | "filled" | "ghost";

export interface MultiSelectOption {
  description?: string | null;
  disabled?: boolean;
  label: string;
  value: string;
}

export interface MultiSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  defaultValue?: string[];
  disabled?: boolean;
  emptyText?: string | null;
  errorText?: string | null;
  helperText?: string | null;
  label?: string | null;
  maxVisibleTags?: number;
  onValueChange?: (value: string[]) => void;
  options: MultiSelectOption[];
  placeholder?: string | null;
  size?: MultiSelectSize;
  value?: string[];
  variant?: MultiSelectVariant;
}

const variantClasses: Record<MultiSelectVariant, string> = {
  outline: "border-border bg-surface hover:border-border-strong data-[state=open]:border-border-strong",
  filled: "border-transparent bg-hover-surface hover:border-border hover:bg-active-surface data-[state=open]:border-border-strong",
  ghost: "border-transparent bg-transparent hover:border-border hover:bg-hover-surface data-[state=open]:border-border-strong"
};

const sizeClasses: Record<MultiSelectSize, string> = {
  md: "min-h-sf-40 px-sf-12 py-sf-8 text-body-sm",
  lg: "min-h-sf-48 px-sf-16 py-sf-12 text-body-md"
};

export const MultiSelect = ({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  className,
  defaultValue = [],
  disabled = false,
  emptyText = "No options available.",
  errorText,
  helperText,
  id,
  label,
  maxVisibleTags = 2,
  onValueChange,
  options,
  placeholder = "Select options",
  size = "md",
  value,
  variant = "outline",
  ...props
}: MultiSelectProps) => {
  const generatedId = useId();
  const triggerId = id ?? `${generatedId}-multiselect`;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = value ?? internalValue;
  const selectedOptions = options.filter((option) => selectedValue.includes(option.value));
  const hiddenCount = Math.max(selectedOptions.length - maxVisibleTags, 0);
  const resolvedLabel = typeof label === "string" ? label : undefined;
  const hasLabel = resolvedLabel !== undefined;
  const resolvedHelperText = typeof helperText === "string" ? helperText : undefined;
  const hasHelperText = resolvedHelperText !== undefined;
  const resolvedErrorText = typeof errorText === "string" ? errorText : undefined;
  const hasErrorText = resolvedErrorText !== undefined;
  const resolvedPlaceholder = typeof placeholder === "string" ? placeholder : "Select options";
  const resolvedEmptyText = typeof emptyText === "string" ? emptyText : undefined;
  const helperId = hasHelperText ? `${triggerId}-helper` : undefined;
  const errorId = hasErrorText ? `${triggerId}-error` : undefined;
  const isInvalid = hasErrorText || ariaInvalid === true || ariaInvalid === "true";
  const describedBy = [ariaDescribedBy, helperId, errorId].filter(Boolean).join(" ") || undefined;

  const commitValue = (nextValue: string[]) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  const toggleValue = (optionValue: string) => {
    const nextValue = selectedValue.includes(optionValue)
      ? selectedValue.filter((item) => item !== optionValue)
      : [...selectedValue, optionValue];

    commitValue(nextValue);
  };

  return (
    <div className={cn("grid w-full gap-sf-8", className)} {...props}>
      {hasLabel ? (
        <label htmlFor={triggerId} className={cn("min-w-0 break-words text-label text-content-primary", disabled && "text-disabled-text")}>
          {resolvedLabel}
        </label>
      ) : null}

      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>
          <button
            id={triggerId}
            type="button"
            disabled={disabled}
            aria-describedby={describedBy}
            aria-invalid={isInvalid ? true : ariaInvalid}
            data-invalid={isInvalid || undefined}
            className={cn(
              "inline-flex max-w-full w-full cursor-pointer select-none items-center justify-between gap-sf-8 rounded-sf-md border font-body text-content-primary outline-none shadow-none transition duration-sf-normal ease-sf-standard active:translate-y-px active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:translate-y-0 disabled:scale-100 disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100 data-[invalid=true]:border-error-border data-[invalid=true]:focus-visible:ring-error-icon data-[state=open]:border-border-strong data-[state=open]:bg-hover-surface",
              variantClasses[variant],
              sizeClasses[size]
            )}
          >
            <span className="flex min-w-0 flex-1 flex-wrap items-center gap-sf-4 text-left">
              {selectedOptions.length > 0 ? (
                <>
                  {selectedOptions.slice(0, maxVisibleTags).map((option) => (
                    <span key={option.value} className="max-w-full truncate rounded-sf-sm border border-border bg-surface-raised px-sf-8 py-sf-4 text-caption text-content-primary">
                      {option.label}
                    </span>
                  ))}
                  {hiddenCount > 0 ? (
                    <span className="rounded-sf-sm bg-surface-sunken px-sf-4 text-caption text-content-tertiary">+{hiddenCount}</span>
                  ) : null}
                </>
              ) : (
                <span className="truncate text-content-tertiary">{resolvedPlaceholder}</span>
              )}
            </span>
            <ChevronDownIcon aria-hidden="true" className="h-sf-16 w-sf-16 shrink-0 text-icon-secondary" strokeWidth={1.5} />
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={8}
            className={cn(
              "sf-popover-content z-sf-modal max-w-[calc(100vw-2rem)] w-[var(--radix-popover-trigger-width)] rounded-sf-md border border-border bg-surface-raised p-sf-4 text-content-primary shadow-sf-2 outline-none"
            )}
          >
            <div className="grid max-h-[320px] gap-sf-4 overflow-y-auto">
              {options.length > 0 ? (
                options.map((option) => {
                  const isSelected = selectedValue.includes(option.value);

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={option.disabled}
                      aria-pressed={isSelected}
                      onClick={() => toggleValue(option.value)}
                      className="flex min-h-sf-40 w-full cursor-pointer select-none items-start gap-sf-8 rounded-sf-sm px-sf-12 py-sf-8 text-left font-body text-body-sm text-content-primary outline-none transition duration-sf-normal ease-sf-standard hover:bg-active-surface hover:shadow-[inset_0_0_0_1px_rgb(var(--color-border-strong)_/_0.42)] focus-visible:bg-active-surface focus-visible:shadow-[inset_0_0_0_1px_rgb(var(--color-border-strong)_/_0.42)] disabled:cursor-not-allowed disabled:text-disabled-text disabled:opacity-100"
                    >
                      <span className={cn("mt-sf-4 inline-flex h-sf-16 w-sf-16 shrink-0 items-center justify-center rounded-sf-sm border", isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface")}>
                        {isSelected ? <CheckIcon aria-hidden="true" className="h-sf-12 w-sf-12" strokeWidth={1.5} /> : null}
                      </span>
                      <span className="grid min-w-0 gap-sf-4">
                        <span className="truncate text-content-primary">{option.label}</span>
                        {typeof option.description === "string" ? (
                          <span className="text-caption text-content-tertiary">{option.description}</span>
                        ) : null}
                      </span>
                    </button>
                  );
                })
              ) : resolvedEmptyText ? (
                <p className="m-0 px-sf-12 py-sf-8 text-body-sm text-content-tertiary">{resolvedEmptyText}</p>
              ) : null}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

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

MultiSelect.displayName = "MultiSelect";
