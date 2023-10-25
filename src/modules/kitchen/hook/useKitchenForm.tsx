import { User } from '@/types/@mk/entity/user';
import { KitchenStatus } from '@/types/@mk/enum/kitchenStatus';
import useKitchenData from './useKitchenData';

export interface KitchenForm {
    name?: string;
    areaId?: string;
    position?: {lat: number, lng: number},
    userId?: string
    user: User
  }

const useKitchenForm = () => {
  const {createKitchenFunction} = useKitchenData()
    const createKitchenHandler = async (formValues: KitchenForm) => {
        const {position, areaId, name, userId} = formValues
        // const location = await LocationApi.createLocation(position);
        // const locationId = location?.data
       const result = await  createKitchenFunction({
          name,
          ownerId: userId,
          location : position,
          areaId,
          address: "unknown",
          status: KitchenStatus.ACTIVE
        })
        console.log("RESULT CREATE", result);
        
      };
  return (
   { createKitchenHandler}
  )
}

export default useKitchenForm