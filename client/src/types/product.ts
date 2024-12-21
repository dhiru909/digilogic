export interface ProductCategory {
  id: string;
  name: string;
  description: string;
}

export interface ProductFiltersType {
  category: string;
  priceRange: [number, number];
  searchQuery: string;
}