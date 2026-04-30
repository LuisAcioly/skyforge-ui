import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { forwardRef, useEffect, useId, useState, type ChangeEvent, type InputHTMLAttributes } from "react";

import { cn } from "../../utils/cn";

export type DatePickerVariant = "outline" | "filled" | "ghost";
export type DatePickerSize = "md" | "lg";
export type DatePickerLocale = "en" | "pt-BR";

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  errorText?: string | null;
  helperText?: string | null;
  label?: string | null;
  locale?: DatePickerLocale;
  onDateChange?: (value: string) => void;
  size?: DatePickerSize;
  variant?: DatePickerVariant;
}

function formatDateValue(value: InputHTMLAttributes<HTMLInputElement>["value"]) {
  if (typeof value !== "string") {
    return value;
  }

  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!isoMatch) {
    return value;
  }

  return `${isoMatch[3]}-${isoMatch[2]}-${isoMatch[1]}`;
}

function parseDateValue(value: string | number | readonly string[] | undefined) {
  if (typeof value !== "string") {
    return null;
  }

  const formattedValue = formatDateValue(value);
  const dateMatch = /^(\d{2})-(\d{2})-(\d{4})$/.exec(typeof formattedValue === "string" ? formattedValue : "");

  if (!dateMatch) {
    return null;
  }

  const day = Number(dateMatch[1]);
  const month = Number(dateMatch[2]) - 1;
  const year = Number(dateMatch[3]);
  const date = new Date(year, month, day);

  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null;
  }

  return date;
}

function formatCalendarDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

const localeLabels: Record<
  DatePickerLocale,
  {
    monthNames: string[];
    nextMonth: string;
    openCalendar: string;
    previousMonth: string;
    selectYear: string;
    weekDays: string[];
  }
> = {
  en: {
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    nextMonth: "Next month",
    openCalendar: "Open calendar",
    previousMonth: "Previous month",
    selectYear: "Select year",
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
  },
  "pt-BR": {
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ],
    nextMonth: "Próximo mês",
    openCalendar: "Abrir calendário",
    previousMonth: "Mês anterior",
    selectYear: "Selecionar ano",
    weekDays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
  }
};

const variantClasses: Record<DatePickerVariant, string> = {
  outline: "border-border bg-surface hover:border-border-strong focus-visible:border-border-strong",
  filled:
    "border-transparent bg-hover-surface hover:border-border hover:bg-active-surface focus-visible:border-border-strong",
  ghost: "border-transparent bg-transparent hover:border-border hover:bg-hover-surface focus-visible:border-border-strong"
};

const sizeClasses: Record<DatePickerSize, string> = {
  md: "h-sf-40 pl-sf-40 pr-sf-12 text-body-sm",
  lg: "h-sf-48 pl-sf-40 pr-sf-16 text-body-md"
};

