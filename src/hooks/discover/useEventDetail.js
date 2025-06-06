import { fetcher } from "@/services/api";
import useSWR from "swr";
import { useParams } from 'react-router-dom';

const useEventDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR( `/api/items/${id}`, fetcher);
  return {
    data, 
    error, 
    isLoading
  }
};

export default useEventDetail;