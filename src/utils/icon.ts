import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

import { cn } from "./cn";

type IconElementProps = { className?: string; strokeWidth?: number | string };

/**
 * Applies a size class and the system outline stroke (1.5) to a Heroicon-like
 * element, keeping any className or strokeWidth the caller already set.
 * Non-element nodes pass through unchanged.
 */
export function normalizeIcon(icon: ReactNode, className: string): ReactNode {
  if (!isValidElement<IconElementProps>(icon)) {
    return icon;
  }

  return cloneElement(icon as ReactElement<IconElementProps>, {
    className: cn(className, icon.props.className),
    strokeWidth: icon.props.strokeWidth ?? 1.5
  });
}
