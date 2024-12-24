import { Job } from '../types/career';
import { getJobs } from '../services/api';
import { useQuery } from '@tanstack/react-query';

export function useJobs() {
  const { data, isError,isLoading, refetch } = useQuery<Job[]>({
    queryKey: ['all-enquiries'],
    queryFn: () => getJobs(),
    gcTime: 1000 * 61,
    staleTime:1000*60
  });

  return { jobs:data, loading:isLoading, error:isError, refetch: refetch};
}