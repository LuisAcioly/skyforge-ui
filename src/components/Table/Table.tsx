import {
  createContext,
  forwardRef,
  useContext,
  type ReactNode,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes
} from "react";

import { cn } from "../../utils/cn";

export type TableDensity = "default" | "compact";
export type TableTextAlign = "left" | "center" | "right";
export type TableSurface = "outline" | "plain";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  containerClassName?: string;
  density?: TableDensity;
  surface?: TableSurface;
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  alignText?: TableTextAlign;
  numeric?: boolean;
}

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  alignText?: TableTextAlign;
  numeric?: boolean;
}

export interface TableEmptyProps extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "title"> {
  action?: ReactNode;
  colSpan: number;
  description?: string | null;
  title?: string | null;
}

export interface TableLoadingProps extends TdHTMLAttributes<HTMLTableCellElement> {
  colSpan: number;
  rows?: number;
}

const cellPaddingClasses: Record<TableDensity, string> = {
  default: "px-sf-16 py-sf-12",
  compact: "px-sf-12 py-sf-8"
};

const alignClasses: Record<TableTextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};

const surfaceClasses: Record<TableSurface, string> = {
  outline: "rounded-sf-md border border-border bg-surface shadow-none",
  plain: "bg-transparent"
};

const TableDensityContext = createContext<TableDensity>("default");

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, containerClassName, density = "default", surface = "outline", ...props }, ref) => (
    <TableDensityContext.Provider value={density}>
      <div className={cn("w-full overflow-x-auto", surfaceClasses[surface], containerClassName)}>
        <table
          ref={ref}
          data-density={density}
          className={cn("w-full min-w-[640px] border-collapse font-body text-body-sm text-content-secondary", className)}
          {...props}
        />
      </div>
    </TableDensityContext.Provider>
  )
);

Table.displayName = "Table";

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("border-b border-divider bg-surface-sunken/80", className)} {...props} />
  )
);

TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn("divide-y divide-divider", className)} {...props} />
);

TableBody.displayName = "TableBody";

export const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tfoot ref={ref} className={cn("border-t border-divider bg-surface-sunken", className)} {...props} />
);

TableFooter.displayName = "TableFooter";

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "relative transition duration-sf-normal ease-sf-standard hover:bg-hover-surface data-[selected=true]:bg-active-surface [&[data-selected=true]>td:first-child]:shadow-[inset_3px_0_0_rgb(var(--color-primary))]",
        className
      )}
      {...props}
    />
  )
);

TableRow.displayName = "TableRow";

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ alignText = "left", className, numeric = false, ...props }, ref) => {
    const density = useContext(TableDensityContext);

    return (
      <th
        ref={ref}
        className={cn(
          "whitespace-nowrap align-middle font-body text-label text-content-secondary",
          cellPaddingClasses[density],
          alignClasses[alignText],
          numeric && "tabular-nums",
          className
        )}
        {...props}
      />
    );
  }
);

TableHead.displayName = "TableHead";

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ alignText = "left", className, numeric = false, ...props }, ref) => {
    const density = useContext(TableDensityContext);

    return (
      <td
        ref={ref}
        className={cn(
          "align-middle text-content-secondary",
          cellPaddingClasses[density],
          alignClasses[alignText],
          numeric && "tabular-nums",
          className
        )}
        {...props}
      />
    );
  }
);

TableCell.displayName = "TableCell";

export const TableEmpty = forwardRef<HTMLTableCellElement, TableEmptyProps>(
  ({ action, className, colSpan, description, title = "No records found", ...props }, ref) => {
    const resolvedTitle = typeof title === "string" ? title : undefined;
    const resolvedDescription = typeof description === "string" ? description : undefined;

    return (
      <tr>
        <td ref={ref} colSpan={colSpan} className={cn("px-sf-16 py-sf-32", className)} {...props}>
          <div className="mx-auto grid max-w-[360px] justify-items-center gap-sf-8 text-center">
            <span aria-hidden="true" className="h-sf-4 w-sf-32 rounded-sf-full bg-primary" />
            {resolvedTitle ? <p className="m-0 text-label text-content-primary">{resolvedTitle}</p> : null}
            {resolvedDescription ? <p className="m-0 text-body-sm text-content-tertiary">{resolvedDescription}</p> : null}
            {action ? <div className="mt-sf-4">{action}</div> : null}
          </div>
        </td>
      </tr>
    );
  }
);

TableEmpty.displayName = "TableEmpty";

export const TableLoading = forwardRef<HTMLTableCellElement, TableLoadingProps>(
  ({ className, colSpan, rows = 3, ...props }, ref) => {
    const density = useContext(TableDensityContext);
    const lineHeightClass = density === "compact" ? "h-sf-12" : "h-sf-16";

    return (
      <tr>
        <td ref={ref} colSpan={colSpan} className={cn(cellPaddingClasses[density], className)} {...props}>
          <div className="grid gap-sf-12" role="status" aria-label="Loading table rows" aria-busy="true">
            {Array.from({ length: rows }).map((_, index) => (
              <span
                key={index}
                className={cn("sf-skeleton block rounded-sf-sm", lineHeightClass, index % 2 === 0 ? "w-full" : "w-[84%]")}
              />
            ))}
          </div>
        </td>
      </tr>
    );
  }
);

TableLoading.displayName = "TableLoading";
