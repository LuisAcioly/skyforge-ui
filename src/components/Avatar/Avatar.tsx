import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarStatus = "online" | "away" | "busy" | "offline";

export interface AvatarProps extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: AvatarSize;
  status?: AvatarStatus;
}

export interface AvatarFallbackProps extends Omit<ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>, "children"> {
  children?: string | null;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-sf-32 w-sf-32 text-label-sm",
  md: "h-sf-40 w-sf-40 text-label",
  lg: "h-sf-48 w-sf-48 text-heading-sm"
};

const statusSizeClasses: Record<AvatarSize, string> = {
  sm: "h-sf-8 w-sf-8",
  md: "h-sf-12 w-sf-12",
  lg: "h-sf-12 w-sf-12"
};

const statusClasses: Record<AvatarStatus, string> = {
  online: "bg-success-icon",
  away: "bg-warning-icon",
  busy: "bg-error-icon",
  offline: "bg-disabled-text"
};

export const Avatar = forwardRef<ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ children, className, size = "md", status, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative inline-flex shrink-0 select-none items-center justify-center overflow-visible rounded-sf-full border border-border bg-surface-sunken font-body font-semibold text-content-secondary shadow-none",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
      {status ? (
        <span
          aria-hidden="true"
          className={cn(
            "absolute bottom-0 right-0 rounded-sf-full border-2 border-surface-raised",
            statusSizeClasses[size],
            statusClasses[status]
          )}
        />
      ) : null}
    </AvatarPrimitive.Root>
  )
);

Avatar.displayName = "Avatar";

export const AvatarImage = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("h-full w-full rounded-sf-full object-cover", className)} {...props} />
));

AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = forwardRef<ElementRef<typeof AvatarPrimitive.Fallback>, AvatarFallbackProps>(
  ({ children, className, delayMs = 250, ...props }, ref) => {
    const resolvedChildren = typeof children === "string" ? children : "";

    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        delayMs={delayMs}
        className={cn("flex h-full w-full items-center justify-center rounded-sf-full bg-surface-sunken text-current", className)}
        {...props}
      >
        {resolvedChildren}
      </AvatarPrimitive.Fallback>
    );
  }
);

AvatarFallback.displayName = "AvatarFallback";

export const AvatarGroup = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex -space-x-sf-8 [&>*]:ring-2 [&>*]:ring-background", className)} {...props} />
);

AvatarGroup.displayName = "AvatarGroup";
