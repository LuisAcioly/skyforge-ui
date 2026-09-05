import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type KeyboardEvent
} from "react";

import { cn } from "../../utils/cn";
import {
  fieldStatusBorderClasses,
  fieldStatusMessageClasses,
  resolveFieldStatus,
  type FieldStatus
} from "../../utils/fieldStatus";

export type DatePickerVariant = "outline" | "filled" | "ghost";
export type DatePickerSize = "md" | "lg";
export type DatePickerLocale = "en" | "pt-BR";

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  errorText?: string | null;
  /** Validation state. Parity with Input: success and warning, not only error. */
  status?: FieldStatus;
  statusText?: string | null;
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

function isSameDate(first: Date | null, second: Date | null) {
  return Boolean(
    first &&
      second &&
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
  );
}

function moveDateByMonth(date: Date, offset: number) {
  const targetMonth = new Date(date.getFullYear(), date.getMonth() + offset, 1);
  const lastDay = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).getDate();

  return new Date(targetMonth.getFullYear(), targetMonth.getMonth(), Math.min(date.getDate(), lastDay));
}

const localeLabels: Record<
  DatePickerLocale,
  {
    calendarLabel: string;
    monthNames: string[];
    nextMonth: string;
    openCalendar: string;
    previousMonth: string;
    selectYear: string;
    weekDays: string[];
    weekDayLabels: string[];
  }
