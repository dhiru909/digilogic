import { Mail, Clock, AlertCircle } from 'lucide-react';
import { Enquiry } from '../../../types/enquiry';

interface EnquiryListProps {
  enquiries: Enquiry[];
  loading: boolean;
  error: string | null;
  selectedId: string | null;
  onSelect: (enquiry: Enquiry) => void;
  onRefetch: () => void;
}

export default function EnquiryList({
  enquiries,
  loading,
  error,
  selectedId,
  onSelect,
  onRefetch
}: EnquiryListProps) {
  if (loading) {
    return <div className="animate-pulse">Loading enquiries...</div>;
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
    <div className="bg-background rounded-lg border shadow overflow-hidden">
      <div className="divide-y">
        {enquiries.map((enquiry) => (
          <button
            key={enquiry.id}
            onClick={() => onSelect(enquiry)}
            className={`w-full text-left p-4 hover:bg-muted ${
              selectedId === enquiry.id ? 'bg-background' : ''
            }`}
          >
            <div className="flex items-start justify-between rounded-lg">
              <div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="font-medium">{enquiry.email}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {enquiry.message}
                </p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(enquiry.createdAt).toLocaleDateString()}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}