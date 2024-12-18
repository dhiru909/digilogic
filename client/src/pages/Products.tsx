import React, { useEffect, useRef, useState } from 'react';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import { Product } from '../types';
import { ProductCategory, ProductFiltersType as Filters } from '../types/product';
import EnquiryForm from '@/components/enquiry-form';
import { set } from 'react-hook-form';

// Mock data - In a real app, this would come from an API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Arduino Starter Kit',
    description: 'Complete kit for beginners with Arduino UNO board and components',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800',
    category: 'starter-kits'
  },
  {
    id: '2',
    name: 'Advanced Microcontroller Kit',
    description: 'Professional kit with advanced components for complex projects',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800',
    category: 'advanced'
  },
  {
    id: '3',
    name: 'Digital Logic Training Board',
    description: 'Educational board for learning digital logic concepts',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800',
    category: 'education'
  }
];

const categories: ProductCategory[] = [
  {
    id: 'starter-kits',
    name: 'Starter Kits',
    description: 'Perfect for beginners'
  },
  {
    id: 'advanced',
    name: 'Advanced Kits',
    description: 'For experienced users'
  },
  {
    id: 'education',
    name: 'Educational Boards',
    description: 'Learning and training'
  }
];

export default function Products() {
  const [filters, setFilters] = useState<Filters>({
    category: '',
    priceRange: [0, 100000],
    searchQuery: ''
  });
  const [showForm, setShowForm] = useState<Boolean>(false);
  const showFormHandler = () => {
    setShowForm(!showForm);
  }
  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesPrice = product.price <= filters.priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    return matchesCategory && matchesPrice && matchesSearch;
  });

  
  const menuRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
     <div ref={menuRef} className={`${showForm?"block":"hidden"} min-w-72 z-10 enquiry-form fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 w-fit h-fit p-10 border rounded-lg  bg-background  flex items-center justify-center`}>
        <EnquiryForm/>
      </div>
    <div className={`max-w-7xl mx-auto px-4 py-8 ${showForm?"blur-sm pointer-events-none":""} `}>
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
     
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <ProductFilters
            categories={categories}
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>
        
        <div className="md:w-3/4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard onEnquire={showFormHandler} key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}