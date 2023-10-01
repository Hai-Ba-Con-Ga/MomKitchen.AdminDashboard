import axiosClient from "@/base/service/axiosClient";
import { ResponseObject } from "@/base/service/response";
import { OrderPaymentAdmin } from "@/types/@mk/entity/orderPayment";
import { PaginationState, SortingState } from "@tanstack/react-table";

interface PaymentGetParams {
    paging?: PaginationState;
    sort?: SortingState;
    keyword?: string;
    // filter :
  }
const OrderPaymentApi = {
     getOrderPayments: (params: PaymentGetParams) => {
    const endpoint = "/order-payments";
    return axiosClient.get<ResponseObject<OrderPaymentAdmin[]>>(endpoint, {
      params: { ...params },
    });
  },
  getPaymentDetail: (id: number) => {
    const endpoint = "/order-payment";
    return axiosClient.get<ResponseObject<OrderPaymentAdmin>>(endpoint, {
      params: {
        id,
      },
    });
  },
  updatePayment: (payment: OrderPaymentAdmin) => {
    const endpoint = "/order-payment";
    return axiosClient.put(endpoint, payment);
  },
  deletePayment: (id: number) => {
    const endpoint = "/order-payment";
    return axiosClient.delete(endpoint, {
      params: { id },
    });
  },
}

export default OrderPaymentApi
