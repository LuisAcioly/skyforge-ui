import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

export type SkeletonVariant = "block" | "text" | "avatar";
export type SkeletonSize = "sm" | "md" | "lg";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  label?: string | null;
  lines?: number;
  size?: SkeletonSize;
  variant?: SkeletonVariant;
}

const blockSizeClasses: Record<SkeletonSize, string> = {
  sm: "h-sf-32",
  md: "h-sf-48",
  lg: "h-sf-96"
};

const textSizeClasses: Record<SkeletonSize, string> = {
  sm: "h-sf-12",
  md: "h-sf-16",
  lg: "h-sf-20"
};

const avatarSizeClasses: Record<SkeletonSize, string> = {
  sm: "h-sf-32 w-sf-32",
  md: "h-sf-40 w-sf-40",
  lg: "h-sf-48 w-sf-48"
};

const lineWidthClasses = ["w-full", "w-[92%]", "w-[76%]", "w-[54%]"];

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, label = "Loading content", lines = 1, role, size = "md", variant = "block", ...props }, ref) => {
    const resolvedLabel = typeof label === "string" ? label : undefined;
    const lineCount = Math.max(1, Math.floor(lines));

    if (variant === "text" && lineCount > 1) {
      return (
        <div
          ref={ref}
          role={resolvedLabel ? (role ?? "status") : undefined}
          aria-label={resolvedLabel}
          aria-busy={resolvedLabel ? true : undefined}
          aria-hidden={resolvedLabel ? undefined : true}
          className={cn("grid gap-sf-8", className)}
          {...props}
        >
          {Array.from({ length: lineCount }).map((_, index) => (
            <span
              key={index}
              className={cn("sf-skeleton block rounded-sf-md", textSizeClasses[size], lineWidthClasses[index % lineWidthClasses.length])}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role={resolvedLabel ? (role ?? "status") : undefined}
        aria-label={resolvedLabel}
        aria-busy={resolvedLabel ? true : undefined}
        aria-hidden={resolvedLabel ? undefined : true}
        className={cn(
          "sf-skeleton block",
          variant === "avatar" ? "rounded-sf-full" : "rounded-sf-md",
          variant === "avatar" ? avatarSizeClasses[size] : variant === "text" ? textSizeClasses[size] : blockSizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";
