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
const orderKeyMap = {
  no : "No",
  totalPrice: "TotalPrice",
  createdDate: "CreatedDate",
  status: "Status"
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
              ToDate: moment(params?.filter?.to?.value as string).add(30, "hours").add(59, "minutes").toISOString(),
            }
          : {}),
        ...(!!params?.filter?.from?.value ?? false
          ? {
              FromDate: moment(
                params?.filter?.from?.value as string
              ).add(7, "hours").toISOString(),
            }
          : {}),
        ...(!!params?.filter?.tab?.value  ?? false ? {
          OrderStatus : params?.filter?.tab?.value
        }:{}),
        ...((!!params?.sort ?? false) && (!!params?.sort?.[0] ?? false) ? {
          OrderBy: `${orderKeyMap[params?.sort?.[0]?.id??"no"]??"CreatedDate"}:${params?.sort?.[0]?.desc? "desc" : "asc"}`,

        } :{})
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
  exportOrder: async ({ApiEndpoint,EmailSender}:{
    ApiEndpoint: string
    EmailSender: string
  })=>{
    const endpoint = "/order/xlsx";
    return await axiosClient.get(endpoint, {
      params : {
        ApiEndpoint,
        EmailSender
      }
    })
  }
};
export default OrderApi;
