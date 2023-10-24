import { Dish } from '@/types/@mk/entity/dish';
import { PaginationState, SortingState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import DishApi from '../service/dish.api';
import UserApi from '../service/user.api';

const useDishData = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 25,
      });
      const [sortState, setSortState] = useState<SortingState>([]);
      const [keyword, setKeyword] = useState<string>();
      const [totalRows, setTotalRows] = useState<number>(0);
      const [id, setId] = useState<string>();
      const [ownerId, setOwnerId] = useState<string>();
       // Define the fetchDishDataFunction that fetches orders using the OrderApi
       const fetchDishDataFunction = async () => {
        try {
          const response = await DishApi.getDishs({
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
       const queryKey = ['dishs', pagination, sortState, keyword];
    
       // Fetch order data using React Query's useQuery hook
       const { data: DishData,
        refetch : refreshDishData
        //  isLoading, error
         } = useQuery(queryKey, fetchDishDataFunction,{
        onError:(err) => console.log("error at hook",err)
        
       });
     
       // Define your mutation functions for creating, updating, and deleting orders
      //  const createOrder = useMutation(createOrderFunction, {
      //    // You can specify onSuccess and onError callbacks here
      //  });
      // Define the updateDishFunction to update an order using the OrderApi
      const updateDishFunction = async (Dish: Dish) => {
          const response = await DishApi.updateDish(Dish);
          // You can handle the success scenario here if needed
          return response?.data; // Return the updated order data
      };
       const updateDish = useMutation(updateDishFunction, {
         // You can specify onSuccess and onError callbacks here
       });
      // Define the updateDishFunction to update an order using the OrderApi
      const createDishFunction = async (Dish: Dish) => {
          const response = await DishApi.createDish(Dish);
          // You can handle the success scenario here if needed
          return response?.data; // Return the updated order data
      };
       const createDish = useMutation(createDishFunction, {
         // You can specify onSuccess and onError callbacks here
       });
       // Define the deleteDishFunction to delete an order using the OrderApi
      const deleteDishFunction = async (id: string) => {
          const response = await DishApi.deleteDish(id);
          // You can handle the success scenario here if needed
          return response?.data; // Return any data indicating the success of deletion
       
      };
      const deleteDish = useMutation(deleteDishFunction, {
        // You can specify onSuccess and onError callbacks here
      });
      useEffect(()=>{
        console.log("Effect",id);
      },[id])
       const getDishDetailFunction = async () => {
        console.log("Id",id);
        
        const response =  await DishApi.getDishDetail(id);
        return response.data;
       }
    
       const {data: DishDetail, isLoading: isLoadingDetail} = useQuery(["DishDetail",id],getDishDetailFunction,{});
      useEffect(()=>{
        console.log("Effect",ownerId);
      },[ownerId])
       const getOwnerDetailFunction = async () => {
        
        const response =  await UserApi.getUserDetail(ownerId);
        return response?.data?.data;
       }
    
       const {data: ownerDetail} = useQuery(["DishDetail", ownerId],getOwnerDetailFunction,{});
      return { DishData, setSortState, setKeyword, setPagination, updateDish, deleteDish,DishDetail, createDish, setId, totalRows,refreshDishData, ownerDetail, setOwnerId, detailState: {
        isLoadingDetail
      } };
}

export default useDishData