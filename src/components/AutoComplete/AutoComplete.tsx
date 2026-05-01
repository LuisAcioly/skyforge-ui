import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useId, useState, type ChangeEvent, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

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
  outline: "border-border bg-surface hover:border-border-strong focus-visible:border-border-strong",
  filled:
    "border-transparent bg-hover-surface hover:border-border hover:bg-active-surface focus-visible:border-border-strong",
  ghost: "border-transparent bg-transparent hover:border-border hover:bg-hover-surface focus-visible:border-border-strong"
};

const sizeClasses: Record<AutoCompleteSize, string> = {
  md: "h-sf-40 pl-sf-40 pr-sf-12 text-body-sm",
  lg: "h-sf-48 pl-sf-40 pr-sf-16 text-body-md"
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
  value,
  variant = "outline",
  ...props
}: AutoCompleteProps) => {
  const generatedId = useId();
  const inputId = id ?? `${generatedId}-autocomplete`;
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue);
  const selectedValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find((option) => option.value === selectedValue);
  const [internalInputValue, setInternalInputValue] = useState(selectedOption?.label ?? "");
  const currentInputValue = inputValue ?? internalInputValue;
  const normalizedQuery = currentInputValue.trim().toLowerCase();
  const showAllOptions = open && focused && currentInputValue === selectedOption?.label;
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
  const hasErrorText = resolvedErrorText !== undefined;
  const resolvedPlaceholder = typeof placeholder === "string" ? placeholder : "Search options";
  const resolvedEmptyText = typeof emptyText === "string" ? emptyText : undefined;
  const helperId = hasHelperText ? `${inputId}-helper` : undefined;
  const errorId = hasErrorText ? `${inputId}-error` : undefined;
  const listboxId = `${inputId}-listbox`;
  const isInvalid = hasErrorText || ariaInvalid === true || ariaInvalid === "true";
  const describedBy = [ariaDescribedBy, helperId, errorId].filter(Boolean).join(" ") || undefined;

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
  };

  return (
    <div className={cn("grid w-full gap-sf-8", className)} {...props}>
      {hasLabel ? (
        <label htmlFor={inputId} className={cn("min-w-0 break-words text-label text-content-primary", disabled && "text-disabled-text")}>
          {resolvedLabel}
        </label>
      ) : null}

      <PopoverPrimitive.Root open={open && !disabled} onOpenChange={setOpen}>
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
              aria-autocomplete="list"
              aria-controls={open ? listboxId : undefined}
              aria-expanded={open}
              aria-describedby={describedBy}
              aria-invalid={isInvalid ? true : ariaInvalid}
              data-invalid={isInvalid || undefined}
              onChange={handleInputChange}
              onFocus={() => {
                setFocused(true);
                setOpen(true);
              }}
              onClick={() => setOpen(true)}
              className={cn(
                "block min-w-0 w-full rounded-sf-md border font-body text-content-primary outline-none shadow-none transition duration-sf-normal ease-sf-standard placeholder:text-content-tertiary focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100 disabled:placeholder:text-disabled-text data-[invalid=true]:border-error-border data-[invalid=true]:focus-visible:ring-error-icon",
                variantClasses[variant],
                sizeClasses[size]
              )}
            />
          </div>
        </PopoverPrimitive.Anchor>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            id={listboxId}
            role="listbox"
            align="start"
            sideOffset={8}
            onOpenAutoFocus={(event) => event.preventDefault()}
            className={cn(
              "sf-autocomplete-content z-sf-modal max-w-[calc(100vw-2rem)] w-[var(--radix-popover-trigger-width)] rounded-sf-md border border-border bg-surface-raised p-sf-4 text-content-primary shadow-sf-2 outline-none"
            )}
          >
            <div className="grid max-h-[320px] gap-sf-4 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = option.value === selectedValue;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      disabled={option.disabled}
                      aria-selected={isSelected}
                      onClick={() => selectOption(option)}
                      className="sf-autocomplete-option flex min-h-sf-40 w-full cursor-pointer select-none items-start gap-sf-8 rounded-sf-sm px-sf-12 py-sf-8 text-left font-body text-body-sm text-content-primary outline-none transition duration-sf-normal ease-sf-standard hover:bg-active-surface hover:shadow-[inset_0_0_0_1px_rgb(var(--color-border-strong)_/_0.42)] focus-visible:bg-active-surface focus-visible:shadow-[inset_0_0_0_1px_rgb(var(--color-border-strong)_/_0.42)] disabled:cursor-not-allowed disabled:text-disabled-text disabled:opacity-100"
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

      {hasErrorText ? (
        <p id={errorId} className="m-0 text-caption text-error-text">
          {resolvedErrorText}
        </p>
      ) : null}
    </div>
  );
};

AutoComplete.displayName = "AutoComplete";
