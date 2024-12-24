import { useState, useMemo } from 'react';
import { Enquiry, EnquiryFilterType } from '@/types/enquiry';
export function useProductFiltering(enquiries: Enquiry[]) {
  const [filters, setFilters] = useState<EnquiryFilterType>({
    category: []
  });

  const filteredProducts = useMemo(() => {
    return enquiries?.filter(enquiry => {
      const matchesCategory = filters.category.includes(enquiry.status);
      return matchesCategory 
    });
  }, [enquiries, filters]);

  return {
    filters,
    setFilters,
    filteredProducts
  };
}