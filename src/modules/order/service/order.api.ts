import axiosClient from "@/base/service/axiosClient";
import { ResponseObject } from "@/base/service/response";
import { OrderAdmin } from "@/types/@mk/entity/order";
import { FilterState } from "@/types/common/pagination/FilterState";
import { PaginationState, SortingState } from "@tanstack/react-table";
import moment from "moment";

interface OrderGetParams {
  paging?: PaginationState;
  sort?: SortingState;
  keyword?: string;
  filter?: FilterState;
}
const OrderApi = {
  getOrders: async (params: OrderGetParams) => {
    const endpoint = "/order";
    console.log(params);

    const res = await axiosClient.get<ResponseObject<OrderAdmin[]>>(endpoint, {
      params: {
        PageNumber: params.paging.pageIndex + 1 ?? 1,
        PageSize: params.paging?.pageSize ?? 10,
        KeySearch: params?.keyword,
        ...(!!params?.filter?.to?.value ?? false
          ? {
              ToDate: moment(params?.filter?.to?.value as string).toISOString(),
            }
          : {}),
        ...(!!params?.filter?.from?.value ?? false
          ? {
              FromDate: moment(
                params?.filter?.from?.value as string
              ).toISOString(),
            }
          : {}),
      },
    });
    return res.data;
  },
  getOrderDetail: async (id: string) => {
    const endpoint = "/order/" + id;
    return (
      await axiosClient.get<ResponseObject<OrderAdmin>>(endpoint, {
        params: {
          id,
        },
      })
    ).data?.data;
  },
  updateOrder: (order: OrderAdmin) => {
    const endpoint = "/order";
    return axiosClient.put(endpoint, order);
  },
  deleteOrder: (id: string) => {
    const endpoint = "/order/" + id;
    return axiosClient.delete(endpoint, {
      params: { id },
    });
  },
};
export default OrderApi;
