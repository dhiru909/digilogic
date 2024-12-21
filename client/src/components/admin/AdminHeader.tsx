import { Package, MessageSquare } from 'lucide-react';

type ActiveSection = 'products' | 'enquiries';

interface AdminHeaderProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
}

export default function AdminHeader({ activeSection, onSectionChange }: AdminHeaderProps) {
  return (
    <header className="bg-background shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-4 py-4">
          <button
            onClick={() => onSectionChange('products')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeSection === 'products'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Package className="w-5 h-5 mr-2" />
            Products
          </button>
          <button
            onClick={() => onSectionChange('enquiries')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeSection === 'enquiries'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Enquiries
          </button>
        </div>
      </div>
    </header>
  );
}