/**
 * Shared validation-status vocabulary for field components.
 *
 * Input and Textarea shipped `status` / `statusText` from v1; Select, DatePicker,
 * AutoComplete and MultiSelect only ever had `errorText`, so they could not express
 * success or warning at all. These helpers give every field the same vocabulary
 * without each component re-deriving it.
 */
export type FieldStatus = "default" | "success" | "warning" | "error";

export const fieldStatusBorderClasses: Record<FieldStatus, string> = {
  default: "",
  success: "border-success-border focus-visible:ring-success-icon",
  warning: "border-warning-border focus-visible:ring-warning-icon",
  error: "border-error-border focus-visible:ring-error-icon"
};

export const fieldStatusMessageClasses: Record<FieldStatus, string> = {
  default: "text-content-tertiary",
  success: "text-success-text",
  warning: "text-warning-text",
  error: "text-error-text"
};

/** errorText, an explicit error status, or aria-invalid all mean the same thing. */
export function resolveFieldStatus(
  status: FieldStatus | undefined,
  errorText: string | undefined,
  ariaInvalid: boolean | "true" | "false" | "grammar" | "spelling" | undefined
): { status: FieldStatus; isInvalid: boolean } {
  const isInvalid =
    errorText !== undefined ||
    status === "error" ||
    ariaInvalid === true ||
    ariaInvalid === "true";
  return { status: isInvalid ? "error" : (status ?? "default"), isInvalid };
}
