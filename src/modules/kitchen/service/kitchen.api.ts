import axiosClient from "@/base/service/axiosClient";
import { ResponseObject } from "@/base/service/response";
import { Dish } from "@/types/@mk/entity/dish";
import { Kitchen, KitchenAdmin, KitchenResponse } from "@/types/@mk/entity/kitchen";
import { Meal } from "@/types/@mk/entity/meal";
import { Tray } from "@/types/@mk/entity/tray";
import {
  PaginationState,
  SortingState
} from "@tanstack/react-table";
import axios from "axios";

interface KitchenGetParams {
  paging?: PaginationState;
  sort?: SortingState;
  keyword?: string;
  // filter :
}
export interface UpdateKitchenRequest {
  "name": string,
  "location": {
    "lat": number,
    "lng": number
  },
  address?: string,
  id?: string
}
const KitchenApi = {
  getKitchens: async (params: KitchenGetParams):Promise<ResponseObject<KitchenAdmin[]>> => {
    const endpoint = "/kitchen";
    console.log("SortingState => ",params.sort);
    const sortStateFirst:any = params?.sort?.[0]  ?? {}
    const id = sortStateFirst?.id == "no" ? "No" : sortStateFirst?.id =="status" ? "Status": sortStateFirst?.id == "name" ? "Name" :
    sortStateFirst?.id == "area_name" ? "AreaId" :  "";
     const response = await axiosClient.get<ResponseObject<KitchenResponse[]>>(endpoint, {
      params: { 
        PageNumber: params.paging.pageIndex + 1 ?? 1,
        PageSize: params.paging?.pageSize ?? 10,
        ...(id == "No" || id == "Status" || id == "Name"|| id=="AreaId")?{
          OrderBy: `${id}:${sortStateFirst?.desc ?"desc": "asc"}`
        }:{},
        KeySearch : params?.keyword ??""
       },
    });

    const mappedResponse:ResponseObject<KitchenAdmin[]> = {
      ...response?.data,
      
      data: response?.data?.data.map(({no,id, name,address,area, location, owner, noOfDish,noOfMeal,noOfTray,rating,status}) => ({
        id,
        no,
        address,
        name,
        noOfDish,
        noOfMeal, 
        noOfTray,
        rating,
        status,
        locationId:location?.id ,
        areaId: area?.id , 
        ownerId: owner?.ownerId,
        area : {
          name : area?.name ,
          id: area?.id,
        },
        location : {
          id: location?.id ,
          lat: location?.lat ,
          lng: location?.lng 
        },
        owner: {
          fullName: owner?.ownerName ,
          avatarUrl: owner?.ownerAvatarUrl ,
          id: owner?.ownerId ,
          email: owner?.ownerEmail 
        }
      }))
    }
    console.log("at api call", mappedResponse);
    
    return mappedResponse;
  },
  getKitchenDetail: (id: string) => {
    console.log("id + ",id);
    
    const endpoint = "/kitchen/"+id;
    return axiosClient.get<ResponseObject<KitchenAdmin>>(endpoint, {
      params: {
        id,
      },
    });
  },
  updateKitchen: (kitchen: UpdateKitchenRequest) => {
    const endpoint = "/kitchen/"+kitchen?.id;
    return axiosClient.put(endpoint, kitchen);
  },
  deleteKitchen: (id: string) => {
    const endpoint = `/kitchen/${id}`;
    return axiosClient.delete(endpoint, {
      params: { id },
    });
  },
  getKitchenDish: (id:string, params: KitchenGetParams) => {
    const endpoint = `/kitchen/${id}/dishes`; 
    const response = axiosClient.get<ResponseObject<Dish[]>>(endpoint, {
      params: { 
        PageNumber: params.paging.pageIndex + 1 ?? 1,
        PageSize: params.paging?.pageSize ?? 10
       },
    });
    return response;
  },
  getKitchenTray: (id:string, params: KitchenGetParams) => {
    const endpoint = `/kitchen/${id}/trays`; 
    const response = axiosClient.get<ResponseObject<Tray[]>>(endpoint, {
      params: { 
        PageNumber: params.paging.pageIndex + 1 ?? 1,
        PageSize: params.paging?.pageSize ?? 10
       },
    });
    return response;
  },
  getKitchenMeal: (id:string, params: KitchenGetParams) => {
    const endpoint = `/kitchen/${id}/meals`; 
    const response = axiosClient.get<ResponseObject<Meal[]>>(endpoint, {
      params: { 
        PageNumber: params.paging.pageIndex + 1 ?? 1,
        PageSize: params.paging?.pageSize ?? 10
       },
    });
    return response;
  },
  createKitchen :async (kitchen:Kitchen)=>{
    const endpoint = "/kitchen";
    const addressEndpoint = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${kitchen.location?.lat}%2C${kitchen.location?.lng}&lang=en-US&apiKey=7h1jyg35V5JfNIgPA8m1XEN39K9giRbtrfNj8nJ5kd4`
    const address = (await axios.get(addressEndpoint)).data;
    let addressString = "Unknown";
    if(address){
      addressString = address?.items?.[0]?.title??"Unknown"
    }
    const res = await axiosClient.post(endpoint, {
      name : kitchen?.name,
      address: addressString,
      status: "ACTIVE",
      location : kitchen?.location,
      ownerId : kitchen?.ownerId,
      areaId : kitchen?.areaId
    })
    return res.data
  }
};
export default KitchenApi;
