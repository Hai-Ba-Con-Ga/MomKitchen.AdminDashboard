import axiosClient from "@/base/service/axiosClient";
import { ResponseObject } from "@/base/service/response";
import { Area, AreaAdmin } from "@/types/@mk/entity/area";
import { KitchenAdmin } from "@/types/@mk/entity/kitchen";
import { PaginationState, SortingState } from "@tanstack/react-table";

interface AreaGetParams {
    paging?: PaginationState;
    sort?: SortingState;
    keyword?: string;
    // filter :
  }
const AreaApi = {
     getAreas:async  (params: AreaGetParams) => {
    const endpoint = "/area";
    return (await axiosClient.get<ResponseObject<AreaAdmin[]>>(endpoint, {
      params: { 
          PageNumber: params.paging.pageIndex + 1 ?? 1,
          PageSize: params.paging?.pageSize ?? 10         
      },
    })).data;
  },
  getAreaDetail: (id: string) => {
    const endpoint = "/area/"+id;
    return axiosClient.get<ResponseObject<AreaAdmin>>(endpoint, {
      params: {
        id,
      },
    });
  },
  updateArea: (area: AreaAdmin) => {
    const endpoint = "/area";
    return axiosClient.put(endpoint, area);
  },
  createArea: (area: Area) => {
    const endpoint = "/area";
    area?.boundaries.forEach((b,i) =>b.orderNo =i);
    return axiosClient.post(endpoint, area);
  },
  deleteArea: (id: string) => {
    const endpoint = "/area/"+id;
    return axiosClient.delete(endpoint, {
      params: { id },
    });
  },
  getKitchenInArea:async (id:string, params: AreaGetParams)=>{
    const endpoint = `/area/${id}/kitchens`;
    return (await axiosClient.get<ResponseObject<KitchenAdmin[]>>(endpoint, {
      params: { 
          PageNumber: params.paging.pageIndex + 1 ?? 1,
          PageSize: params.paging?.pageSize ?? 10         
      },
    })).data;
  }
}

export default AreaApi
