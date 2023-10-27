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

export interface KitchenForm extends ManipulateCustomerForm {
  name?: string;
  areaId?: string;
  position?: { lat: number; lng: number };
  userId?: string;
  user: User;
  isCreateUser?: boolean;
}

const useKitchenForm = () => {
  const nav = useNavigate();
  const { createKitchenFunction } = useKitchenData();
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
  return { createKitchenHandler };
};

export default useKitchenForm;
