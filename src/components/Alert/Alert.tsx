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

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  action?: ReactNode;
  icon?: ReactNode;
  title?: ReactNode;
  variant?: AlertVariant;
}

const variantClasses: Record<AlertVariant, string> = {
  info: "border-info-border bg-info-bg text-info-text",
  success: "border-success-border bg-success-bg text-success-text",
  warning: "border-warning-border bg-warning-bg text-warning-text",
  error: "border-error-border bg-error-bg text-error-text"
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

function renderAlertIcon(icon: ReactNode | undefined, variant: AlertVariant) {
  if (icon === null) {
    return null;
  }

  if (icon) {
    const normalizedIcon = isValidElement<{ className?: string; strokeWidth?: number | string }>(icon)
      ? cloneElement(icon as ReactElement<{ className?: string; strokeWidth?: number | string }>, {
          className: cn("h-sf-20 w-sf-20", iconClasses[variant], icon.props.className),
          strokeWidth: icon.props.strokeWidth ?? 1.5
        })
      : icon;

    return normalizedIcon;
  }

  const DefaultIcon = defaultIcons[variant];

  return <DefaultIcon aria-hidden="true" className={cn("h-sf-20 w-sf-20", iconClasses[variant])} strokeWidth={1.5} />;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ action, children, className, icon, role, title, variant = "info", ...props }, ref) => {
    const renderedIcon = renderAlertIcon(icon, variant);

    return (
      <div
        ref={ref}
        role={role ?? (variant === "error" ? "alert" : "status")}
        className={cn(
          "rounded-sf-lg border p-sf-16 font-body shadow-none",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-sf-12">
          {renderedIcon ? (
            <span aria-hidden="true" className="mt-sf-4 inline-flex shrink-0">
              {renderedIcon}
            </span>
          ) : null}

          <div className="min-w-0 flex-1">
            {title ? <p className="m-0 text-label text-current">{title}</p> : null}
            {children ? (
              <div className={cn("text-body-sm text-current", title ? "mt-sf-4" : undefined)}>{children}</div>
            ) : null}
            {action ? <div className="mt-sf-12 flex flex-wrap gap-sf-8">{action}</div> : null}
          </div>
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";
