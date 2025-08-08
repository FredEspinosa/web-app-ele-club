import { fetcherWithToken } from "@/services/api";
import useSWR from "swr";
import { API_ENDPOINTS } from "@/descubreApi";
import { useMemo } from "react";

const useMyEventsAndServices = (idUser) => {
  const shouldFetch = !!idUser;

  const { data: rawData, error, isLoading } = useSWR(() => {
    if (!shouldFetch) return null;

    const params = new URLSearchParams({
      typeId: idUser,
    }).toString();

    return `${API_ENDPOINTS.GET_USER_EVENTS_SERVICES()}?${params}`;
  }, fetcherWithToken);

  const data = useMemo(() => {
    const serviceResponse = rawData?.result;
    if (!serviceResponse) return null;

    try {
      const formData = JSON.parse(serviceResponse.formDataJson);
      const processedOffer = { ...serviceResponse, ...formData };
      delete processedOffer.formDataJson;

      console.log("My events and services", { processedOffer });
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
