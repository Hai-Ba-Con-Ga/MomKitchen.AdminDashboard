import { Area, AreaAdmin } from "@/types/@mk/entity/area";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import AreaApi from "../services/area.api";

const useAreaData = () => {
  // const [orderData, setOrderData] = useState<OrderAdmin>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [kitchenPagination, setKitchenPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [totalRows, setTotalRows] = useState<number>(0);
  const [totalKitchenRows, setTotalKitchenRows] = useState<number>(0);
  const [sortState, setSortState] = useState<SortingState>([]);
  const [keyword, setKeyword] = useState<string>();
  const [id, setId] = useState<string>();
  console.log(id);

  // Define the fetchKitchenDataFunction that fetches orders using the OrderApi
  const fetchAreaDataFunction = async () => {
    try {
      const response = await AreaApi.getAreas({
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
  const queryKey = ["areas", pagination, sortState, keyword];

  // Fetch order data using React Query's useQuery hook
  const {
    data: areaData,
    refetch: refreshAreaData,
    //  isLoading, error
  } = useQuery(queryKey, fetchAreaDataFunction, {
    onError: (err) => console.log("error at hook", err),
  });
  const fetchAreaKitchenDataFunction = async () => {
    try {
      const response = await AreaApi.getKitchenInArea(id, {
        paging: kitchenPagination, // Pass the pagination state
      });
      // Return the data from the response
      console.log(response?.totalCount);

      setTotalKitchenRows(response?.totalCount ?? 0);
      return response?.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  // Fetch order data using React Query's useQuery hook
  const {
    data: areaKitchenData,
    //  isLoading, error
  } = useQuery(
    ["kitchenarea", kitchenPagination, id],
    fetchAreaKitchenDataFunction,
    {
      onError: (err) => console.log("error at hook", err),
    }
  );

  // Define your mutation functions for creating, updating, and deleting orders
  //  const createOrder = useMutation(createOrderFunction, {
  //    // You can specify onSuccess and onError callbacks here
  //  });
  // Define the updateKitchenFunction to update an order using the OrderApi
  const updateKitchenFunction = async (area: AreaAdmin) => {
    const response = await AreaApi.updateArea(area);
    // You can handle the success scenario here if needed
    return response?.data; // Return the updated order data
  };
  const updateKitchen = useMutation(updateKitchenFunction, {
    // You can specify onSuccess and onError callbacks here
  });

  const createAreaFunction = async (area: Area) => {
    const response = await AreaApi.createArea(area);
    // You can handle the success scenario here if needed
    return response?.data; // Return the updated order data
  };
  const createArea = useMutation(createAreaFunction, {
    // You can specify onSuccess and onError callbacks here
  });
  // Define the deleteKitchenFunction to delete an order using the OrderApi
  const deleteAreaFunction = async (id: string) => {
    const response = await AreaApi.deleteArea(id);
    // You can handle the success scenario here if needed
    return response?.data; // Return any data indicating the success of deletion
  };
  const deleteArea = useMutation(deleteAreaFunction, {
    // You can specify onSuccess and onError callbacks here
  });

  return {
    areaData,
    setSortState,
    setKeyword,
    setPagination,
    updateKitchen,
    deleteArea,
    setId,
    areaKitchenData,
    setKitchenPagination,
    totalKitchenRows,
    totalRows,
    createArea,
    refreshAreaData,
  };
};

export default useAreaData;
