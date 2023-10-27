import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import React, { PropsWithChildren, useEffect } from "react";
import axiosClient from "./axiosClient";

const AxiosInterceptor: React.FC<PropsWithChildren<{ key?: string }>> = ({
  children,
}) => {
  // const navigate = useNavigate();
  const LOCAlSTORAGE_TOKEN_KEY = "access_token";
  const setToken = (token: string) => {
    localStorage.setItem(LOCAlSTORAGE_TOKEN_KEY, JSON.stringify(token));
  };
  const getToken = () => {
    const token = localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : "";
    return token ? JSON.parse(token) : "";
  };
  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      switch(response.status){
        case 403 : 
          // route to access denied page
          console.error("403");
          
          break;
          case 401 : 
          console.error("401");
          // route to ...
          break;
          case 404 : 
          console.error("404");
          //pop up error
          break;
          case 500:
          console.error("500");
          // route to page 500 
          break;
          case  400: 
          console.error("400");
          //popup message 
          break;
        default: 
        break;
      }
      if (response.data?.data?.accessToken) {
        setToken(response.data.data);
      }
      console.log("RES IN INTERCEPTOR", response.data);
      
      return response;
    };

    const errInterceptor = (error: AxiosError) => {
      console.log("At inteceptor", error);
      // navigate("/")
      return Promise.resolve(error.response);
    };
    const reqInterceptor = axiosClient.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
          config.headers["Authorization"] =  `Bearer ${getToken()}`;
        return config;
      },
      (err) => {
        // if(!isLoading) openLoading("FULL");
        return Promise.reject(err);
      }
    );
    const interceptor = axiosClient.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => {
      axiosClient.interceptors.response.eject(interceptor);
      axiosClient.interceptors.request.eject(reqInterceptor);
    };
  }, []);
  return <>{children}</>;
};

export default AxiosInterceptor;
