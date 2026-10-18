/**
 * Shared anatomy for option rows in list panels (DropdownMenu, Select, MultiSelect).
 *
 * Every row is: an optional 16px leading slot (icon, checkbox or radio), the label,
 * and an optional trailing slot (shortcut, selected check, submenu chevron). Keeping
 * the leading slot in the flow, with one gap, makes labels line up across mixed rows.
 *
 * Checkbox and radio indicators read `data-state` / `data-disabled` from the row
 * (`group`), which Radix sets on its items and MultiSelect sets on its buttons.
 */
export const optionPanelClasses =
  "rounded-sf-xl border border-transparent bg-surface-raised text-content-primary shadow-sf-popover outline-none";

export const optionItemClasses =
  "group relative flex min-h-sf-40 w-full cursor-pointer select-none items-center gap-sf-12 rounded-sf-md px-sf-12 py-sf-8 text-left font-body text-body-sm text-content-primary outline-none transition duration-sf-slow ease-sf-standard data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:text-disabled-text data-[highlighted]:bg-option-highlight data-[highlighted]:text-content-primary";

/** Left padding that lines a row without leading content up with rows that have one. */
export const optionInsetClasses = "pl-sf-40";

export const optionCheckboxClasses =
  "inline-flex h-sf-16 w-sf-16 shrink-0 items-center justify-center rounded-sf-sm border border-control-border bg-surface-raised text-primary-foreground group-data-[state=checked]:border-primary group-data-[state=checked]:bg-primary group-data-[disabled]:border-disabled-border group-data-[disabled]:bg-disabled-bg";

export const optionRadioClasses =
  "inline-flex h-sf-16 w-sf-16 shrink-0 items-center justify-center rounded-sf-full border border-control-border bg-surface-raised group-data-[state=checked]:border-primary group-data-[disabled]:border-disabled-border group-data-[disabled]:bg-disabled-bg";

export const optionGroupLabelClasses = "px-sf-12 pb-sf-4 pt-sf-8 font-body text-eyebrow uppercase text-content-tertiary";

/** Full-bleed across the panel's p-sf-8. */
export const optionSeparatorClasses = "-mx-sf-8 my-sf-4 h-px bg-option-divider";

export const optionShortcutClasses =
  "ml-auto inline-flex h-sf-20 shrink-0 items-center rounded-sf-sm border border-option-divider px-sf-4 font-body text-caption tabular-nums text-content-tertiary";
