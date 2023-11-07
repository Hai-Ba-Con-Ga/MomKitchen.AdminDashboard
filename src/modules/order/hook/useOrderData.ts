import { OrderAdmin } from "@/types/@mk/entity/order";
import { FilterState } from "@/types/common/pagination/FilterState";
import { PaginationState, SortingState } from "@tanstack/react-table";
import moment from "moment";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import OrderApi from "../service/order.api";

const useOrderData = (enable?: boolean) => {
  // const [orderData, setOrderData] = useState<OrderAdmin>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sortState, setSortState] = useState<SortingState>([]);
  const [keyword, setKeyword] = useState<string>();
  const [id, setId] = useState<string>();
  const [totalRows, setTotalRows] = useState<number>(0);
  const [filter, setFilter] = useState<FilterState>({});

  // Define the fetchOrderDataFunction that fetches orders using the OrderApi
  const fetchOrderDataFunction = async () => {
    try {
      const response = await OrderApi.getOrders({
        paging: pagination, // Pass the pagination state
        sort: sortState, // Pass the sort state
        keyword,
        filter, // Pass the keyword
      });
      // Return the data from the response
        setTotalRows(()=>response?.totalCount ?? 0);
      // if(response?.data){
      //   const rawOrders = response.data
      //   const orders = await Promise.all(rawOrders?.map((order)=>OrderApi.getOrderDetail(order?.id)))
      //   return orders

      // }
      return response?.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  const fetchOrderDataDetailFunction = async () => {
    try {
      const response = await OrderApi.getOrderDetail(id);
      // Return the data from the response
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  const {
    data: orderDetailData,
    //  isLoading, error
  } = useQuery(["orderdetail", id], fetchOrderDataDetailFunction, {
    onError: (err) => console.log("error at hook", err),
  });

  // Define your initial query key, including dependencies like pagination, sorting, and keyword
  // use debounce technique to prevent many calls at a short time
  const queryKey = ["orders", pagination, sortState, keyword, filter];

  // Fetch order data using React Query's useQuery hook
  const {
    data: orderData,
    refetch: refreshOrderData,
    //  isLoading, error
  } = useQuery(queryKey, fetchOrderDataFunction, {
    onError: (err) => console.log("error at hook", err),
  });

  // Define your mutation functions for creating, updating, and deleting orders
  //  const createOrder = useMutation(createOrderFunction, {
  //    // You can specify onSuccess and onError callbacks here
  //  });
  // Define the updateOrderFunction to update an order using the OrderApi
  const updateOrderFunction = async (order: OrderAdmin) => {
    const response = await OrderApi.updateOrder(order);
    // You can handle the success scenario here if needed
    return response.data; // Return the updated order data
  };
  const updateOrder = useMutation(updateOrderFunction, {
    // You can specify onSuccess and onError callbacks here
  });
  // Define the deleteOrderFunction to delete an order using the OrderApi
  const deleteOrderFunction = async (id: string) => {
    const response = await OrderApi.deleteOrder(id);
    // You can handle the success scenario here if needed
    return response.data; // Return any data indicating the success of deletion
  };
  const deleteOrder = useMutation(deleteOrderFunction, {
    // You can specify onSuccess and onError callbacks here
  });
  const batchExportFunction = async ()=>{
    const ApiEndpoint = `http://momkitchen.wyvernpserver.tech/api/v1/order?PageNumber=1&PageSize=50${keyword?"&KeySearch="+keyword:""}${!!filter?.to?.value ?? false? "&ToDate="+ moment(filter?.to?.value as string).add(30, "hours").add(59, "minutes").utc().toISOString() :""}${!!filter?.from?.value ?? false? "&FromDate="+ moment(filter?.from?.value as string).add(7, "hours").utc().toISOString() :""}${!!filter?.tab?.value ?? false? "&OrderStatus="+ filter?.tab?.value :""}`;
    const EmailSender = "phonglethanh2@gmail.com";
    await OrderApi.exportOrder({
      ApiEndpoint,
      EmailSender
    })
    console.log({
      ApiEndpoint,
      EmailSender
    });
    
    toast.success("The exporting is being processed! You will receive email after it will have finished")
  }
  return {
    orderData,
    setSortState,
    setKeyword,
    setPagination,
    updateOrder,
    deleteOrder,
    setId,
    orderDetailData,
    setFilter,
    totalRows,
    orderTotalRows:totalRows,
    refreshOrderData,
    batchExportFunction
  };
};

export default useOrderData;
