import { Customer, CustomerAdmin } from "@/types/@mk/entity/customer";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import CustomerApi from "../service/customer.api";

const useCustomerData = () => {
  // const [orderData, setOrderData] = useState<OrderAdmin>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sortState, setSortState] = useState<SortingState>([]);
  const [keyword, setKeyword] = useState<string>();

  // Define the fetchCustomerDataFunction that fetches orders using the OrderApi
  const fetchCustomerDataFunction = async () => {
    try {
      const response = await CustomerApi.getCustomers({
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
  const queryKey = ["orders", pagination, sortState, keyword];

  // Fetch order data using React Query's useQuery hook
  const {
    data: customerData,
    //  isLoading, error
  } = useQuery(queryKey, fetchCustomerDataFunction, {
    onError: (err) => console.log("error at hook", err),
  });
  const createCustomerFunction = async (customer: Customer) => {
    const response = await CustomerApi.createCustomer(customer);
    return response.data;
  };
  const createCustomer = useMutation(createCustomerFunction, {
    // You can specify onSuccess and onError callbacks here
  });

  // Define your mutation functions for creating, updating, and deleting orders
  //  const createOrder = useMutation(createOrderFunction, {
  //    // You can specify onSuccess and onError callbacks here
  //  });
  // Define the updateCustomerFunction to update an order using the OrderApi
  const updateCustomerFunction = async (customer: CustomerAdmin) => {
    const response = await CustomerApi.updateCustomer(customer);
    // You can handle the success scenario here if needed
    return response?.data; // Return the updated order data
  };

  const updateCustomer = useMutation(updateCustomerFunction, {
    // You can specify onSuccess and onError callbacks here
  });
  // Define the deleteCustomerFunction to delete an order using the OrderApi
  const deleteCustomerFunction = async (id: number) => {
    const response = await CustomerApi.deleteCustomer(id);
    // You can handle the success scenario here if needed
    return response?.data; // Return any data indicating the success of deletion
  };
  const deleteCustomer = useMutation(deleteCustomerFunction, {
    // You can specify onSuccess and onError callbacks here
  });

  return {
    customerData,
    setSortState,
    setKeyword,
    setPagination,
    updateCustomer,
    deleteCustomer,
    createCustomer,
  };
};

export default useCustomerData;
