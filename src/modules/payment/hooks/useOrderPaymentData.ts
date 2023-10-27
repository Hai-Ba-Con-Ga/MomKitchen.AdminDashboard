import { OrderPayment } from "@/types/@mk/entity/orderPayment";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import OrderPaymentApi from "../services/payment.api";

const useOrderPaymentData = () => {
  // const [orderData, setOrderData] = useState<OrderAdmin>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sortState, setSortState] = useState<SortingState>([]);
  const [keyword, setKeyword] = useState<string>();

  // Define the fetchKitchenDataFunction that fetches orders using the OrderApi
  const fetchOrderPaymentDataFunction = async () => {
    try {
      const response = await OrderPaymentApi.getOrderPayments({
        paging: pagination, // Pass the pagination state
        sort: sortState, // Pass the sort state
        keyword, // Pass the keyword
      });
      // Return the data from the response
      return response?.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  // Define your initial query key, including dependencies like pagination, sorting, and keyword
  // TODO: use debounce technique to prevent many calls at a short time
  const queryKey = ["orderPayments", pagination, sortState, keyword];

  // Fetch order data using React Query's useQuery hook
  const {
    data: kitchenData,
    //  isLoading, error
  } = useQuery(queryKey, fetchOrderPaymentDataFunction, {
    onError: (err) => console.log("error at hook", err),
  });

  // Define your mutation functions for creating, updating, and deleting orders
  //  const createOrder = useMutation(createOrderFunction, {
  //    // You can specify onSuccess and onError callbacks here
  //  });
  // Define the updateKitchenFunction to update an order using the OrderApi
  const updateOrderPaymentFunction = async (payment: OrderPayment) => {
    const response = await OrderPaymentApi.updatePayment(payment);
    // You can handle the success scenario here if needed
    return response?.data; // Return the updated order data
  };
  const updateKitchen = useMutation(updateOrderPaymentFunction, {
    // You can specify onSuccess and onError callbacks here
  });
  // Define the deleteOrderPaymentFunction to delete an order using the OrderApi
  const deleteOrderPaymentFunction = async (id: number) => {
    const response = await OrderPaymentApi.deletePayment(id);
    // You can handle the success scenario here if needed
    return response?.data; // Return any data indicating the success of deletion
  };
  const deleteKitchen = useMutation(deleteOrderPaymentFunction, {
    // You can specify onSuccess and onError callbacks here
  });

  return {
    kitchenData,
    setSortState,
    setKeyword,
    setPagination,
    updateKitchen,
    deleteKitchen,
  };
};

export default useOrderPaymentData;
