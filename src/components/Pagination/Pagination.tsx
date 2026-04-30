import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

export type PaginationSize = "sm" | "md";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  nextLabel?: string;
  onPageChange?: (page: number) => void;
  page: number;
  previousLabel?: string;
  siblingCount?: number;
  size?: PaginationSize;
  totalPages: number;
}

type PaginationRangeItem = number | "ellipsis-start" | "ellipsis-end";

const sizeClasses: Record<PaginationSize, string> = {
  sm: "h-sf-32 min-w-sf-32 px-sf-8 text-label-sm",
  md: "h-sf-40 min-w-sf-40 px-sf-12 text-label"
};

const iconSizeClasses: Record<PaginationSize, string> = {
  sm: "h-sf-16 w-sf-16",
  md: "h-sf-16 w-sf-16"
};

function range(start: number, end: number) {
  const length = Math.max(end - start + 1, 0);

  return Array.from({ length }, (_, index) => start + index);
}

function getPaginationRange(page: number, totalPages: number, siblingCount: number): PaginationRangeItem[] {
  const totalVisibleItems = siblingCount * 2 + 5;

  if (totalPages <= totalVisibleItems) {
    return range(1, totalPages);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);
  const showLeftEllipsis = leftSibling > 3;
  const showRightEllipsis = rightSibling < totalPages - 2;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, 3 + siblingCount * 2), "ellipsis-end", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, "ellipsis-start", ...range(totalPages - (2 + siblingCount * 2), totalPages)];
  }

  return [1, "ellipsis-start", ...range(leftSibling, rightSibling), "ellipsis-end", totalPages];
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      "aria-label": ariaLabel = "Pagination",
      className,
      disabled = false,
      nextLabel = "Next page",
      onPageChange,
      page,
      previousLabel = "Previous page",
      siblingCount = 1,
      size = "md",
      totalPages,
      ...props
    },
    ref
  ) => {
    const safeTotalPages = Math.max(1, Math.trunc(totalPages));
    const currentPage = Math.min(Math.max(Math.trunc(page), 1), safeTotalPages);
    const safeSiblingCount = Math.max(0, Math.trunc(siblingCount));
    const items = getPaginationRange(currentPage, safeTotalPages, safeSiblingCount);
    const isInteractive = !disabled && typeof onPageChange === "function";
    const canGoPrevious = isInteractive && currentPage > 1;
    const canGoNext = isInteractive && currentPage < safeTotalPages;

    const renderPageButton = (item: PaginationRangeItem) => {
      if (typeof item !== "number") {
        return (
          <span
            key={item}
            aria-hidden="true"
            className={cn(
              "inline-flex items-center justify-center text-content-tertiary",
              sizeClasses[size]
            )}
          >
            ...
          </span>
        );
      }

      const isCurrent = item === currentPage;

      return (
        <button
          key={item}
          type="button"
          disabled={!isInteractive || isCurrent}
          aria-current={isCurrent ? "page" : undefined}
          aria-label={isCurrent ? `Page ${item}, current page` : `Go to page ${item}`}
          onClick={() => onPageChange?.(item)}
          className={cn(
            "inline-flex shrink-0 select-none items-center justify-center rounded-sf-md border font-body outline-none shadow-none transition duration-sf-normal ease-sf-standard active:translate-y-px active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:translate-y-0 disabled:scale-100 disabled:opacity-100",
            sizeClasses[size],
            isCurrent
              ? "border-primary bg-primary text-primary-foreground disabled:border-primary disabled:bg-primary disabled:text-primary-foreground"
              : "border-border bg-surface text-content-primary hover:border-border-strong hover:bg-hover-surface disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text"
          )}
        >
          {item}
        </button>
      );
    };

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn("flex flex-wrap items-center gap-sf-8", className)}
        {...props}
      >
        <button
          type="button"
          disabled={!canGoPrevious}
          aria-label={previousLabel}
          onClick={() => onPageChange?.(currentPage - 1)}
          className={cn(
            "inline-flex shrink-0 select-none items-center justify-center rounded-sf-md border border-border bg-surface font-body text-content-primary outline-none shadow-none transition duration-sf-normal ease-sf-standard hover:border-border-strong hover:bg-hover-surface active:translate-y-px active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:translate-y-0 disabled:scale-100 disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100",
            sizeClasses[size]
          )}
        >
          <ChevronLeftIcon aria-hidden="true" className={iconSizeClasses[size]} strokeWidth={1.5} />
        </button>

        {items.map(renderPageButton)}

        <button
          type="button"
          disabled={!canGoNext}
          aria-label={nextLabel}
          onClick={() => onPageChange?.(currentPage + 1)}
          className={cn(
            "inline-flex shrink-0 select-none items-center justify-center rounded-sf-md border border-border bg-surface font-body text-content-primary outline-none shadow-none transition duration-sf-normal ease-sf-standard hover:border-border-strong hover:bg-hover-surface active:translate-y-px active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:translate-y-0 disabled:scale-100 disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100",
            sizeClasses[size]
          )}
        >
          <ChevronRightIcon aria-hidden="true" className={iconSizeClasses[size]} strokeWidth={1.5} />
        </button>
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";
