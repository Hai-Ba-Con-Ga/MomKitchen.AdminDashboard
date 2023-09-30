import { OrderAdmin } from "@/types/@mk/entity/order";
import { PaginationState, SortingState } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

type Props = {};

const useOrderData = (props: Props) => {
  const [orderData, setOrderData] = useState<OrderAdmin>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sortState, setSortState] = useState<SortingState>([]);
  const [keyword, setKeyword] = useState<string>();
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["projects", page],
      queryFn: () => fetchProjects(page),
      keepPreviousData: true,
    });
  return { orderData, setSortState, setKeyword, setPagination };
};

export default useOrderData;
