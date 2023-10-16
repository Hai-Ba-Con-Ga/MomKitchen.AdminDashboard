import axiosClient from "@/base/service/axiosClient";
import { ResponseObject } from "@/base/service/response";
import { KitchenAdmin, KitchenResponse } from "@/types/@mk/entity/kitchen";
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
  getKitchens: async (params: KitchenGetParams):Promise<ResponseObject<KitchenAdmin[]>> => {
    const endpoint = "/kitchen";
     const response = await axiosClient.get<ResponseObject<KitchenResponse[]>>(endpoint, {
      params: { 
        PageNumber: params.paging.pageIndex + 1 ?? 1,
        PageSize: params.paging?.pageSize ?? 10

       },
    });

    const mappedResponse:ResponseObject<KitchenAdmin[]> = {
      ...response.data,
      
      data: response.data.data.map(({id, name,address,area, location, owner, noOfDish,noOfMeal,noOfTray,rating,status}) => ({
        id,
        address,
        name,
        noOfDish,
        noOfMeal, 
        noOfTray,
        rating,
        status,
        locationId:location?.id,
        areaId: area?.areaId, 
        ownerId: owner?.ownerId,
        area : {
          name : area?.areaName,
          id: area?.areaId,
        },
        location : {
          id: location?.id,
          lat: location?.lat,
          lng: location?.lng
        },
        owner: {
          fullName: owner?.ownerName,
          avatarUrl: owner?.ownerAvatar,
          id: owner?.ownerId,
          email: owner?.ownerEmail
        }
      }))
    }

    return mappedResponse;
  },
  getKitchenDetail: (id: string) => {
    const endpoint = "/kitchen/"+id;
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
