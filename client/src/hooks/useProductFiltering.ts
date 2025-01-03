import { useState, useMemo } from 'react';
import { ProductFiltersType } from '../types/product';
import { Product } from '@/types/index';
export function useProductFiltering(products?: Product[]) {
  const [filters, setFilters] = useState<ProductFiltersType>({
    category: '',
    priceRange: [0, 100000],
    searchQuery: ''
  });

  const filteredProducts = useMemo(() => {
    return products?.filter(product => {
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesPrice = product.price <= filters.priceRange[1];
      const matchesSearch = product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [products, filters]);

  return {
    filters,
    setFilters,
    filteredProducts
  };
}