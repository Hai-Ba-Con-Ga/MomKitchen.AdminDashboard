import axiosClient from "@/base/service/axiosClient";
import { ResponseObject } from "@/base/service/response";
import { Customer, CustomerAdmin } from "@/types/@mk/entity/customer";

import {
  PaginationState,
  SortingState
} from "@tanstack/react-table";

interface CustomerGetParams {
  paging?: PaginationState;
  sort?: SortingState;
  keyword?: string;
  // filter :
}
const CustomerApi = {
  getCustomers: (params: CustomerGetParams) => {
    const endpoint = "/customers";
    return axiosClient.get<ResponseObject<CustomerAdmin[]>>(endpoint, {
      params: { ...params },
    });
  },
  getCustomerDetail: (id: number) => {
    const endpoint = "/customer";
    return axiosClient.get<ResponseObject<CustomerAdmin>>(endpoint, {
        params: {
            id,
        },
    });
},
createCustomer: (customer : Customer) => {
      const endpoint = "/customer";
      //TODO specify return type
        return axiosClient.post<ResponseObject<any>>(endpoint, customer)
  },
  updateCustomer: (customer: CustomerAdmin) => {
    const endpoint = "/customer";
    return axiosClient.put(endpoint, customer);
  },
  deleteCustomer: (id: number) => {
    const endpoint = "/customer";
    return axiosClient.delete(endpoint, {
      params: { id },
    });
  },
};
export default CustomerApi;
