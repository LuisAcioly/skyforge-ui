import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useId, useState, type ChangeEvent, type HTMLAttributes, type KeyboardEvent } from "react";

import { cn } from "../../utils/cn";
import {
  fieldStatusBorderClasses,
  fieldStatusMessageClasses,
  resolveFieldStatus,
  type FieldStatus
} from "../../utils/fieldStatus";

export type AutoCompleteSize = "md" | "lg";
export type AutoCompleteVariant = "outline" | "filled" | "ghost";

export interface AutoCompleteOption {
  description?: string | null;
  disabled?: boolean;
  label: string;
  value: string;
}

export interface AutoCompleteProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  defaultValue?: string | null;
  disabled?: boolean;
  emptyText?: string | null;
  errorText?: string | null;
  /** Validation state. Parity with Input: success and warning, not only error. */
  status?: FieldStatus;
  statusText?: string | null;
  helperText?: string | null;
  inputValue?: string;
  label?: string | null;
  onInputValueChange?: (value: string) => void;
  onValueChange?: (value: string | null, option?: AutoCompleteOption) => void;
  options: AutoCompleteOption[];
  placeholder?: string | null;
  size?: AutoCompleteSize;
  value?: string | null;
  variant?: AutoCompleteVariant;
}

const variantClasses: Record<AutoCompleteVariant, string> = {
  outline: "border-field-border bg-field-bg hover:border-field-border-hover focus-visible:border-field-border-hover",
  filled:
    "border-transparent bg-surface-sunken hover:border-border hover:bg-hover-surface focus-visible:border-border-strong",
  ghost: "border-transparent bg-transparent hover:border-border hover:bg-surface-raised focus-visible:border-border-strong"
};

const sizeClasses: Record<AutoCompleteSize, string> = {
  md: "h-control-md pl-sf-40 pr-sf-12 text-body-sm",
  lg: "h-control-lg pl-sf-40 pr-sf-16 text-body-md"
};

