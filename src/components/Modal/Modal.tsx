import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

export type ModalSize = "sm" | "md" | "lg" | "xl";

export interface ModalContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  closeLabel?: string;
  showClose?: boolean;
  size?: ModalSize;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-modal-sm",
  md: "max-w-modal-md",
  lg: "max-w-modal-lg",
  xl: "max-w-modal-xl"
};

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;
export const ModalClose = DialogPrimitive.Close;
export const ModalPortal = DialogPrimitive.Portal;

export const ModalOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-sf-overlay bg-[rgb(var(--component-modal-overlay)_/_0.78)] backdrop-blur-sm transition-opacity duration-sf-slow ease-sf-standard data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
      className
    )}
    {...props}
  />
));

ModalOverlay.displayName = "ModalOverlay";

export const ModalContent = forwardRef<ElementRef<typeof DialogPrimitive.Content>, ModalContentProps>(
  ({ children, className, closeLabel = "Close modal", showClose = true, size = "md", ...props }, ref) => (
    <ModalPortal>
      <ModalOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "sf-premium-surface fixed left-1/2 top-1/2 z-sf-modal max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-sf-2xl border border-border-strong bg-surface-raised p-sf-24 text-content-primary outline-none ring-1 ring-inset ring-surface-raised transition duration-sf-slow ease-sf-standard data-[state=closed]:scale-[0.96] data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 sm:p-sf-32",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
        {showClose ? (
          <DialogPrimitive.Close className="sf-premium-control absolute right-sf-16 top-sf-16 inline-flex h-sf-32 w-sf-32 items-center justify-center rounded-sf-full border border-border bg-surface-raised text-icon-secondary outline-none transition duration-sf-slow ease-sf-standard hover:-translate-y-px hover:border-border-strong hover:bg-hover-surface hover:text-icon-primary active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <XMarkIcon aria-hidden="true" className="h-sf-16 w-sf-16" strokeWidth={1.5} />
            <span className="sr-only">{closeLabel}</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </ModalPortal>
  )
);

ModalContent.displayName = "ModalContent";

export const ModalHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-sf-8 pr-sf-32", className)} {...props} />
);

ModalHeader.displayName = "ModalHeader";

export const ModalTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("m-0 font-display text-heading-md tracking-[-0.02em] text-content-primary", className)}
    {...props}
  />
));

ModalTitle.displayName = "ModalTitle";

export const ModalDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("m-0 text-body-sm text-content-secondary", className)}
    {...props}
  />
));

ModalDescription.displayName = "ModalDescription";

export const ModalBody = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-sf-24 text-body-sm text-content-secondary", className)} {...props} />
);

ModalBody.displayName = "ModalBody";

export const ModalFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-sf-24 flex flex-col-reverse gap-sf-8 sm:flex-row sm:justify-end", className)} {...props} />
);

ModalFooter.displayName = "ModalFooter";
