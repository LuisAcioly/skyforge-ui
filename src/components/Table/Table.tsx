import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes
} from "react";

import { cn } from "../../utils/cn";

export type TableDensity = "default" | "compact";
export type TableTextAlign = "left" | "center" | "right";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  containerClassName?: string;
  density?: TableDensity;
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  alignText?: TableTextAlign;
}

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  alignText?: TableTextAlign;
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

const TableDensityContext = createContext<TableDensity>("default");

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, containerClassName, density = "default", ...props }, ref) => (
    <TableDensityContext.Provider value={density}>
      <div className={cn("w-full overflow-x-auto rounded-sf-lg border border-border bg-surface shadow-none", containerClassName)}>
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
  ({ className, ...props }, ref) => <thead ref={ref} className={cn("border-b border-divider", className)} {...props} />
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
    <tr ref={ref} className={cn("transition duration-sf-normal ease-sf-standard hover:bg-hover-surface data-[selected=true]:bg-active-surface", className)} {...props} />
  )
);

TableRow.displayName = "TableRow";

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ alignText = "left", className, ...props }, ref) => {
    const density = useContext(TableDensityContext);

    return (
      <th
        ref={ref}
        className={cn(
          "align-middle font-body text-label text-content-secondary",
          cellPaddingClasses[density],
          alignClasses[alignText],
          className
        )}
        {...props}
      />
    );
  }
);

TableHead.displayName = "TableHead";

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ alignText = "left", className, ...props }, ref) => {
    const density = useContext(TableDensityContext);

    return (
      <td
        ref={ref}
        className={cn("align-middle text-content-secondary", cellPaddingClasses[density], alignClasses[alignText], className)}
        {...props}
      />
    );
  }
);

TableCell.displayName = "TableCell";
