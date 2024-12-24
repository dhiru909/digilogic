import { Cate, Enquiry } from '../types/enquiry';
import { getEnquiries } from '../services/api';
import { useQuery } from '@tanstack/react-query';

export function useEnquiries(cates:Cate[]) {
  const { data, isError,isLoading, refetch } = useQuery<Enquiry[]>({
    queryKey: ['all-enquiries',cates],
    queryFn: () => getEnquiries(cates),
    gcTime: 1000 * 61,
    staleTime:1000*60
  });

  return { enquiries:data, loading:isLoading, error:isError, refetch: refetch };
}