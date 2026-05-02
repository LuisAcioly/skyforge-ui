import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";

import { cn } from "../../utils/cn";

export interface TooltipContentProps extends Omit<ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, "children"> {
  children?: string | null;
}

export const TooltipProvider = ({ delayDuration = 120, skipDelayDuration = 100, ...props }: ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration} {...props} />
);

TooltipProvider.displayName = "TooltipProvider";
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipPortal = TooltipPrimitive.Portal;

export const TooltipContent = forwardRef<ElementRef<typeof TooltipPrimitive.Content>, TooltipContentProps>(
  ({ children, className, sideOffset = 8, ...props }, ref) => {
    const resolvedContent = typeof children === "string" ? children : undefined;

    if (resolvedContent === undefined) {
      return null;
    }

    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          className={cn(
            "sf-popover-content z-sf-modal max-w-[calc(100vw-2rem)] break-words rounded-sf-lg border border-border-strong bg-surface-inverse px-sf-12 py-sf-8 font-body text-caption text-content-inverse shadow-sf-2 outline-none sm:max-w-[260px]",
            className
          )}
          {...props}
        >
          {resolvedContent}
          <TooltipPrimitive.Arrow className="fill-surface-inverse" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    );
  }
);

TooltipContent.displayName = "TooltipContent";