> = {
  en: {
    calendarLabel: "Choose date",
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
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    weekDayLabels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  "pt-BR": {
    calendarLabel: "Escolher data",
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
    weekDays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    weekDayLabels: ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"]
  }
};

const variantClasses: Record<DatePickerVariant, string> = {
  outline: "border-field-border bg-field-bg hover:border-field-border-hover focus-visible:border-field-border-hover",
  filled:
    "border-transparent bg-surface-sunken hover:border-border hover:bg-hover-surface focus-visible:border-border-strong",
  ghost: "border-transparent bg-transparent hover:border-border hover:bg-surface-raised focus-visible:border-border-strong"
};

const sizeClasses: Record<DatePickerSize, string> = {
  md: "h-control-md pl-sf-40 pr-sf-12 text-body-sm",
  lg: "h-control-lg pl-sf-40 pr-sf-16 text-body-md"
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
      status,
      statusText,
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
    const [yearListOpen, setYearListOpen] = useState(false);
    const calendarButtonRef = useRef<HTMLButtonElement>(null);
    const dayButtonRefs = useRef(new Map<string, HTMLButtonElement>());
    const focusDayAfterRender = useRef(false);
    const formattedDefaultValue = formatDateValue(defaultValue);
    const [internalValue, setInternalValue] = useState(
      typeof formattedDefaultValue === "string" ? formattedDefaultValue : ""
    );
    const formattedValue = formatDateValue(value);
    const currentValue = typeof formattedValue === "string" ? formattedValue : internalValue;
    const selectedDate = parseDateValue(currentValue);
    const selectedTime = selectedDate?.getTime();
    const [viewDate, setViewDate] = useState(selectedDate ?? new Date());
    const [focusedDate, setFocusedDate] = useState(selectedDate ?? new Date());
    const focusedTime = focusedDate.getTime();
    const viewMonthKey = `${viewDate.getFullYear()}-${viewDate.getMonth()}`;
    const accessibleDateFormatter = useMemo(
      () =>
        new Intl.DateTimeFormat(locale === "pt-BR" ? "pt-BR" : "en-US", {
          day: "numeric",
          month: "long",
          weekday: "long",
          year: "numeric"
        }),
      [locale]
    );
    const resolvedLabel = typeof label === "string" ? label : undefined;
    const hasLabel = resolvedLabel !== undefined;
    const resolvedHelperText = typeof helperText === "string" ? helperText : undefined;
    const hasHelperText = resolvedHelperText !== undefined;
    const resolvedErrorText = typeof errorText === "string" ? errorText : undefined;
    const helperId = hasHelperText ? `${inputId}-helper` : undefined;
    const resolvedStatusText = typeof statusText === "string" ? statusText : undefined;
    const { status: resolvedStatus, isInvalid } = resolveFieldStatus(status, resolvedErrorText, ariaInvalid);
    const feedbackText = resolvedErrorText ?? resolvedStatusText;
    const hasFeedbackText = feedbackText !== undefined;
    const feedbackId = hasFeedbackText ? `${inputId}-feedback` : undefined;
    const describedBy = [ariaDescribedBy, helperId, feedbackId].filter(Boolean).join(" ") || undefined;
    const monthStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const firstWeekday = (monthStart.getDay() + 6) % 7;
    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const previousMonthDays = new Date(viewDate.getFullYear(), viewDate.getMonth(), 0).getDate();
    const calendarDays = Array.from({ length: 42 }, (_, index) => {
      const dayOffset = index - firstWeekday + 1;

      return new Date(viewDate.getFullYear(), viewDate.getMonth(), dayOffset);
    });
    const today = new Date();
    const currentYear = today.getFullYear();
    const firstYear = currentYear - 100;
    const lastYear = currentYear + 10;
    const yearOptions = Array.from({ length: lastYear - firstYear + 1 }, (_, index) => firstYear + index);

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
      setFocusedDate(date);
      setOpen(false);
      requestAnimationFrame(() => calendarButtonRef.current?.focus());
    };

    useEffect(() => {
      if (selectedDate) {
        setViewDate(selectedDate);
        setFocusedDate(selectedDate);
      }
    }, [selectedTime]);

    useEffect(() => {
      if (!open || !focusDayAfterRender.current) {
        return;
      }

      focusDayAfterRender.current = false;
      const frame = requestAnimationFrame(() => {
        dayButtonRefs.current.get(formatCalendarDate(focusedDate))?.focus();
      });

      return () => cancelAnimationFrame(frame);
    }, [focusedTime, open, viewMonthKey]);

    const moveCalendarFocus = (date: Date) => {
      focusDayAfterRender.current = true;
      setFocusedDate(date);

      if (date.getFullYear() !== viewDate.getFullYear() || date.getMonth() !== viewDate.getMonth()) {
        setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));
        setYearListOpen(false);
      }
    };

    const handleDayKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: Date) => {
      const weekDay = (date.getDay() + 6) % 7;
      let nextDate: Date | null = null;

      if (event.key === "ArrowLeft") nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
      if (event.key === "ArrowRight") nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
      if (event.key === "ArrowUp") nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
      if (event.key === "ArrowDown") nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
      if (event.key === "Home") nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - weekDay);
      if (event.key === "End") nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6 - weekDay);
      if (event.key === "PageUp") nextDate = moveDateByMonth(date, -1);
      if (event.key === "PageDown") nextDate = moveDateByMonth(date, 1);

      if (nextDate) {
        event.preventDefault();
        moveCalendarFocus(nextDate);
      }
    };

    const moveMonth = (offset: number) => {
      const nextDate = moveDateByMonth(
        new Date(viewDate.getFullYear(), viewDate.getMonth(), focusedDate.getDate()),
        offset
      );
      setViewDate(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
      setFocusedDate(nextDate);
      setYearListOpen(false);
    };

    const changeYear = (year: number) => {
      const lastDay = new Date(year, viewDate.getMonth() + 1, 0).getDate();
      const nextDate = new Date(year, viewDate.getMonth(), Math.min(focusedDate.getDate(), lastDay));
      setViewDate(new Date(year, viewDate.getMonth(), 1));
      setFocusedDate(nextDate);
      setYearListOpen(false);
    };

    return (
      <div className="grid w-full gap-sf-8">
        {hasLabel ? (
          <label htmlFor={inputId} className={cn("min-w-0 break-words text-label text-content-primary", disabled && "text-disabled-text")}>
            {resolvedLabel}
          </label>
        ) : null}

        <PopoverPrimitive.Root open={open && !disabled} onOpenChange={setOpen}>
          <PopoverPrimitive.Anchor asChild>
            <div className="relative">
              <button
                ref={calendarButtonRef}
                type="button"
                disabled={disabled}
                aria-label={labels.openCalendar}
                onClick={() => {
                  if (selectedDate) {
                    setViewDate(selectedDate);
                    setFocusedDate(selectedDate);
                  }

                  setOpen(true);
                }}
                className="absolute left-sf-8 top-1/2 inline-flex h-sf-24 w-sf-24 -translate-y-1/2 items-center justify-center rounded-sf-full text-icon-secondary outline-none transition duration-sf-slow ease-sf-standard hover:bg-hover-surface hover:text-icon-primary focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:text-disabled-text"
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
                data-status={resolvedStatus}
                onChange={handleInputChange}
                onFocus={() => {
                  if (selectedDate) {
                    setViewDate(selectedDate);
                  }

                  setOpen(true);
                }}
                className={cn(
                  "sf-input-control sf-premium-control block min-w-0 w-full rounded-sf-lg border font-body text-content-primary outline-none transition duration-sf-slow ease-sf-standard placeholder:text-field-placeholder focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100 data-[invalid=true]:border-error-border data-[invalid=true]:focus-visible:ring-error-icon",
                  variantClasses[variant],
                  fieldStatusBorderClasses[resolvedStatus],
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
              aria-label={labels.calendarLabel}
              className={cn(
                "sf-popover-content sf-premium-surface z-sf-dropdown w-[calc(100vw-2rem)] max-w-[320px] overflow-hidden rounded-sf-xl border border-border bg-surface-raised p-sf-16 text-content-primary outline-none"
              )}
            >
              <div className="flex items-center justify-between gap-sf-8 pb-sf-12">
                <button
                  type="button"
                  aria-label={labels.previousMonth}
                  onClick={() => moveMonth(-1)}
                  className="sf-premium-control inline-flex h-sf-32 w-sf-32 items-center justify-center rounded-sf-full border border-border bg-surface-raised text-icon-secondary outline-none transition duration-sf-slow ease-sf-standard hover:-translate-y-px hover:border-border-strong hover:bg-hover-surface hover:text-icon-primary focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ChevronLeftIcon aria-hidden="true" className="h-sf-16 w-sf-16" strokeWidth={1.5} />
                </button>
                <div
                  className="relative flex min-w-0 items-center gap-sf-4 rounded-sf-lg border border-border bg-surface p-sf-4"
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setYearListOpen(false);
                    }
                  }}
                >
                  <span className="rounded-sf-md bg-active-surface px-sf-8 py-sf-4 text-caption text-content-primary">
                    {labels.monthNames[viewDate.getMonth()].slice(0, 3)}
                  </span>
                  <button
                    type="button"
                    aria-label={labels.selectYear}
                    aria-expanded={yearListOpen}
                    aria-haspopup="listbox"
                    onClick={() => setYearListOpen((current) => !current)}
                    className="w-auto rounded-sf-md border border-transparent bg-transparent px-sf-8 py-sf-4 font-body text-caption tabular-nums text-content-primary outline-none transition duration-sf-slow ease-sf-standard hover:border-border hover:bg-hover-surface focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {viewDate.getFullYear()}
                  </button>
                  {yearListOpen ? (
                    <div className="sf-popover-content sf-premium-surface absolute left-1/2 top-[calc(100%+var(--space-4))] z-sf-dropdown w-[104px] -translate-x-1/2 overflow-hidden rounded-sf-xl border border-border bg-surface-raised p-sf-4 outline-none">
                      <div
                        role="listbox"
                        aria-label={labels.selectYear}
                        className="sf-year-list grid max-h-[144px] gap-sf-4 overflow-y-auto rounded-sf-lg pr-sf-4"
                      >
                        {yearOptions.map((year) => {
                          const isSelectedYear = year === viewDate.getFullYear();

                          return (
                            <button
                              key={year}
                              type="button"
                              role="option"
                              aria-selected={isSelectedYear}
                              onClick={() => changeYear(year)}
                              className={cn(
                                "inline-flex min-h-sf-32 items-center justify-center rounded-sf-md px-sf-8 text-center font-body text-caption tabular-nums outline-none transition duration-sf-slow ease-sf-standard hover:bg-hover-surface focus-visible:bg-hover-surface focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                isSelectedYear ? "bg-primary text-primary-foreground" : "text-content-primary"
                              )}
                            >
                              {year}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  aria-label={labels.nextMonth}
                  onClick={() => moveMonth(1)}
                  className="sf-premium-control inline-flex h-sf-32 w-sf-32 items-center justify-center rounded-sf-full border border-border bg-surface-raised text-icon-secondary outline-none transition duration-sf-slow ease-sf-standard hover:-translate-y-px hover:border-border-strong hover:bg-hover-surface hover:text-icon-primary focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ChevronRightIcon aria-hidden="true" className="h-sf-16 w-sf-16" strokeWidth={1.5} />
                </button>
              </div>

              <div
                role="grid"
                aria-label={`${labels.monthNames[viewDate.getMonth()]} ${viewDate.getFullYear()}`}
                className="grid grid-cols-7 gap-sf-4"
              >
                <div role="row" className="contents">
                  {labels.weekDays.map((day, index) => (
                    <span
                      key={day}
                      role="columnheader"
                      aria-label={labels.weekDayLabels[index]}
                      className="flex h-sf-24 items-center justify-center rounded-sf-full bg-surface-sunken text-caption text-content-tertiary"
                    >
                      {day}
                    </span>
                  ))}
                </div>
                {Array.from({ length: 6 }, (_, weekIndex) => (
                  <div key={weekIndex} role="row" className="contents">
                    {calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7).map((date) => {
                      const dateKey = formatCalendarDate(date);
                      const isCurrentMonth = date.getMonth() === viewDate.getMonth();
                      const isSelected = isSameDate(date, selectedDate);
                      const isToday = isSameDate(date, today);
                      const isFocused = isSameDate(date, focusedDate);
                      const isOutsideEdge = !isCurrentMonth && (date.getDate() > previousMonthDays - 7 || date.getDate() < 8);

                      return (
                        <span key={dateKey} role="gridcell" aria-selected={isSelected} className="contents">
                          <button
                            ref={(node) => {
                              if (node) dayButtonRefs.current.set(dateKey, node);
                              else dayButtonRefs.current.delete(dateKey);
                            }}
                            type="button"
                            tabIndex={isFocused ? 0 : -1}
                            aria-label={accessibleDateFormatter.format(date)}
                            aria-current={isToday ? "date" : undefined}
                            onClick={() => selectDate(date)}
                            onFocus={() => setFocusedDate(date)}
                            onKeyDown={(event) => handleDayKeyDown(event, date)}
                            className={cn(
                              "relative inline-flex h-sf-32 items-center justify-center rounded-sf-full border border-transparent font-body text-body-sm outline-none transition duration-sf-slow ease-sf-standard hover:-translate-y-px active:translate-y-0 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                              isCurrentMonth
                                ? "text-content-primary hover:border-border-strong hover:bg-hover-surface"
                                : "text-content-tertiary hover:border-border hover:bg-hover-surface",
                              isOutsideEdge && "opacity-80",
                              isToday && !isSelected && "border-border-strong bg-surface text-content-primary",
                              isSelected && "border-primary bg-primary text-primary-foreground hover:border-primary hover:bg-primary"
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
                        </span>
                      );
                    })}
                  </div>
                ))}
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
  }
);

DatePicker.displayName = "DatePicker";
