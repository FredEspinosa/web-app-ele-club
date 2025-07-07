import { fetcherWithToken } from "@/services/api";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { API_ENDPOINTS } from "@/descubreApi";

const useEventDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(API_ENDPOINTS.GET_OFFER_BY_ID(id), fetcherWithToken);
  return {
    data,
    error,
    isLoading,
  };
};

export default useEventDetail;
