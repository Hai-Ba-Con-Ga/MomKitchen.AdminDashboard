import axiosClient from "@/base/service/axiosClient";
import { ResponseObject } from "@/base/service/response";
import { AreaAdmin } from "@/types/@mk/entity/area";
import { PaginationState, SortingState } from "@tanstack/react-table";

interface AreaGetParams {
    paging?: PaginationState;
    sort?: SortingState;
    keyword?: string;
    // filter :
  }
const AreaApi = {
     getAreas: (params: AreaGetParams) => {
    const endpoint = "/areas";
    return axiosClient.get<ResponseObject<AreaAdmin[]>>(endpoint, {
      params: { ...params },
    });
  },
  getAreaDetail: (id: number) => {
    const endpoint = "/area";
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
  deleteArea: (id: number) => {
    const endpoint = "/area";
    return axiosClient.delete(endpoint, {
      params: { id },
    });
  },
}

export default AreaApi
