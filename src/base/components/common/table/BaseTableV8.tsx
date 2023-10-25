// TODO : fix the types later
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useEffect, useState } from "react";

import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box, Stack, alpha, useTheme } from "@mui/system";
import {
  Cell,
  ColumnDef,
  Header,
  Table as ReactTableType,
  Row,
  SortDirection,
  SortingState,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { isEmpty, reduce } from "lodash";
import styled from "styled-components";
import NoData from "./NoData";

interface BaseTableV8Props<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  paging?: any;
  rowSelected?: string[];
  isMultiSelection?: boolean; //enable multi row selected or single row selected
  primaryKey?: string; // primary key for onRowSelect function
  onRowSelect?: (params: any) => void;
  onSortBy?: (clName: string, isSortedDesc: boolean) => void;
  onPageChange?: (page: number, size: number) => void;
  footer?: {
    hasFooter?: boolean;
    footerRender?: (table: ReactTableType<T>) => React.ReactElement;
  };
  setRowHover?: (row: any) => void;
  isRowSpanned?: boolean;
  isDraggable?: boolean;
  renderRowSubComponent?: (row: Row<T>) => React.ReactElement;
  columnVisibility?: {
    [key: string]: boolean;
  };
}
const alignMetaMap = {
  left : "flex-start",
  center : "center",
  right : "flex-end"
}
function BaseTableV8<T>(props: BaseTableV8Props<T>) {
  const {
    columns = [],
    data = [],
    columnVisibility,
    paging = {
      pageTotal: 0,
      pageCount: 0,
      pageIndex: 1,
      pageSize: 10,
    },
    isMultiSelection = true,
    rowSelected, //outside
    primaryKey = "id",
    onRowSelect,
    onSortBy,
    footer = { hasFooter: false },
    setRowHover,
    isRowSpanned,
    renderRowSubComponent,
  } = props;
  const initialRowSelection = reduce(
    rowSelected,
    (f: any, id) => {
      f[id] = true;
      return f;
    },
    {}
  );

  const [rowSelection, setRowSelection] =
    React.useState<any>(initialRowSelection);
  const theme = useTheme();
  const tableOptions: TableOptions<T> = {
    data: data || [],
    columns: columns,
    state: { rowSelection, columnVisibility },
    enableMultiRowSelection: isMultiSelection,
    onRowSelectionChange: setRowSelection,
    //option
    getRowId(originalRow, index: number, parent?) {
      // return row id in select row
      return parent
        ? [parent[primaryKey], originalRow[primaryKey]].join(".")
        : originalRow[primaryKey];
    },
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    //
    manualSorting: true, //server-side sorting
    debugTable: true,
  };
  const table = useReactTable(tableOptions);
  const { getHeaderGroups, getRowModel, getFooterGroups } = table;

  // callback selected rows
  useEffect(() => {
    //console.log(rowSelection, 'rowSelection');
    if (Object.keys(rowSelection).length > 0) {
      if (
        JSON.stringify(initialRowSelection) !== JSON.stringify(rowSelection)
      ) {
        onRowSelect && onRowSelect(Object.keys(rowSelection)); //onChange
      }
    } else {
      onRowSelect && onRowSelect([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);

  // listen row selected
  useEffect(() => {
    // console.log('rowSelected', rowSelected);
    // console.log('rowSelection', rowSelection);
    if (isEmpty(rowSelected) && Object.keys(rowSelection).length > 0) {
      setRowSelection({});
    } else {
      if (
        JSON.stringify(initialRowSelection) !== JSON.stringify(rowSelection)
      ) {
        setRowSelection(initialRowSelection);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelected]);

  // initial state - SECONDS PROPS IS STATE
  useEffect(() => {
    // sorting state
    if (paging?.sorts?.length > 0) {
      const sortingState: SortingState = [];
      paging.sorts.map((_sort: any) => {
        if (_sort.field) {
          sortingState.push({
            id: _sort.field,
            desc: _sort?.orderBy === 2 ? true : false,
          }); //desc = 2
        }
      });
      table.setSorting(sortingState);
    }

    // paging state
    // if (paging?.pageSize) {
    //   table.setPageSize(paging?.pageSize || 10);
    // } else {
    //   table.setPageSize(10); //default
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging]);

  const [, setListItems] = useState<Row<T>[]>(table.getRowModel().rows);
  useEffect(
    () => {
      setListItems(table.getRowModel().rows);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table.getRowModel().rows, table]
  ); // update ListItem on data change in Draggable

  const tableFooterRender = () => {
    if (footer?.hasFooter) {
      if (footer?.footerRender) {
        return footer?.footerRender(table);
      } else {
        return (
          <TableFooter>
            {getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        );
      }
    }
    return null;
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table>
          <TableHead
            sx={{
              border: "none",
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}>
            {getHeaderGroups().map((headerGroup, groupIdx) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, cIdx) => (
                  <TableCell
                    colSpan={header.colSpan}
                    key={`${groupIdx}-${cIdx}`}
                    sx={{
                      minWidth: header?.column?.columnDef?.minSize ?? "auto",
                      width:
                        header?.column?.columnDef?.size ??
                        header?.column?.getSize(),
                      cursor: "pointer",
                      userSelect: "none",
                      // p: 0.5,
                      // pl: 3
                    }}
                    onClick={() => {
                      if (header.column.getCanSort()) {
                        header.column.toggleSorting();
                        // sort on server

                        onSortBy &&
                          onSortBy(
                            header.column.id,
                            typeof header.column.getNextSortingOrder() ===
                              "boolean"
                              ? !!header.column.getNextSortingOrder()
                              : (header.column.getNextSortingOrder() as SortDirection) ==
                                  "desc"
                          );
                      }
                    }}>
                    {/* {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )} */}
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment     
                      // @ts-ignore
                      justifyContent={alignMetaMap[header.column.columnDef.meta?.align?? "center"]}
                      // sx={{ display: 'inline-flex' }}
                    >
                      <TableHeadCell>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHeadCell>
                      {header.column.getCanSort() && (
                        <Stack spacing={0.5} sx={{ color: "secondary.light" }}>
                          <ArrowDropUpOutlined
                            fontSize="small"
                            style={{
                              // fontSize: '1.525rem',
                              color:
                                header.column.getCanSort() &&
                                header.column.getIsSorted() === "asc"
                                  ? theme.palette.text.secondary
                                  : "inherit",
                            }}
                          />
                          <ArrowDropDownOutlined
                            fontSize="small"
                            style={{
                              // fontSize: '1.525rem',
                              marginTop: "-14px",
                              color:
                                header.column.getIsSorted() === "desc"
                                  ? theme.palette.text.secondary
                                  : "inherit",
                            }}
                          />
                        </Stack>
                      )}
                    </Stack>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody
            sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
            {getRowModel().rows.map((row, rIdx: number) => {
              return (
                <Fragment key={rIdx}>
                  <TableRow
                    onMouseEnter={() => {
                      setRowHover && setRowHover(row);
                    }}
                    onMouseLeave={() => {
                      setRowHover && setRowHover(undefined);
                    }}
                    onClick={() => {
                      row.toggleSelected();
                    }}
                    key={rIdx}
                    sx={{
                      height: 55,
                      cursor: "pointer",
                      bgcolor: row.getIsSelected()
                        ? alpha(theme.palette.primary.lighter, 0.85)
                        : "inherit",
                    }}>
                    {row
                      .getVisibleCells()
                      .map((cell: Cell<T, any>, ceIdx: number) => {
                        if (isRowSpanned) {
                          if (cell.getValue()?.rowSpan) {
                            if (cell.getValue().isRowSpanned) {
                              return null;
                            } else {
                              return (
                                <TableCell
                                  sx={{
                                    "&.MuiTableCell-root:first-of-type ": {
                                      padding: 1,
                                      pl: "24px !important", // fix wrong display first-type on rowspanned
                                    },
                                    // ...(ceIdx != 0 && { borderLeft: `1px solid ${theme.palette.divider}` }), //only border right and left on spanned cell
                                    // ...(ceIdx + 1 < row.getVisibleCells().length && { borderRight: `1px solid ${theme.palette.divider}` }),
                                    position: "relative",
                                  }}
                                  rowSpan={cell.getValue()?.rowSpan}
                                  key={ceIdx}>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </TableCell>
                              );
                            }
                          } else {
                            return (
                              <TableCell
                                key={ceIdx}
                                sx={{ position: "relative" }} // to display child absolute
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            );
                          }
                        }
                        return (
                          <TableCell sx={{ position: "relative" }} key={ceIdx}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      })}
                  </TableRow>
                  {row.getIsExpanded() &&
                    renderRowSubComponent &&
                    renderRowSubComponent(row)}
                </Fragment>
              );
            })}
            {data.length === 0 && <NoData />}
          </TableBody>
          {tableFooterRender()}
        </Table>
      </TableContainer>
    </>
  );
}

export default BaseTableV8;

// =======================================================
const TableHeadCell = styled(Box)({
  fontSize: "14px !important",
  textTransform: "capitalize",
  whiteSpace: "nowrap",
});

export function BaseTableHeader({
  header,
  align,
}: {
  header: Header<any, any>;
  align: "center" | "left" | "right";
}) {
  const alignMap = {
    left: "flex-start",
    right: "flex-end",
    center: "center",
  };
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent={alignMap[align]}
      // sx={{ display: 'inline-flex' }}
    >
      <TableHeadCell>
        {flexRender(header.column.columnDef.header, header.getContext())}
      </TableHeadCell>
      {header.column.getCanSort() && (
        <Stack spacing={0.5} sx={{ color: "secondary.light" }}>
          <ArrowDropUpOutlined
            fontSize="small"
            style={{
              // fontSize: '1.525rem',
              color:
                header.column.getCanSort() &&
                header.column.getIsSorted() === "asc"
                  ? theme.palette.text.secondary
                  : "inherit",
            }}
          />
          <ArrowDropDownOutlined
            fontSize="small"
            style={{
              // fontSize: '1.525rem',
              marginTop: "-14px",
              color:
                header.column.getIsSorted() === "desc"
                  ? theme.palette.text.secondary
                  : "inherit",
            }}
          />
        </Stack>
      )}
    </Stack>
  );
}
