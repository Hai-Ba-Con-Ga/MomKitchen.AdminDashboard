import React from "react";
import * as Yup from "yup";
import useCustomerData from "./useCustomerData";
import { Customer } from "@/types/@mk/entity/customer";
import { CustomerStatus } from "@/types/@mk/enum/customerStatus";
import useAwsS3 from "@/base/hooks/useAwsS3";

export interface ManipulateCustomerForm {
  fullname?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  autoPassword?: boolean;
  status?: string;
  avatar?: File;
}

const useCustomerForm = () => {
  const {
    createCustomer: {
      mutateAsync: createCustomer,
      isLoading: isCreateCustomer,
    },
  } = useCustomerData();
  const {putObject} = useAwsS3();
  const CustomerSchema = Yup.object().shape({
    fullname: Yup.string().max(255).required("Name is required"),
    phone: Yup.string()
      .required("Phone is required")
      .max(16, "Must be a valid phone")
      .matches(/^\+[\d+]|[\d+]*$/, "Must be a valid phone"),
    email: Yup.string()
      .max(255)
      .required("Email is required")
      .email("Must be a valid email"),
    autoPassword: Yup.boolean(),
    birthday: Yup.string().required(),
    role: Yup.string().required(),
    password: Yup.string().when("autoPassword", (autoPassword, schema) => {
      if (!autoPassword[0]) {
        return schema.required();
      } else {
        return schema.notRequired();
      }
    }),
    confirmPassword: Yup.string().when(
      ["autoPassword", "password"],
      ([autoPassword, password], schema) => {
        {
          console.log("Auto Password in yup => ", autoPassword);
          console.log("Password in yup => ", password);

          if (!autoPassword && !!password) {
            return schema
              .required("Confirm Password is required")
              .oneOf(
                [Yup.ref("password"), null],
                "Confirm Password does not match"
              );
          } else {
            return schema;
          }
        }
      }
    ),
    status: Yup.string().required(),
  });
  const createCustomerHandler = async (formValues: ManipulateCustomerForm) => {
   
    const {
      avatar,
      fullname: fullName,
      email,
      password,
      phone,
      birthday,
      role,
      status,
    } = formValues;
    let objectPath = null
    if(avatar){
      objectPath = await putObject({
        object: avatar,
        path : "customer/avatar/"
      });
      console.log("Uploaded object path => ", objectPath);
    }
    const newCustomer: Customer = {
      user: {
        fullName,
        email,
        password,
        phone,
        birthday,
        roleId: role,
        avatarUrl: objectPath,
      },
      status: CustomerStatus[status],
    };
    console.log("New customer => ", newCustomer);
    
    // const res = await createCustomer(newCustomer);
    // return res;
  };
  return {
    CustomerSchema,
    createCustomerHandler,
    isCreateCustomer,
  };
};

export default useCustomerForm;
