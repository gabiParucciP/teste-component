import { clsx } from "clsx";
import * as React from "react";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={clsx(
      "table-scroll block text-left border-separate border-spacing-0 w-full",
      className
    )}
    onScroll={props.onScroll}
    {...props}
  />
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={clsx("w-full sticky top-0 z-[90]", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={clsx(className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      " flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center py-4 px-6 bg-white w-full h-full border border-light-gray-200 rounded-t-lg",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={clsx(className)} {...props} />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }: any, ref) => (
  <th
    ref={ref}
    className={clsx(
      {
        "hover:bg-light-gray-100": props.sortable,
      },
      "text-p-md z-[50] bg-white font-normal text-dark-blue-700 p-4 text-left border-t border-b border-light-gray-200 first:border-l last:border-r first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={clsx(
      "align-middle h-[80px] border-b border-light-gray-200 whitespace-nowrap py-4 px-5",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={clsx("text-default mt-4 text-sm", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
