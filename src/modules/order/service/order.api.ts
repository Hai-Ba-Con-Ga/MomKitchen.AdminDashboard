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
  getOrders: (params: OrderGetParams) => {
    const endpoint = "/orders";
    return axiosClient.get<ResponseObject<OrderAdmin[]>>(endpoint, {
      params: { ...params },
    });
  },
  getOrderDetail: (id: number) => {
    const endpoint = "/order";
    return axiosClient.get<ResponseObject<OrderAdmin>>(endpoint, {
      params: {
        id,
      },
    });
  },
  updateOrder: (order: OrderAdmin) => {
    const endpoint = "/order";
    return axiosClient.put(endpoint, order);
  },
  deleteOrder: (id: number) => {
    const endpoint = "/order";
    return axiosClient.delete(endpoint, {
      params: { id },
    });
  },
};
export default OrderApi;
