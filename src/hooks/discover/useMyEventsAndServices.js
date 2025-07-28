import { fetcherWithToken } from "@/services/api";
import useSWR from "swr";
import { API_ENDPOINTS } from "@/descubreApi";
import { useMemo } from "react";

const useMyEventsAndServices = (idUser) => {
  console.log("idUser hook", idUser);
  
  const {id} = idUser;
  const shouldFetch = !!id; // solo si hay id va a mandar la petición

  const { data: rawData, error, isLoading } = useSWR(
    shouldFetch ? API_ENDPOINTS.GET_USER_EVENTS_SERVICES(id) : null,
    fetcherWithToken
  );
  // const { data: rawData, error, isLoading } = useSWR(API_ENDPOINTS.GET_USER_EVENTS_SERVICES(id), fetcherWithToken);  

  const data = useMemo(() => {
    const serviceResponse = rawData?.result;
    if (!serviceResponse) {
      return null;
    }
    try {
      const formData = JSON.parse(serviceResponse.formDataJson);
      const processedOffer = { ...serviceResponse, ...formData };
      delete processedOffer.formDataJson;
      
      console.log("My events and services", {processedOffer});
      
      return processedOffer;
    } catch (error) {
      console.error("Error al parsear formDataJson:", error);
      return serviceResponse;
    }
  }, [rawData]);

  return {
    data,
    error,
    isLoading,
  };
};

export default useMyEventsAndServices;
