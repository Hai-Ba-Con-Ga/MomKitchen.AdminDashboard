import { ColumnDef, PaginationState, Row, SortingState } from "@tanstack/react-table";
import ScrollX from "@ui/ScrollX";
import {
  Dispatch,
  ReactElement,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import BaseTableV8 from "./BaseTableV8";
import ListTableHeader from "./ListTableHeader";
import TablePagination from "./TablePagination";

interface Props<T> {
  data: T[];
  renderRowSubComponent?: (row: Row<T>) => ReactElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  onPaginationChange?: (pagination: PaginationState) => void;
  onSearchKeywordChange?: (keyword: string) => void;
  onSortByChange?: (sortBy: SortingState) => void;
  // TODO: fix this type later
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRowSelectedChange?: (rows: any[]) => void;
  addButton?: {
    isShown: boolean;
    addButtonHandler: (e: ReactMouseEvent<Element, MouseEvent>) => void;
    buttonContentLangKey: string;
  };
  filter?: {
    isShow: boolean;
    isExpandFilterMenu: boolean;
    setIsExpandFilterMenu: Dispatch<boolean>;
  };
  columnVisibility?: {
    [key: string]: boolean;
  };
  actionComponents?: ReactNode
}
// export type PaginationState = {
//   pageIndex: number;
//   pageSize: number;
// };
// export type SortBy = {
//   colName: string;
//   isDesc: boolean;
// };
function QuickTable<T>(props: Props<T>) {
  const {
    data,
    columns,
    renderRowSubComponent,
    onPaginationChange,
    onRowSelectedChange,
    onSearchKeywordChange,
    onSortByChange,
    columnVisibility,
    addButton = {
      isShown: false,
      buttonContentLangKey: "",
      addButtonHandler: () => console.log,
    },
    filter,
    actionComponents
  } = props;
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sortBy, setSortBy] = useState<SortingState>();
  const [keyword, setKeyword] = useState<string>();
  const [rowSelected, setRowSelected] = useState();
  const goToPage = (page: number) => {
    setPagination({ ...pagination, pageIndex: page });
  };
  const changePageSize = (size: number) => {
    setPagination({ ...pagination, pageSize: size });
  };
  //========Expose pagination change
  useEffect(() => {
    onPaginationChange(pagination);
  }, [pagination, onPaginationChange]);
  useEffect(() => {
    onRowSelectedChange(rowSelected);
  }, [rowSelected, onRowSelectedChange]);
  useEffect(() => {
    onSortByChange(sortBy);
  }, [sortBy, onSortByChange]);
  useEffect(() => {
    onSearchKeywordChange(keyword);
  }, [keyword, onSearchKeywordChange]);
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
        filter={filter}
        actionComponents={actionComponents}
      />
      <BaseTableV8<T>
        columnVisibility={columnVisibility}
        footer={{ hasFooter: false }}
        columns={columns}
        isMultiSelection={true}
        rowSelected={rowSelected}
        paging={{

        }}
        primaryKey="id"
        onSortBy={(colName, isDesc) => {
          setSortBy([{id: colName, desc: isDesc}]);
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
