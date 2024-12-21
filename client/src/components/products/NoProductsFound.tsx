import { PackageX } from 'lucide-react';

export default function NoProductsFound() {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <PackageX className="w-8 h-8 text-gray-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Found</h3>
      <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
    </div>
  );
}