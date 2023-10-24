import { OrderAdmin } from "@/types/@mk/entity/order";
import { PaginationState, SortingState, FilterFnOption } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import OrderApi from "../service/order.api";
import { FilterState } from "@/types/common/pagination/FilterState";


const useOrderData = (enable?:boolean) => {
  // const [orderData, setOrderData] = useState<OrderAdmin>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sortState, setSortState] = useState<SortingState>([]);
  const [keyword, setKeyword] = useState<string>();
  const [id,setId] = useState<string>();
  const [totalRows, setTotalRows] = useState<number>(0);
  const [filter, setFilter] = useState<FilterState>({});
  useEffect(()=>{
    console.log(filter);
  },[filter])

   // Define the fetchOrderDataFunction that fetches orders using the OrderApi
   const fetchOrderDataFunction = async () => {
    try {
      const response = await OrderApi.getOrders({
        paging: pagination, // Pass the pagination state
        sort: sortState,     // Pass the sort state
        keyword,             // Pass the keyword
      });
      // Return the data from the response
      if(response?.totalCount >= 0){
        setTotalRows(response?.totalCount ?? 0);
      }
      if(response?.data){
        const rawOrders = response.data
        const orders = await Promise.all(rawOrders?.map((order)=>OrderApi.getOrderDetail(order?.id)))
        return orders
        
      }
      return response?.data;
    }
    catch(e){
      console.log(e);
      throw e
    }
  };
  const fetchOrderDataDetailFunction = async () => {
    try {
      const response = await OrderApi.getOrderDetail(id);
      // Return the data from the response
      return response;
    }
    catch(e){
      console.log(e);
      throw e
    }
  };
  const { data: orderDetailData,
    //  isLoading, error
     } = useQuery("id", fetchOrderDataDetailFunction,{
    onError:(err) => console.log("error at hook",err)
    
   });
 
   // Define your initial query key, including dependencies like pagination, sorting, and keyword 
   // use debounce technique to prevent many calls at a short time
   const queryKey = ['orders', pagination, sortState, keyword];

   // Fetch order data using React Query's useQuery hook
   const { data: orderData,
    refetch: refreshOrderData
    //  isLoading, error
     } = useQuery(queryKey, fetchOrderDataFunction,{
    onError:(err) => console.log("error at hook",err),
    enabled: enable
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

  return { orderData, setSortState, setKeyword, setPagination, updateOrder, deleteOrder, setId, orderDetailData, setFilter, totalRows, refreshOrderData};
};

export default useOrderData;
