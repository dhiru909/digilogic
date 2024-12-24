import { Pencil, Trash2, AlertCircle } from 'lucide-react';
import { Product } from '../../../types/index';
import { deleteProduct } from '../../../services/api';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onEdit: (product: Product) => void;
  onRefetch: () => void;
}

export default function ProductList({
  products,
  loading,
  error,
  onEdit,
  onRefetch
}: ProductListProps) {
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        onRefetch();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-gray-600">{error}</p>
        <button
          onClick={onRefetch}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-background divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-6 h-fit py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-primary">
                      {product.name}
                    </div>
                    <div className="text-sm text-wrap max-w-80 text-gray-500">
                      {product.description}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {product.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ₹{product.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}