import useAwsS3 from "@/base/hooks/useAwsS3";
import {
  ManipulateCustomerForm,
} from "@/modules/customer/hook/useCustomerForm";
import useUserData from "@/modules/order/hook/useUserData";
import { User } from "@/types/@mk/entity/user";
import { KitchenStatus } from "@/types/@mk/enum/kitchenStatus";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useKitchenData from "./useKitchenData";
import axios from "axios";

export interface KitchenForm extends ManipulateCustomerForm {
  name?: string;
  areaId?: string;
  position?: { lat: number; lng: number };
  userId?: string;
  user: User;
  isCreateUser?: boolean;
  address?: string;
}

const useKitchenForm = () => {
  const nav = useNavigate();
  const { createKitchenFunction, updateKitchen:{
    mutateAsync: updateKitchenFunc
  } } = useKitchenData();
  const { putObject } = useAwsS3();
  const {
    createKitchenOwner: { mutateAsync: createKitchenOwnerAsync },
  } = useUserData();
  const createKitchenHandler = async (formValues: KitchenForm) => {
    const { position, areaId, name, isCreateUser, avatar, email, phone, birthday, fullname } = formValues;
    // const location = await LocationApi.createLocation(position);
    // const locationId = location?.data
    
    if (isCreateUser) {
      formValues.userId = null;
      let objectPath = null;
      if (avatar) {
        objectPath = await putObject({
          object: avatar,
          path: "customer/avatar/",
        });
        console.log("Uploaded object path => ", objectPath);
      }
     const res = await createKitchenOwnerAsync({
        avatarUrl: objectPath,
        email,
        phone,
        birthday:  (new Date(birthday as string)).toISOString(),
        fullName : fullname
      });
      if(res?.data && res?.data?.id){
        formValues.userId = res?.data?.id; 
      }else {
        toast.error(res?.message || "There was an error try again later!");
        return;
      }

    }
    const result = await createKitchenFunction({
      name,
      ownerId: formValues?.userId,
      location: position,
      areaId,
      address: "unknown",
      status: KitchenStatus.ACTIVE,
    });
    console.log("RESULT CREATE", result);
    if (result) {
      toast.success("Create kitchen successfully ");
      nav("/kitchen");
    }
  };
  const updateKitchenHandler = async (formValues: KitchenForm,id: string) => {
    const { position, name } = formValues;
    const addressEndpoint = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${position?.lat}%2C${position?.lng}&lang=en-US&apiKey=7h1jyg35V5JfNIgPA8m1XEN39K9giRbtrfNj8nJ5kd4`
    const address = (await axios.get(addressEndpoint)).data;
    let addressString = "Unknown";
    if(address){
      addressString = address?.items?.[0]?.title??"Unknown"
    }
    const result=  await updateKitchenFunc({name, location:position, address:addressString, id})
    if(result){
      toast.success("Update kitchen successfully ");
      nav("/kitchen");
    }
  }
  return { createKitchenHandler, updateKitchenHandler };
};

export default useKitchenForm;
