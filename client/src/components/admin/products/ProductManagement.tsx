import { useState } from 'react';
import { Plus } from 'lucide-react';
import ProductList from './ProductList';
// import ProductForm from './ProductForm';

import { useProducts } from '../../../hooks/useProducts';
import AdminProductForm from '../AdminProductForm';
import { Product } from '@/types';

export default function ProductManagement() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product|null>(null);
  const { products, loading, error, refetch } = useProducts();

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      <ProductList
        products={products!}
        loading={loading}
        // @ts-ignore
        error={error}
        onEdit={(product) => {
            setEditingProduct(product)
            setIsFormOpen(true);}}
        onRefetch={refetch}
      />

      {isFormOpen && (
        <AdminProductForm
          product={editingProduct}
          onClose={handleFormClose}
          onSuccess={() => {
            handleFormClose();
            refetch();
          }}
        />
      )}
    </div>
  );
}