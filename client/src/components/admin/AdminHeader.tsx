import { Package, MessageSquare, Briefcase, FileText, Workflow } from 'lucide-react';

type ActiveSection = 'products' | 'enquiries' | 'jobs' | 'applications'|'workshops';

interface AdminHeaderProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
}

export default function AdminHeader({ activeSection, onSectionChange }: AdminHeaderProps) {
  return (
    <header className="bg-background border mt-1 rounded-md shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-auto scroll-p-44 space-x-2 py-4">
          <button
            onClick={() => onSectionChange('products')}
            className={`flex transition fade-in-5 items-center px-3 py-2 rounded-lg ${
              activeSection === 'products'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Package className="w-5 h-5 mr-2" />
            Products
          </button>
          <button
            onClick={() => onSectionChange('jobs')}
            className={`flex items-center px-3 py-2 rounded-lg ${
              activeSection === 'jobs'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Briefcase className="w-5 h-5 mr-2" />
            Jobs
          </button>
          <button
            onClick={() => onSectionChange('enquiries')}
            className={`flex items-center px-3 py-2 rounded-lg ${
              activeSection === 'enquiries'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Enquiries
          </button>
          
          <button
            onClick={() => onSectionChange('applications')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeSection === 'applications'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileText className="w-5 h-5 mr-2" />
            Applications
          </button>
          <button
            onClick={() => onSectionChange('workshops')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeSection === 'workshops'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Workflow className="w-5 h-5 mr-2" />
            Workshops
          </button>
        </div>
      </div>
    </header>
  );
}