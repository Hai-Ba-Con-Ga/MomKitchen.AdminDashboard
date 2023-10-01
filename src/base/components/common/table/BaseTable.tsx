import { Fragment, useEffect, useMemo } from "react";

// material-ui
import {
    Button,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    useMediaQuery
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

// third-party
// import NumberFormat from 'react-number-format';
import {
    Column,
    useExpanded,
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable,
} from "react-table";

// project import
// import AddCustomer from 'sections/apps/customer/AddCustomer';
import {
    HeaderSort,
    SortingSelect,
    TablePagination,
    TableRowSelection
} from "@/base/components/third-party/ReactTable";
import { GlobalFilter, renderFilterTypes } from "@/base/utils/react-table";

// assets
import {
    PlusOutlined
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface Props {
  columns: Column[];
  data: [];
  getHeaderProps: (column: any) => void;
  handleAdd: () => void;
  renderRowSubComponent: any;
  addButtonContentKey: string;
}

function BaseTable({
  columns,
  data,
  getHeaderProps,
  renderRowSubComponent,
  handleAdd,
  addButtonContentKey
}: Props) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const {t} = useTranslation();

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: "fatherName", desc: false };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
    allColumns,
    visibleColumns,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize },
    preGlobalFilteredRows,
    setGlobalFilter,
    setSortBy,
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        hiddenColumns: ["avatar", "email"],
        sortBy: [sortBy],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  
  useEffect(() => {
    if (matchDownSM) {
      setHiddenColumns([
        "age",
        "contact",
        "visits",
        "email",
        "status",
        "avatar",
      ]);
    } else {
      setHiddenColumns(["avatar", "email"]);
    }
  }, [matchDownSM,setHiddenColumns]);

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={3}>
        <Stack
          direction={matchDownSM ? "column" : "row"}
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 3, pb: 0 }}>
          <GlobalFilter
            // preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
          <Stack
            direction={matchDownSM ? "column" : "row"}
            alignItems="center"
            spacing={1}>
            <SortingSelect
              sortBy={sortBy.id}
              setSortBy={setSortBy}
              allColumns={allColumns}
            />
            <Button
              variant="shadow"
              startIcon={<PlusOutlined rev={{}} />}
              onClick={handleAdd}>
              {t(addButtonContentKey)}
            </Button>
          </Stack>
        </Stack>

        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup: any) => (
              <TableRow
                {...headerGroup.getHeaderGroupProps()}
                sx={{ "& > th:first-of-type": { width: "58px" } }}>
                {headerGroup.headers.map((column: any) => (
                  <TableCell
                    {...column.getHeaderProps([
                      { className: column.className },
                      getHeaderProps(column),
                    ])}>
                    <HeaderSort column={column} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row: any, i: number) => {
              prepareRow(row);
              const rowProps = row.getRowProps();

              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      row.toggleRowSelected();
                    }}
                    sx={{
                      cursor: "pointer",
                      bgcolor: row.isSelected
                        ? alpha(theme.palette.primary.light, 0.35)
                        : "inherit",
                    }}>
                    {row.cells.map((cell: any) => (
                      <TableCell
                        {...cell.getCellProps([
                          { className: cell.column.className },
                        ])}>
                        {cell.render("Cell")}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.isExpanded &&
                    renderRowSubComponent({ row, rowProps, visibleColumns })}
                </Fragment>
              );
            })}
            <TableRow sx={{ "&:hover": { bgcolor: "transparent !important" } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination
                  gotoPage={gotoPage}
                  rows={rows}
                  setPageSize={setPageSize}
                  pageSize={pageSize}
                  pageIndex={pageIndex}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>
    </>
  );
}

export default BaseTable;
