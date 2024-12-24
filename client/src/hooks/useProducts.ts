import {  getProducts } from '../services/api';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';

export function useProducts() {
  const { data, isError,isLoading, refetch } = useQuery<Product[]>({
    queryKey: ['all-products'],
    queryFn: () => getProducts(),
    gcTime: 1000 * 61,
    staleTime:1000*60
  });

  return { products:data, loading:isLoading, error:isError, refetch: refetch };
}