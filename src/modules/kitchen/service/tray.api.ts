import axiosClient from "@/base/service/axiosClient";
import { ResponseObject } from "@/base/service/response";
import { Tray } from "@/types/@mk/entity/tray";

import { PaginationState, SortingState } from "@tanstack/react-table";

interface TrayGetParams {
  paging?: PaginationState;
  sort?: SortingState;
  keyword?: string;
  // filter :
}

const TrayApi = {
  getTrays: async (params: TrayGetParams): Promise<ResponseObject<Tray[]>> => {
    const endpoint = "/tray";
    const response = await axiosClient.get<ResponseObject<Tray[]>>(endpoint, {
      params: {
        PageNumber: params.paging.pageIndex + 1 ?? 1,
        PageSize: params.paging?.pageSize ?? 10,
      },
    });

    return response.data;
  },
  getTrayDetail: (id: string) => {
    const endpoint = "/tray/" + id;
    return axiosClient.get<ResponseObject<Tray>>(endpoint, {
      params: {
        id,
      },
    });
  },
  createTray: (tray: Tray) => {
    const endpoint = "/tray";
    return axiosClient.post(endpoint, tray);
  },
  updateTray: (tray: Tray) => {
    const endpoint = "/tray";
    return axiosClient.put(endpoint, tray, {
      params: {
        TrayId: tray?.id,
      },
    });
  },
  deleteTray: (id: string) => {
    const endpoint = "/tray";
    return axiosClient.delete(endpoint, {
      params: { TrayId: id },
    });
  },
};
export default TrayApi;
