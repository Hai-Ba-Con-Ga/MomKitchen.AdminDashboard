import axiosClient from "@/base/service/axiosClient";
import { ResponseObject } from "@/base/service/response";
import { Customer, CustomerAdmin } from "@/types/@mk/entity/customer";
// import { CustomerStatus } from "@/types/@mk/enum/customerStatus";

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
    const endpoint = "/customer";
    return axiosClient.get<ResponseObject<CustomerAdmin[]>>(endpoint, {
      params: { 
        PageNumber: params.paging.pageIndex + 1 ?? 1,
        PageSize: params.paging?.pageSize ?? 10

       },
    });
  },
  getCustomerDetail: (id: string) => {
    const endpoint = "/customer/"+id;
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
  deleteCustomer: (id: string) => {
    const endpoint = "/customer/"+id;
    return axiosClient.delete(endpoint, {
      params: { id },
    });
  },
  updateStatusCustomer :  async (customerId: string, status : string) => {

    const endpoint = "/customer/"+customerId;
    const result  = await axiosClient.put(endpoint, {
      status: status == "ACTIVE" ? "INACTIVE" : "ACTIVE"
    });
    return result;
  }
};
export default CustomerApi;
