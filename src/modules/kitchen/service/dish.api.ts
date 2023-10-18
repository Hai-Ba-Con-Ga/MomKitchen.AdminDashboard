import axiosClient from "@/base/service/axiosClient";
import { ResponseObject } from "@/base/service/response";
import { Dish } from "@/types/@mk/entity/dish";
import { KitchenAdmin, KitchenResponse } from "@/types/@mk/entity/kitchen";
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
  updateDish: (Dish: Dish) => {
    const endpoint = "/dish";
    return axiosClient.put(endpoint, Dish);
  },
  deleteDish: (id: number) => {
    const endpoint = "/dish";
    return axiosClient.delete(endpoint, {
      params: { id },
    });
  },
};
export default DishApi;
