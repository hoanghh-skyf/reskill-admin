import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/base/table";
import { cn } from "@/shared/lib/utils/index";

const AppTable = React.forwardRef<
  HTMLTableElement,
  React.ComponentPropsWithoutRef<typeof Table>
>((props, ref) => (
  <Table ref={ref} {...props} className={cn(props.className)} />
));
AppTable.displayName = "AppTable";

const AppTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<typeof TableHeader>
>((props, ref) => (
  <TableHeader ref={ref} {...props} className={cn(props.className)} />
));
AppTableHeader.displayName = "AppTableHeader";

const AppTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<typeof TableBody>
>((props, ref) => (
  <TableBody ref={ref} {...props} className={cn(props.className)} />
));
AppTableBody.displayName = "AppTableBody";

const AppTableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<typeof TableFooter>
>((props, ref) => (
  <TableFooter ref={ref} {...props} className={cn(props.className)} />
));
AppTableFooter.displayName = "AppTableFooter";

const AppTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.ComponentPropsWithoutRef<typeof TableRow>
>((props, ref) => (
  <TableRow ref={ref} {...props} className={cn(props.className)} />
));
AppTableRow.displayName = "AppTableRow";

const AppTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithoutRef<typeof TableHead>
>((props, ref) => (
  <TableHead ref={ref} {...props} className={cn(props.className)} />
));
AppTableHead.displayName = "AppTableHead";

const AppTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithoutRef<typeof TableCell>
>((props, ref) => (
  <TableCell ref={ref} {...props} className={cn(props.className)} />
));
AppTableCell.displayName = "AppTableCell";

const AppTableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.ComponentPropsWithoutRef<typeof TableCaption>
>((props, ref) => (
  <TableCaption ref={ref} {...props} className={cn(props.className)} />
));
AppTableCaption.displayName = "AppTableCaption";

export {
  AppTable,
  AppTableHeader,
  AppTableBody,
  AppTableFooter,
  AppTableHead,
  AppTableRow,
  AppTableCell,
  AppTableCaption,
};
