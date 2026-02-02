"use client";

import {
  type ColumnDef,
  flexRender,
  type Table as TanStackTable,
} from "@tanstack/react-table";

import { AppPagination } from "@/components/shared/app-pagination";
import {
  AppTable,
  AppTableBody,
  AppTableCell,
  AppTableHead,
  AppTableHeader,
  AppTableRow,
} from "@/components/shared/app-table";

interface AppDataTableProps<TData> {
  table: TanStackTable<TData>;
  columns: ColumnDef<TData, any>[];
  pageCount: number;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  isLoading?: boolean;
}

export function AppDataTable<TData>({
  table,
  columns,
  pageCount,
  pagination,
  onPaginationChange,
  isLoading = false,
}: AppDataTableProps<TData>) {
  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <AppTable>
          <AppTableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <AppTableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <AppTableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </AppTableHead>
                ))}
              </AppTableRow>
            ))}
          </AppTableHeader>
          <AppTableBody>
            {isLoading ? (
              <AppTableRow>
                <AppTableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </AppTableCell>
              </AppTableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <AppTableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <AppTableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </AppTableCell>
                  ))}
                </AppTableRow>
              ))
            ) : (
              <AppTableRow>
                <AppTableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </AppTableCell>
              </AppTableRow>
            )}
          </AppTableBody>
        </AppTable>
      </div>

      {pagination && onPaginationChange && (
        <AppPagination
          currentPage={pagination.pageIndex + 1}
          totalPages={pageCount}
          onPageChange={(page) =>
            onPaginationChange({ ...pagination, pageIndex: page - 1 })
          }
        />
      )}
    </div>
  );
}