const iconSizeClasses: Record<DatePickerSize, string> = {
  md: "h-sf-16 w-sf-16",
  lg: "h-sf-20 w-sf-20"
};

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
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
      locale = "en",
      onChange,
      onDateChange,
      size = "md",
      variant = "outline",
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? `${generatedId}-date`;
    const labels = localeLabels[locale];
    const [open, setOpen] = useState(false);
    const formattedDefaultValue = formatDateValue(defaultValue);
    const [internalValue, setInternalValue] = useState(
      typeof formattedDefaultValue === "string" ? formattedDefaultValue : ""
    );
    const formattedValue = formatDateValue(value);
    const currentValue = typeof formattedValue === "string" ? formattedValue : internalValue;
    const selectedDate = parseDateValue(currentValue);
    const selectedTime = selectedDate?.getTime();
    const [viewDate, setViewDate] = useState(selectedDate ?? new Date());
    const resolvedLabel = typeof label === "string" ? label : undefined;
    const hasLabel = resolvedLabel !== undefined;
    const resolvedHelperText = typeof helperText === "string" ? helperText : undefined;
    const hasHelperText = resolvedHelperText !== undefined;
    const resolvedErrorText = typeof errorText === "string" ? errorText : undefined;
    const hasErrorText = resolvedErrorText !== undefined;
    const helperId = hasHelperText ? `${inputId}-helper` : undefined;
    const errorId = hasErrorText ? `${inputId}-error` : undefined;
    const isInvalid = hasErrorText || ariaInvalid === true || ariaInvalid === "true";
    const describedBy = [ariaDescribedBy, helperId, errorId].filter(Boolean).join(" ") || undefined;
    const monthStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const firstWeekday = (monthStart.getDay() + 6) % 7;
    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const previousMonthDays = new Date(viewDate.getFullYear(), viewDate.getMonth(), 0).getDate();
    const calendarDays = Array.from({ length: 42 }, (_, index) => {
      const dayOffset = index - firstWeekday + 1;

      return new Date(viewDate.getFullYear(), viewDate.getMonth(), dayOffset);
    });
    const today = new Date();
    const yearOptions = Array.from({ length: 21 }, (_, index) => viewDate.getFullYear() - 10 + index);

    const commitValue = (nextValue: string) => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }

      onDateChange?.(nextValue);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(event.target.value);
      }

      onChange?.(event);
    };

    const selectDate = (date: Date) => {
      commitValue(formatCalendarDate(date));
      setViewDate(date);
      setOpen(false);
    };

    useEffect(() => {
      if (selectedDate) {
        setViewDate(selectedDate);
      }
    }, [selectedTime]);

    const moveMonth = (offset: number) => {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    const changeYear = (year: number) => {
      setViewDate(new Date(year, viewDate.getMonth(), 1));
    };

    return (
      <div className="grid w-full gap-sf-8">
        {hasLabel ? (
          <label htmlFor={inputId} className={cn("text-label text-content-primary", disabled && "text-disabled-text")}>
            {resolvedLabel}
          </label>
        ) : null}

        <PopoverPrimitive.Root open={open && !disabled} onOpenChange={setOpen}>
          <PopoverPrimitive.Anchor asChild>
            <div className="relative">
              <button
                type="button"
                disabled={disabled}
                aria-label={labels.openCalendar}
                onClick={() => {
                  if (selectedDate) {
                    setViewDate(selectedDate);
                  }

                  setOpen(true);
                }}
                className="absolute left-sf-8 top-1/2 inline-flex h-sf-24 w-sf-24 -translate-y-1/2 items-center justify-center rounded-sf-sm text-icon-secondary outline-none transition duration-sf-normal ease-sf-standard hover:bg-hover-surface hover:text-icon-primary focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:text-disabled-text"
              >
                <CalendarDaysIcon className={iconSizeClasses[size]} strokeWidth={1.5} />
              </button>
              <input
                ref={ref}
                id={inputId}
                type="text"
                inputMode="numeric"
                pattern="\d{2}-\d{2}-\d{4}"
                placeholder="DD-MM-YYYY"
                value={currentValue}
                disabled={disabled}
                aria-describedby={describedBy}
                aria-invalid={isInvalid ? true : ariaInvalid}
                data-invalid={isInvalid || undefined}
                onChange={handleInputChange}
                onFocus={() => {
                  if (selectedDate) {
                    setViewDate(selectedDate);
                  }

                  setOpen(true);
                }}
                className={cn(
                  "block w-full rounded-sf-md border font-body text-content-primary outline-none shadow-none transition duration-sf-normal ease-sf-standard placeholder:text-content-tertiary focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100 data-[invalid=true]:border-error-border data-[invalid=true]:focus-visible:ring-error-icon",
                  variantClasses[variant],
                  sizeClasses[size],
                  className
                )}
                {...props}
              />
            </div>
          </PopoverPrimitive.Anchor>
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              align="start"
              sideOffset={8}
              onOpenAutoFocus={(event) => event.preventDefault()}
              className="z-sf-modal w-[320px] overflow-hidden rounded-sf-xl border border-border bg-surface-raised p-sf-12 text-content-primary shadow-sf-2 outline-none transition duration-sf-slow ease-sf-standard data-[state=closed]:scale-[0.98] data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100"
            >
              <div className="flex items-center justify-between gap-sf-8 pb-sf-12">
                <button
                  type="button"
                  aria-label={labels.previousMonth}
                  onClick={() => moveMonth(-1)}
                  className="inline-flex h-sf-32 w-sf-32 items-center justify-center rounded-sf-md border border-border bg-surface text-icon-secondary outline-none transition duration-sf-normal ease-sf-standard hover:border-border-strong hover:bg-hover-surface hover:text-icon-primary focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ChevronLeftIcon aria-hidden="true" className="h-sf-16 w-sf-16" strokeWidth={1.5} />
                </button>
                <div className="flex min-w-0 items-center gap-sf-4 overflow-hidden rounded-sf-md border border-border bg-surface p-sf-4">
                  <span className="rounded-sf-sm bg-active-surface px-sf-8 py-sf-4 text-caption text-content-primary">
                    {labels.monthNames[viewDate.getMonth()].slice(0, 3)}
                  </span>
                  <select
                    aria-label={labels.selectYear}
                    value={viewDate.getFullYear()}
                    onChange={(event) => changeYear(Number(event.target.value))}
                    className="w-auto rounded-sf-sm border border-transparent bg-transparent px-sf-8 py-sf-4 font-body text-caption text-content-primary outline-none transition duration-sf-normal ease-sf-standard hover:border-border hover:bg-hover-surface focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  aria-label={labels.nextMonth}
                  onClick={() => moveMonth(1)}
                  className="inline-flex h-sf-32 w-sf-32 items-center justify-center rounded-sf-md border border-border bg-surface text-icon-secondary outline-none transition duration-sf-normal ease-sf-standard hover:border-border-strong hover:bg-hover-surface hover:text-icon-primary focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ChevronRightIcon aria-hidden="true" className="h-sf-16 w-sf-16" strokeWidth={1.5} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-sf-4">
                {labels.weekDays.map((day) => (
                  <span key={day} className="flex h-sf-24 items-center justify-center rounded-sf-sm bg-surface-sunken text-caption text-content-tertiary">
                    {day}
                  </span>
                ))}
                {calendarDays.map((date) => {
                  const isCurrentMonth = date.getMonth() === viewDate.getMonth();
                  const isSelected = Boolean(
                    date && selectedDate && date.toDateString() === selectedDate.toDateString()
                  );
                  const isToday = date.toDateString() === today.toDateString();
                  const isOutsideEdge = !isCurrentMonth && (date.getDate() > previousMonthDays - 7 || date.getDate() < 8);

                  return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => selectDate(date)}
                    className={cn(
                      "relative inline-flex h-sf-32 items-center justify-center rounded-sf-md border border-transparent font-body text-body-sm outline-none transition duration-sf-normal ease-sf-standard active:translate-y-px active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isCurrentMonth
                        ? "text-content-primary hover:border-border-strong hover:bg-hover-surface"
                        : "text-content-tertiary hover:border-border hover:bg-hover-surface",
                      isOutsideEdge && "opacity-80",
                      isToday && !isSelected && "border-border-strong bg-surface text-content-primary",
                      isSelected && "border-primary bg-primary text-primary-foreground shadow-[inset_0_0_0_1px_rgb(var(--color-primary-foreground)_/_0.18)] hover:border-primary hover:bg-primary"
                    )}
                  >
                    {date.getDate()}
                    {isToday ? (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute bottom-[3px] h-[3px] w-[3px] rounded-sf-full",
                          isSelected ? "bg-primary-foreground" : "bg-primary"
                        )}
                      />
                    ) : null}
                  </button>
                  );
                })}
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
  }
);

DatePicker.displayName = "DatePicker";
