import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import {
  cloneElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode
} from "react";

import { cn } from "../../utils/cn";
import { normalizeToError } from "../../utils/aliases";

export type AlertVariant = "info" | "success" | "warning" | "error";
/** `danger` is accepted as a synonym of `error`. */
export type AlertVariantInput = AlertVariant | "danger";
/** `solid` (default) fills with the tone; `soft` is the quieter tinted surface. */
export type AlertAppearance = "soft" | "solid";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  action?: ReactNode;
  appearance?: AlertAppearance;
  icon?: ReactNode;
  title?: string | null;
  variant?: AlertVariantInput;
}

const variantClasses: Record<AlertVariant, string> = {
  info: "border-info-border bg-info-bg text-info-text",
  success: "border-success-border bg-success-bg text-success-text",
  warning: "border-warning-border bg-warning-bg text-warning-text",
  error: "border-error-border bg-error-bg text-error-text"
};

// The fill already carries the tone, so the side bar is dropped.
const solidVariantClasses: Record<AlertVariant, string> = {
  info: "border-transparent bg-info-solid text-on-solid before:hidden",
  success: "border-transparent bg-success-solid text-on-solid before:hidden",
  warning: "border-transparent bg-warning-solid text-on-solid before:hidden",
  error: "border-transparent bg-error-solid text-on-solid before:hidden"
};

const iconClasses: Record<AlertVariant, string> = {
  info: "text-info-icon",
  success: "text-success-icon",
  warning: "text-warning-icon",
  error: "text-error-icon"
};

const defaultIcons = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: XCircleIcon
};

function renderAlertIcon(icon: ReactNode | undefined, variant: AlertVariant, iconClassName: string) {
  if (icon === null) {
    return null;
  }

  if (icon) {
    const normalizedIcon = isValidElement<{ className?: string; strokeWidth?: number | string }>(icon)
      ? cloneElement(icon as ReactElement<{ className?: string; strokeWidth?: number | string }>, {
          className: cn("h-sf-20 w-sf-20", iconClassName, icon.props.className),
          strokeWidth: icon.props.strokeWidth ?? 1.5
        })
      : icon;

    return normalizedIcon;
  }

  const DefaultIcon = defaultIcons[variant];

  return <DefaultIcon aria-hidden="true" className={cn("h-sf-20 w-sf-20", iconClassName)} strokeWidth={1.5} />;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ action, appearance = "solid", children, className, icon, role, title, variant: variantProp = "info", ...props }, ref) => {
    const variant = normalizeToError<AlertVariant>(variantProp);
    const isSolid = appearance === "solid";
    const renderedIcon = renderAlertIcon(icon, variant, isSolid ? "text-current" : iconClasses[variant]);
    const resolvedTitle = typeof title === "string" ? title : undefined;
    const hasTitle = resolvedTitle !== undefined;

    return (
      <div
        ref={ref}
        role={role ?? (variant === "error" ? "alert" : "status")}
        className={cn(
          "sf-premium-surface relative rounded-sf-xl border p-sf-20 pl-sf-24 font-body before:absolute before:inset-y-sf-8 before:left-sf-8 before:w-sf-4 before:rounded-sf-full before:bg-current before:opacity-70",
          isSolid ? solidVariantClasses[variant] : variantClasses[variant],
          className
        )}
        data-appearance={appearance}
        {...props}
      >
        <div className="flex items-start gap-sf-12">
          {renderedIcon ? (
            <span aria-hidden="true" className="mt-sf-4 inline-flex shrink-0">
              {renderedIcon}
            </span>
          ) : null}

          <div className="min-w-0 flex-1">
            {hasTitle ? <p className="m-0 text-label text-current">{resolvedTitle}</p> : null}
            {children ? (
              <div className={cn("text-body-sm text-current", hasTitle ? "mt-sf-4" : undefined)}>{children}</div>
            ) : null}
            {action ? <div className="mt-sf-12 flex flex-wrap items-center gap-sf-8">{action}</div> : null}
          </div>
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";
