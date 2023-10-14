import axiosClient from "@/base/service/axiosClient";
import { ResponseObject } from "@/base/service/response";
import { KitchenAdmin } from "@/types/@mk/entity/kitchen";
import {
  PaginationState,
  SortingState
} from "@tanstack/react-table";

interface KitchenGetParams {
  paging?: PaginationState;
  sort?: SortingState;
  keyword?: string;
  // filter :
}
const KitchenApi = {
  getKitchens: (params: KitchenGetParams) => {
    const endpoint = "/kitchen";
    return axiosClient.get<ResponseObject<KitchenAdmin[]>>(endpoint, {
      params: { 
       PageNumber: params.paging?.pageIndex+1 ?? 1,
       PageSize: params.paging?.pageSize ?? 10
       },
    });
  },
  getKitchenDetail: (id: number) => {
    const endpoint = "/kitchen";
    return axiosClient.get<ResponseObject<KitchenAdmin>>(endpoint, {
      params: {
        id,
      },
    });
  },
  updateKitchen: (kitchen: KitchenAdmin) => {
    const endpoint = "/kitchen";
    return axiosClient.put(endpoint, kitchen);
  },
  deleteKitchen: (id: number) => {
    const endpoint = "/kitchen";
    return axiosClient.delete(endpoint, {
      params: { id },
    });
  },
};
export default KitchenApi;
