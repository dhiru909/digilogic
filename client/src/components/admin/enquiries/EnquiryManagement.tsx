import { useState } from 'react';
import EnquiryList from './EnquiryList';
import EnquiryDetails from './EnquiryDetails';
import { useEnquiries } from '../../../hooks/useEnquiries';
import { Enquiry } from '@/types/enquiry';
import { Badge } from '@/components/ui/badge';

export default function EnquiryManagement() {
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry|null>(null);
  const { enquiries, loading, error, refetch } = useEnquiries();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Customer Enquiries</h2>
        <Badge className='bg-gray-600'>New</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnquiryList
          enquiries={enquiries!}
          loading={loading}
          // @ts-ignore
          error={error}
          selectedId={selectedEnquiry?.id!}
          onSelect={(enquiry) => setSelectedEnquiry(enquiry)}
          onRefetch={refetch}
        />
        
        {selectedEnquiry && (
          <EnquiryDetails
            enquiry={selectedEnquiry}
            onClose={() => setSelectedEnquiry(null)}
          />
        )}
      </div>
    </div>
  );
}