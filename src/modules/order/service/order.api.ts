import axiosClient from "@/base/service/axiosClient";
import { ResponseObject } from "@/base/service/response";
import { OrderAdmin } from "@/types/@mk/entity/order";
import {
  PaginationState,
  SortingState
} from "@tanstack/react-table";

interface OrderGetParams {
  paging?: PaginationState;
  sort?: SortingState;
  keyword?: string;
  // filter :
}
const OrderApi = {
  getOrders: async (params: OrderGetParams) => {
    const endpoint = "/order";
    const res =  await axiosClient.get<ResponseObject<OrderAdmin[]>>(endpoint, {
      params: { ...params },
    });
    return res.data
  },
  getOrderDetail: async (id: string) => {
    const endpoint = "/order/"+id;
    return (await axiosClient.get<ResponseObject<OrderAdmin>>(endpoint, {
      params: {
        id,
      },
    })).data?.data;
  },
  updateOrder: (order: OrderAdmin) => {
    const endpoint = "/order";
    return axiosClient.put(endpoint, order);
  },
  deleteOrder: (id: string) => {
    const endpoint = "/order/"+id;
    return axiosClient.delete(endpoint, {
      params: { id },
    });
  },
};
export default OrderApi;
