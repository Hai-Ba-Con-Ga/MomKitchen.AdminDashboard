import UserApi from '@/modules/kitchen/service/user.api';
import { CustomerAdmin } from '@/types/@mk/entity/customer';
import { User } from '@/types/@mk/entity/user';
import { PaginationState, SortingState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';


const useUserData = () => {
  // const [orderData, setOrderData] = useState<OrderAdmin>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sortState, setSortState] = useState<SortingState>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [roleName, setRoleName] = useState<"Admin"| "Customer" | "Kitchen"|null>(null);
//   const [id,setId] = useState<string>();
   // Define the fetchOrderDataFunction that fetches orders using the OrderApi
   const fetchOrderDataFunction = async () => {
    try {
      const response = await UserApi.getUsers({
        paging: pagination, // Pass the pagination state
        sort: sortState,     // Pass the sort state
        keyword,             // Pass the keyword
      });
      // Return the data from the response
      return response?.data;
    }
    catch(e){
      console.log(e);
      throw e
    }
  };
  
 
   // Define your initial query key, including dependencies like pagination, sorting, and keyword 
   // use debounce technique to prevent many calls at a short time
   const queryKey = ['users', pagination, sortState, keyword, roleName];

   // Fetch order data using React Query's useQuery hook
   const { data: userData,
    refetch: refetchData
    //  isLoading, error
     } = useQuery(queryKey, fetchOrderDataFunction,{
    onError:(err) => console.log("error at hook",err),
    enabled: false
   });
  //  useEffect(()=>{
  //   refetchData()
  // },[keyword])
 
   
//   // Define the updateOrderFunction to update an order using the OrderApi
  const updateUserFunction = async (user: User) => {
      const response = await UserApi.updateUser(user);
      // You can handle the success scenario here if needed
      return response.data; // Return the updated order data
  };
   const updateUser = useMutation(updateUserFunction, {
     // You can specify onSuccess and onError callbacks here
   });
   const createCustomerFunction = async (customer: CustomerAdmin) => {
    const response = await UserApi.createCustomer(customer);
    return response.data
   }
   const createCustomer = useMutation(createCustomerFunction, {
    // You can specify onSuccess and onError callbacks here
  });
//    // Define the deleteOrderFunction to delete an order using the OrderApi
//   const deleteOrderFunction = async (id: string) => {
//       const response = await OrderApi.deleteOrder(id);
//       // You can handle the success scenario here if needed
//       return response.data; // Return any data indicating the success of deletion
   
//   };
//    const deleteOrder = useMutation(deleteOrderFunction, {
//      // You can specify onSuccess and onError callbacks here
//    });

  return { 
    userData, setSortState, setKeyword, setPagination,
    setRoleName, refetchData, keyword,
    updateUser,createCustomer,
    //  updateOrder, deleteOrder, setId, orderDetailData
    };
}

export default useUserData