import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties, type ElementRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";
import { resolveCustomColor } from "../../utils/customColor";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarStatus = "online" | "away" | "busy" | "offline";
export type AvatarVariant = "neutral" | "custom";

type AvatarCustomColorStyle = CSSProperties & {
  "--sf-avatar-custom-bg"?: string;
  "--sf-avatar-custom-border"?: string;
  "--sf-avatar-custom-color"?: string;
  "--sf-avatar-custom-text"?: string;
};

export interface AvatarProps extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  customColor?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  variant?: AvatarVariant;
}

export interface AvatarFallbackProps extends Omit<ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>, "children"> {
  children?: string | null;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-sf-32 w-sf-32 text-label-sm",
  md: "h-sf-40 w-sf-40 text-label",
  lg: "h-sf-48 w-sf-48 text-heading-sm"
};

const variantClasses: Record<AvatarVariant, string> = {
  neutral: "border-border bg-surface-raised text-content-secondary",
  custom: "border-[color:var(--sf-avatar-custom-border)] bg-[color:var(--sf-avatar-custom-bg)] text-[color:var(--sf-avatar-custom-text)]"
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

function getAvatarCustomColorStyle(customColor: string | undefined, style: CSSProperties | undefined): AvatarCustomColorStyle {
  return {
    ...style,
    "--sf-avatar-custom-bg": "color-mix(in srgb, var(--sf-avatar-custom-color) 14%, rgb(var(--color-surface-raised)))",
    "--sf-avatar-custom-border": "color-mix(in srgb, var(--sf-avatar-custom-color) 42%, rgb(var(--color-border)))",
    "--sf-avatar-custom-color": resolveCustomColor(customColor),
    "--sf-avatar-custom-text": "var(--sf-avatar-custom-color)"
  };
}

export const Avatar = forwardRef<ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ children, className, customColor, size = "md", status, style, variant = "neutral", ...props }, ref) => {
    const resolvedStyle = variant === "custom" ? getAvatarCustomColorStyle(customColor, style) : style;

    return (
      <AvatarPrimitive.Root
        ref={ref}
        data-variant={variant}
        style={resolvedStyle}
        className={cn(
          "sf-premium-control group/avatar relative inline-flex shrink-0 select-none items-center justify-center overflow-visible rounded-sf-xl border font-body font-semibold",
          variantClasses[variant],
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
              "absolute bottom-0 right-0 rounded-sf-full border-2",
              variant === "custom" ? "border-[color:var(--sf-avatar-custom-bg)]" : "border-surface-raised",
              statusSizeClasses[size],
              statusClasses[status]
            )}
          />
        ) : null}
      </AvatarPrimitive.Root>
    );
  }
);

Avatar.displayName = "Avatar";

export const AvatarImage = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("h-full w-full rounded-sf-xl object-cover", className)} {...props} />
));

AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = forwardRef<ElementRef<typeof AvatarPrimitive.Fallback>, AvatarFallbackProps>(
  ({ children, className, delayMs = 250, ...props }, ref) => {
    const resolvedChildren = typeof children === "string" ? children : "";

    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        delayMs={delayMs}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-sf-xl bg-surface-sunken text-current group-data-[variant=custom]/avatar:bg-[color:var(--sf-avatar-custom-bg)]",
          className
        )}
        {...props}
      >
        {resolvedChildren}
      </AvatarPrimitive.Fallback>
    );
  }
);

AvatarFallback.displayName = "AvatarFallback";

export const AvatarGroup = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex -space-x-sf-8 [&>*]:ring-2 [&>*]:ring-background [&>*]:transition-transform [&>*]:duration-sf-slow [&>*]:ease-sf-standard [&>*:hover]:-translate-y-px", className)} {...props} />
);

AvatarGroup.displayName = "AvatarGroup";
