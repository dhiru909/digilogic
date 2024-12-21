import {  getProducts } from '../services/api';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';

export function useProducts() {
  // const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   fetchEnquiries();
  // }, []);
  const { data, isError,isLoading, refetch } = useQuery<Product[]>({
    queryKey: ['all-products'],
    queryFn: () => getProducts(),
    gcTime: 1000 * 61,
    staleTime:1000*60
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

  return { products:data, loading:isLoading, error:isError, refetch: refetch };
}