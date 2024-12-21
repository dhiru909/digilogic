// import React from 'react';
import { Search } from 'lucide-react';
import { ProductCategory, ProductFiltersType } from '../../types/product';

interface ProductFiltersProps {
  categories: ProductCategory[];
  filters: ProductFiltersType;
  onFilterChange: (filters: ProductFiltersType) => void;
}

export default function ProductFilters({ categories, filters, onFilterChange }: ProductFiltersProps) {
  return (
    <div className="bg-primary-background border rounded-lg shadow-md p-6 mb-6">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value=""
              checked={filters.category === ""}
              onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
              className="mr-2"
            />
            All Products
          </label>
          {categories.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category.name}
                checked={filters.category === category.name}
                onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
                className="mr-2"
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="0"
            max="100000"
            value={filters.priceRange[1]}
            onChange={(e) => onFilterChange({
              ...filters,
              priceRange: [filters.priceRange[0], parseInt(e.target.value)]
            })}
            className="w-full"
          />
          <span className="text-gray-600">
            Up to ₹{filters.priceRange[1]}
          </span>
        </div>
      </div>
    </div>
  );
}