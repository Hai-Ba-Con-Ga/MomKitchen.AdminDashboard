import { KitchenAdmin } from '@/types/@mk/entity/kitchen';
import { PaginationState, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import KitchenApi from '../service/kitchen.api';


const useKitchenData = () => {
// const [orderData, setOrderData] = useState<OrderAdmin>();
const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sortState, setSortState] = useState<SortingState>([]);
  const [keyword, setKeyword] = useState<string>();
  const [totalRows, setTotalRows] = useState<number>(0);
   // Define the fetchKitchenDataFunction that fetches orders using the OrderApi
   const fetchKitchenDataFunction = async () => {
    try {
      const response = await KitchenApi.getKitchens({
        paging: pagination, // Pass the pagination state
        sort: sortState,     // Pass the sort state
        keyword,             // Pass the keyword
      });
      setTotalRows(response?.totalCount ?? 0);
      // Return the data from the response
      return response?.data;
    }
    catch(e){
      console.log(e);
      throw e
    }
  };
   // Define your initial query key, including dependencies like pagination, sorting, and keyword 
   // TODO: use debounce technique to prevent many calls at a short time
   const queryKey = ['orders', pagination, sortState, keyword];

   // Fetch order data using React Query's useQuery hook
   const { data: kitchenData,
    //  isLoading, error
     } = useQuery(queryKey, fetchKitchenDataFunction,{
    onError:(err) => console.log("error at hook",err)
    
   });
 
   // Define your mutation functions for creating, updating, and deleting orders
  //  const createOrder = useMutation(createOrderFunction, {
  //    // You can specify onSuccess and onError callbacks here
  //  });
  // Define the updateKitchenFunction to update an order using the OrderApi
  const updateKitchenFunction = async (kitchen: KitchenAdmin) => {
      const response = await KitchenApi.updateKitchen(kitchen);
      // You can handle the success scenario here if needed
      return response?.data; // Return the updated order data
  };
   const updateKitchen = useMutation(updateKitchenFunction, {
     // You can specify onSuccess and onError callbacks here
   });
   // Define the deleteKitchenFunction to delete an order using the OrderApi
  const deleteKitchenFunction = async (id: number) => {
      const response = await KitchenApi.deleteKitchen(id);
      // You can handle the success scenario here if needed
      return response?.data; // Return any data indicating the success of deletion
   
  };
   const deleteKitchen = useMutation(deleteKitchenFunction, {
     // You can specify onSuccess and onError callbacks here
   });

  return { kitchenData, setSortState, setKeyword, setPagination, updateKitchen, deleteKitchen, totalRows };
}

export default useKitchenData