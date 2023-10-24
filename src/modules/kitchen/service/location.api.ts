import axiosClient from "@/base/service/axiosClient";

const LocationApi = {
    createLocation: async (position: {lat:number, lng: number}) => {
      const endpoint = "/location";
      return (await axiosClient.post(endpoint, position)).data;
    },
   
  };
  export default LocationApi;