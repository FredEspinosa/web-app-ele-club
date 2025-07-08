import { fetcherWithToken } from "@/services/api";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { API_ENDPOINTS } from "@/descubreApi";
import { useMemo } from "react";

const useServiceDetail = () => {
  const { id } = useParams();
  const { data: rawData, error, isLoading } = useSWR(API_ENDPOINTS.GET_OFFER_BY_ID(id), fetcherWithToken);

  const data = useMemo(() => {
    const serviceResponse = rawData?.result;
    if (!serviceResponse) {
      return null;
    }
    try {
      const formData = JSON.parse(serviceResponse.formDataJson);
      const processedOffer = { ...serviceResponse, ...formData };
      delete processedOffer.formDataJson;
      
      console.log({processedOffer});
      
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

export default useServiceDetail;
