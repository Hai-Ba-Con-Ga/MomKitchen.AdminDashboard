import { Tray } from "@/types/@mk/entity/tray";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import TrayApi from "../service/tray.api";

const useTrayData = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sortState, setSortState] = useState<SortingState>([]);
  const [keyword, setKeyword] = useState<string>();
  const [totalRows, setTotalRows] = useState<number>(0);
  const [id, setId] = useState<string>();
  const fetchTrayDataFunction = async () => {
    try {
      const response = await TrayApi.getTrays({
        paging: pagination, // Pass the pagination state
        sort: sortState, // Pass the sort state
        keyword, // Pass the keyword
      });
      setTotalRows(response?.totalCount ?? 0);
      // Return the data from the response
      return response?.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  // Define your initial query key, including dependencies like pagination, sorting, and keyword
  // TODO: use debounce technique to prevent many calls at a short time
  const queryKey = ["trays", pagination, sortState, keyword];

  // Fetch order data using React Query's useQuery hook
  const {
    data: TrayData,
    refetch: refreshTrayData,
    //  isLoading, error
  } = useQuery(queryKey, fetchTrayDataFunction, {
    onError: (err) => console.log("error at hook", err),
  });

  const updateTrayFunction = async (tray: Tray) => {
    const response = await TrayApi.updateTray(tray);
    // You can handle the success scenario here if needed
    return response?.data; // Return the updated order data
  };
  const updateTray = useMutation(updateTrayFunction, {
    // You can specify onSuccess and onError callbacks here
  });
  const createTrayFunction = async (tray: Tray) => {
    const response = await TrayApi.createTray(tray);
    // You can handle the success scenario here if needed
    return response?.data; // Return the updated order data
  };
  const createTray = useMutation(createTrayFunction, {
    // You can specify onSuccess and onError callbacks here
  });
  // Define the deleteDishFunction to delete an order using the OrderApi
  const deleteTrayFunction = async (id: string) => {
    const response = await TrayApi.deleteTray(id);
    // You can handle the success scenario here if needed
    return response?.data; // Return any data indicating the success of deletion
  };
  const deleteTray = useMutation(deleteTrayFunction, {
    // You can specify onSuccess and onError callbacks here
  });
  const getTrayDetailFunction = async () => {
    console.log("Id", id);

    const response = await TrayApi.getTrayDetail(id);
    return response.data;
  };

  const { data: DishDetail, isLoading: isLoadingDetail } = useQuery(
    ["TrayDetail", id],
    getTrayDetailFunction,
    {}
  );

  return {
    TrayData,
    setSortState,
    setKeyword,
    setPagination,
    updateTray,
    deleteTray,
    DishDetail,
    createTray,
    setId,
    totalRows,
    refreshTrayData,
    detailState: {
      isLoadingDetail,
    },
  };
};

export default useTrayData;
