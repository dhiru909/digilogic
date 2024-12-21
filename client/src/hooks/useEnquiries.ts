import { Enquiry } from '../types/enquiry';
import { getEnquiries } from '../services/api';
import { useQuery } from '@tanstack/react-query';

export function useEnquiries() {
  // const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   fetchEnquiries();
  // }, []);
  const { data, isError,isLoading, refetch } = useQuery<Enquiry[]>({
    queryKey: ['all-enquiries'],
    queryFn: () => getEnquiries(),
    gcTime: 1000 * 60 * 60 * 24,
    // onSuccess: (data, variables, context) => {
    //   console.log(data, variables, context);
    //   setProjects({ items: data });
    //   queryClient.invalidateQueries({
    //     queryKey: ['all-projects'],
    //   });
    // },
    // onError: (error, variables, context) => {
    //   console.log(error);
    // },
  });
  // const fetchEnquiries = async () => {
  //   try {
  //     setLoading(true);
  //     const data = await getEnquiries();
  //     setEnquiries(data);
  //     setError(null);
  //   } catch (err) {
  //     setError('Failed to fetch enquiries');
  //     console.error('Error fetching enquiries:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return { enquiries:data, loading:isLoading, error:isError, refetch: refetch };
}