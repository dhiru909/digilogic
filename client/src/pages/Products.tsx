import React, { useEffect, useRef, useState } from 'react';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
// import { Product } from '../types';
import { ProductCategory } from '../types/product';
import EnquiryForm from '@/components/enquiry-form';
import { useProducts } from '@/hooks/useProducts';
import { useProductFiltering } from '@/hooks/useProductFiltering';
import { productCategories } from '../data/productCategories';
import ProductsLoading from '@/components/products/ProductsLoading';
import ProductsError from '@/components/products/ProductsError';
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
  const { products, loading, error, refetch } = useProducts();
  const { filters, setFilters, filteredProducts } = useProductFiltering(products);
  // const [productEnquire, setProductEnquire] = useState<string | null>(null);
  // const [filters, setFilters] = useState<Filters>({
  //   category: '',
  //   priceRange: [0, 100000],
  //   searchQuery: ''
  // });
  const [showForm, setShowForm] = useState<Boolean>(false);
  const showFormHandler = (_id:string) => {
    localStorage.setItem("productId",_id);
    // setProductEnquire(_id);
    
    setShowForm(!showForm);
  }
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
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <ProductFilters
              categories={productCategories}
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>
          <div className="md:w-3/4">
            <ProductsLoading />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <ProductsError message={"error"} onRetry={refetch} />
      </div>
    );
  }

  return (
    <>
     <div ref={menuRef} className={`${showForm?"block":"hidden"} min-w-72 z-10 enquiry-form fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4  p-5 border rounded-lg overflow-auto min-h-80 max-h-[90svh]  bg-background  flex items-center justify-center`}>
     <EnquiryForm closeForm={() => setShowForm(false)} />
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
            {filteredProducts?.map(product => (
              <ProductCard onEnquire={showFormHandler} key={product._id} product={product} />
            ))}
          </div>
          
          {filteredProducts?.length === 0 && (
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