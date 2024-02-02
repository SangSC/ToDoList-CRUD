"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

// crud
import { Crud, CrudListComponent } from "./auto-crud/type";
import { Pencil1Icon, TrashIcon, PlusIcon } from "@radix-ui/react-icons";

import { DataTableFacetedFilter } from "../components/tasks/data-table-faceted-filter";
import { DataTablePagination } from "../components/tasks/data-table-pagination";

import { statuses } from "./create/data";
import { getTasks } from "../lib/db";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

interface Task {
  id: number;
  name: string;
  description: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export const columns: ColumnDef<Task>[] = [
  // select

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize flex justify-center lg:mr-10 xl:justify-start xl:ml-4">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "is_completed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {row.getValue("is_completed") ? (
            <div>
              <CheckOutlined /> Completed
            </div>
          ) : (
            <div>
              <CloseOutlined /> Unfinished
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("updated_at")}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("created_at")}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    maxSize: 40,
    header: ({ column }) => {
      return <div className="flex justify-center">Action</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-x-1">
          <EditTask />
          <DeleteTask />
        </div>
      );
    },
  },
];

export function TaskTable() {
  const [data, setData] = useState<Task[]>([]); // Use state to store the data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://wayi.league-funny.com/api/task");
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Run the effect only once when the component mounts

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="mx-auto">
      <div className="flex items-center py-4 gap-x-4">
        {/* search */}
        <Input
          placeholder="Filter Tasks..."
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* getColumn('is_completed') */}
        {table.getColumn("is_completed") && (
          <DataTableFacetedFilter
            column={table.getColumn("is_completed")}
            title="Status"
            options={statuses}
          />
        )}

        {/* visible columns */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="mt-4 mb-10 flex justify-center xl:justify-end">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
