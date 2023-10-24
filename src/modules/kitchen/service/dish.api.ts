import axiosClient from "@/base/service/axiosClient";
import { ResponseObject } from "@/base/service/response";
import { Dish } from "@/types/@mk/entity/dish";
import {
  PaginationState,
  SortingState
} from "@tanstack/react-table";

interface DishGetParams {
  paging?: PaginationState;
  sort?: SortingState;
  keyword?: string;
  // filter :
}

const DishApi = {
  getDishs: async (params: DishGetParams):Promise<ResponseObject<Dish[]>> => {
    const endpoint = "/dish";
     const response = await axiosClient.get<ResponseObject<Dish[]>>(endpoint, {
      params: { 
        PageNumber: params.paging.pageIndex + 1 ?? 1,
        PageSize: params.paging?.pageSize ?? 10

       },
    });


    return response.data;
  },
  getDishDetail: (id: string) => {
    const endpoint = "/dish/"+id;
    return axiosClient.get<ResponseObject<Dish>>(endpoint, {
      params: {
        id,
      },
    });
  },
  createDish: (dish: Dish) => {
    const endpoint = "/dish";
    return axiosClient.post(endpoint, dish);
  },
  updateDish: (dish: Dish) => {
    const endpoint = "/dish";
    return axiosClient.put(endpoint, dish,{
      params: {
        dishId: dish?.id
      }
    });
  },
  deleteDish: (id: string) => {
    const endpoint = "/dish";
    return axiosClient.delete(endpoint, {
      params: { dishId:id },
    });
  },
};
export default DishApi;