export const AutoComplete = ({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  className,
  defaultValue = null,
  disabled = false,
  emptyText = "No matching options.",
  errorText,
  helperText,
  id,
  inputValue,
  label,
  onInputValueChange,
  onValueChange,
  options,
  placeholder = "Search options",
  size = "md",
  status,
  statusText,
  value,
  variant = "outline",
  ...props
}: AutoCompleteProps) => {
  const generatedId = useId();
  const inputId = id ?? `${generatedId}-autocomplete`;
  const [open, setOpen] = useState(false);
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue);
  const selectedValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find((option) => option.value === selectedValue);
  const [internalInputValue, setInternalInputValue] = useState(selectedOption?.label ?? "");
  const currentInputValue = inputValue ?? internalInputValue;
  const normalizedQuery = currentInputValue.trim().toLowerCase();
  const showAllOptions = open && currentInputValue === selectedOption?.label;
  const filteredOptions = showAllOptions
    ? options
    : normalizedQuery
    ? options.filter((option) =>
        `${option.label} ${option.description ?? ""}`.toLowerCase().includes(normalizedQuery)
      )
    : options;
  const resolvedLabel = typeof label === "string" ? label : undefined;
  const hasLabel = resolvedLabel !== undefined;
  const resolvedHelperText = typeof helperText === "string" ? helperText : undefined;
  const hasHelperText = resolvedHelperText !== undefined;
  const resolvedErrorText = typeof errorText === "string" ? errorText : undefined;
  const resolvedPlaceholder = typeof placeholder === "string" ? placeholder : "Search options";
  const resolvedEmptyText = typeof emptyText === "string" ? emptyText : undefined;
  const helperId = hasHelperText ? `${inputId}-helper` : undefined;
  const listboxId = `${inputId}-listbox`;
  const activeIndex = filteredOptions.findIndex((option) => option.value === activeValue && !option.disabled);
  const activeOptionId = activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined;
  const resolvedStatusText = typeof statusText === "string" ? statusText : undefined;
  const { status: resolvedStatus, isInvalid } = resolveFieldStatus(status, resolvedErrorText, ariaInvalid);
  const feedbackText = resolvedErrorText ?? resolvedStatusText;
  const hasFeedbackText = feedbackText !== undefined;
  const feedbackId = hasFeedbackText ? `${inputId}-feedback` : undefined;
  const describedBy = [ariaDescribedBy, helperId, feedbackId].filter(Boolean).join(" ") || undefined;

  const commitInputValue = (nextValue: string) => {
    if (inputValue === undefined) {
      setInternalInputValue(nextValue);
    }

    onInputValueChange?.(nextValue);
  };

  const commitValue = (nextValue: string | null, option?: AutoCompleteOption) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue, option);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    commitInputValue(event.target.value);
    commitValue(null);
    setOpen(true);
  };

  const selectOption = (option: AutoCompleteOption) => {
    commitValue(option.value, option);
    commitInputValue(option.label);
    setOpen(false);
    setActiveValue(null);
  };

  const moveActiveOption = (direction: 1 | -1) => {
    if (filteredOptions.length === 0) {
      return;
    }

    let nextIndex = activeIndex >= 0 ? activeIndex : direction === 1 ? -1 : 0;

    for (let attempt = 0; attempt < filteredOptions.length; attempt += 1) {
      nextIndex = (nextIndex + direction + filteredOptions.length) % filteredOptions.length;

      if (!filteredOptions[nextIndex].disabled) {
        setActiveValue(filteredOptions[nextIndex].value);
        return;
      }
    }
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      moveActiveOption(event.key === "ArrowDown" ? 1 : -1);
      return;
    }

    if (event.key === "Enter" && open && activeIndex >= 0) {
      event.preventDefault();
      selectOption(filteredOptions[activeIndex]);
      return;
    }

    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      setActiveValue(null);
    }
  };

  return (
    <div className={cn("grid w-full gap-sf-8", className)} {...props}>
      {hasLabel ? (
        <label htmlFor={inputId} className={cn("min-w-0 break-words text-label text-content-primary", disabled && "text-disabled-text")}>
          {resolvedLabel}
        </label>
      ) : null}

      <PopoverPrimitive.Root
        open={open && !disabled}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) setActiveValue(null);
        }}
      >
        <PopoverPrimitive.Anchor asChild>
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-sf-12 top-1/2 inline-flex -translate-y-1/2 text-icon-secondary"
            >
              <MagnifyingGlassIcon className="h-sf-16 w-sf-16" strokeWidth={1.5} />
            </span>
            <input
              id={inputId}
              type="text"
              value={currentInputValue}
              disabled={disabled}
              placeholder={resolvedPlaceholder}
              role="combobox"
              aria-autocomplete="list"
              aria-controls={listboxId}
              aria-activedescendant={open ? activeOptionId : undefined}
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-describedby={describedBy}
              aria-invalid={isInvalid ? true : ariaInvalid}
              data-invalid={isInvalid || undefined}
              data-status={resolvedStatus}
              onChange={handleInputChange}
              onFocus={() => {
                setOpen(true);
              }}
              onBlur={() => {
                setOpen(false);
                setActiveValue(null);
              }}
              onKeyDown={handleInputKeyDown}
              onClick={() => setOpen(true)}
              className={cn(
                "sf-input-control sf-premium-control block min-w-0 w-full rounded-sf-lg border font-body text-content-primary outline-none transition duration-sf-slow ease-sf-standard placeholder:text-field-placeholder focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100 disabled:placeholder:text-disabled-text data-[invalid=true]:border-error-border data-[invalid=true]:focus-visible:ring-error-icon",
                variantClasses[variant],
                fieldStatusBorderClasses[resolvedStatus],
                sizeClasses[size]
              )}
            />
          </div>
        </PopoverPrimitive.Anchor>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            id={listboxId}
            role="listbox"
            aria-label={resolvedLabel ?? resolvedPlaceholder}
            align="start"
            sideOffset={8}
            onOpenAutoFocus={(event) => event.preventDefault()}
            className={cn(
              "sf-autocomplete-content sf-premium-surface z-sf-dropdown max-w-[calc(100vw-2rem)] w-[var(--radix-popover-trigger-width)] rounded-sf-xl border border-border bg-surface-raised p-sf-8 text-content-primary outline-none"
            )}
          >
            <div className="grid max-h-[320px] gap-sf-4 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => {
                  const isSelected = option.value === selectedValue;
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={option.value}
                      id={`${listboxId}-option-${index}`}
                      type="button"
                      role="option"
                      tabIndex={-1}
                      disabled={option.disabled}
                      aria-selected={isSelected}
                      data-active={isActive || undefined}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseMove={() => setActiveValue(option.value)}
                      onClick={() => selectOption(option)}
                      className="sf-autocomplete-option sf-premium-item flex min-h-sf-40 w-full cursor-pointer select-none items-start gap-sf-8 rounded-sf-md px-sf-12 py-sf-8 text-left font-body text-body-sm text-content-primary outline-none transition duration-sf-slow ease-sf-standard hover:bg-hover-surface data-[active=true]:bg-hover-surface disabled:cursor-not-allowed disabled:text-disabled-text disabled:opacity-100"
                    >
                      <span className="grid min-w-0 flex-1 gap-sf-4">
                        <span className="truncate text-content-primary">{option.label}</span>
                        {typeof option.description === "string" ? (
                          <span className="text-caption text-content-tertiary">{option.description}</span>
                        ) : null}
                      </span>
                      {isSelected ? (
                        <CheckIcon aria-hidden="true" className="mt-sf-4 h-sf-16 w-sf-16 shrink-0 text-icon-accent" strokeWidth={1.5} />
                      ) : null}
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

      {hasFeedbackText ? (
        <p id={feedbackId} className={cn("m-0 text-caption", fieldStatusMessageClasses[resolvedStatus])}>
          {feedbackText}
        </p>
      ) : null}
    </div>
  );
};

AutoComplete.displayName = "AutoComplete";
