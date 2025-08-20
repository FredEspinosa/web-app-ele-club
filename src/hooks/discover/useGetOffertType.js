import useSWR from 'swr';
import { fetcher } from '@/services/api';
import { API_ENDPOINTS } from '@/descubreApi';

const useGetOffertType = () => {
  const { data, error, isLoading } = useSWR(API_ENDPOINTS.GET_OFFER_CATALOG, fetcher);

  return {
    data: data || [],
    error,
    isLoading,
  };
};

export default useGetOffertType;
