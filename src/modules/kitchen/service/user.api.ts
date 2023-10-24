import axiosClient from "@/base/service/axiosClient";
import { ResponseObject } from "@/base/service/response";
import { CustomerAdmin } from "@/types/@mk/entity/customer";
import { User } from "@/types/@mk/entity/user";
import {
  PaginationState,
  SortingState
} from "@tanstack/react-table";
import { Endpoint } from "aws-sdk";

interface UserGetParams {
  paging?: PaginationState;
  sort?: SortingState;
  keyword?: string;
  roleName?: "Customer" | "Kitchen" | "Admin"
  // filter :
}

const UserApi = {
  getUsers: async (params: UserGetParams):Promise<ResponseObject<User[]>> => {
    const endpoint = "/user";
     const response = await axiosClient.get<ResponseObject<User[]>>(endpoint, {
      params: { 
        PageNumber: params.paging.pageIndex + 1 ?? 1,
        PageSize: params.paging?.pageSize ?? 10,
        searchKey: params?.keyword ?? "",
        roleName : params?.roleName ?? null
       },
    });


    return response.data;
  },
  getUserDetail: (id: string) => {
    const endpoint = "/user/"+id;
    return axiosClient.get<ResponseObject<User>>(endpoint, {
      params: {
        id,
      },
    });
  },
  updateUser: (User: User) => {
    const endpoint = "/user/"+User.id;
    return axiosClient.put(endpoint, User);
  },
  deleteUser: (id: number) => {
    const endpoint = "/user";
    return axiosClient.delete(endpoint, {
      params: { id },
    });
  },
  createCustomer : (customer: CustomerAdmin )=> {
    const endpoint = "/user";
    return axiosClient.post(endpoint,{
      email : customer?.email,
      fullName : customer?.email,
      "avatarUrl": customer?.avatarUrl?? null,
      "phone": customer?.phone,
      "roleName": "Customer",
      "birthday": customer?.birthday
    });
  }
};
export default UserApi;
