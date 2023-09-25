import { ColumnDef, Row } from "@tanstack/react-table";
import ScrollX from "@ui/ScrollX";
import { ReactElement, MouseEvent as ReactMouseEvent, useEffect, useState } from "react";
import BaseTableV8 from "./BaseTableV8";
import ListTableHeader from "./ListTableHeader";
import TablePagination from "./TablePagination";

interface Props<T> {
  data: T[];
  renderRowSubComponent?: (row: Row<T>) => ReactElement;
  columns: ColumnDef<T, any>[];
  onPaginationChange?: (pagination: PaginationState) => void;
  onSearchKeywordChange?: (keyword: string) => void;
  onSortByChange?: (sortBy: SortBy) => void;
  onRowSelectedChange?: (rows: any[]) => void;
  addButton ? : {
    isShown :boolean,
    addButtonHandler: (e :ReactMouseEvent<Element,MouseEvent>) =>void;
    buttonContentLangKey : string
  }
}
type PaginationState = {
  pageIndex: number;
  pageSize: number;
};
type SortBy = {
  colName: string;
  isDesc: boolean;
};
function QuickTable<T>(props: Props<T>) {
  const {
    data,
    columns,
    renderRowSubComponent,
    onPaginationChange,
    onRowSelectedChange,
    onSearchKeywordChange,
    onSortByChange,
    addButton = {isShown: false, buttonContentLangKey: "", addButtonHandler:()=>console.log}
  } = props;
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sortBy, setSortBy] = useState<SortBy>();
  const [keyword, setKeyword] = useState<string>();
  const [rowSelected, setRowSelected] = useState();
  const goToPage = (page: number) => {
    setPagination({ ...pagination, pageIndex: page });
  };
  const changePageSize = (size: number) => {
    setPagination({ ...pagination, pageSize: size });
  };
  //========Expose pagination change
  useEffect(() => {onPaginationChange(pagination)}, [pagination,onPaginationChange]);
  useEffect(() => {onRowSelectedChange(rowSelected)}, [rowSelected,onRowSelectedChange]);
  useEffect(() => {onSortByChange(sortBy)}, [sortBy,onSortByChange]);
  useEffect(() => {onSearchKeywordChange(keyword)}, [keyword,onSearchKeywordChange]);
  return (
    <ScrollX>
      <ListTableHeader
        search={{
          keyword: keyword,
          setKeyword: (q) => {
            setKeyword(q);
          },
        }}
        additionButton={{
          isShown: addButton.isShown,
          addButtonContentKey: addButton.buttonContentLangKey,
          handleAdd: (e) => {
            e.preventDefault();
            addButton.addButtonHandler(e);
          },
        }}
      />
      <BaseTableV8<T>
        footer={{ hasFooter: false }}
        columns={columns}
        isMultiSelection={true}
        rowSelected={rowSelected}
        paging={{}}
        primaryKey="id"
        onSortBy={(colName, isDesc) => {
          setSortBy({ colName, isDesc });
        }}
        renderRowSubComponent={renderRowSubComponent}
        onRowSelect={(row) => {
          setRowSelected(row);
        }}
        data={data}
      />
      <TablePagination
        gotoPage={goToPage}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        totalItems={200}
        setPageSize={changePageSize}
      />
    </ScrollX>
  );
}

export default QuickTable;
