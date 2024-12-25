import { JobApplication } from "../types/career";
import { getApplications } from "../services/api";
import { useQuery } from "@tanstack/react-query";

export function useApplications() {
  const { data, isError, isLoading, refetch } = useQuery<JobApplication[]>({
    queryKey: ["all-enquiries"],
    queryFn: () => getApplications(),
    gcTime: 1000 * 61,
    // staleTime:1000*60
  });
  return {
    applications: data,
    loading: isLoading,
    error: isError,
    refetch: refetch,
  };
}
