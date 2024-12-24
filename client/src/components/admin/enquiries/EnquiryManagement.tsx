import { useState } from 'react';
import EnquiryList from './EnquiryList';
import EnquiryDetails from './EnquiryDetails';
import { useEnquiries } from '../../../hooks/useEnquiries';
import { Cate, Enquiry } from '@/types/enquiry';
import { deleteEnquiry, updateEnquiryStatus } from '@/services/api';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function EnquiryManagement() {
  const [selectedToggle, setSelectedToggle] = useState<Cate[]>([]); // Default value


  const handleToggleChange = (value:Cate[]) => {
    setSelectedToggle(value);
  };
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry|null>(null);
  const { enquiries, loading, error, refetch } = useEnquiries(selectedToggle);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateEnquiryStatus(id, status as Enquiry['status']);
      setSelectedEnquiry(null)
      refetch();
      setUpdateError(null);
    } catch (err) {
      setUpdateError('Failed to update enquiry status');
      console.error('Error updating enquiry status:', err);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteEnquiry(id);
      setSelectedEnquiry(null);
      refetch();
      setUpdateError(null);
    } catch (err) {
      setUpdateError('Failed to delete enquiry');
      console.error('Error deleting enquiry:', err);
    }
  };
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Customer Enquiries</h2>
        {updateError && (
          <p className="mt-2 text-red-600">{updateError}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <ToggleGroup type="multiple" onValueChange={handleToggleChange}>
          <ToggleGroupItem  value="new">New</ToggleGroupItem>
          <ToggleGroupItem  value="read">Read</ToggleGroupItem>
          <ToggleGroupItem value="replied">Replied</ToggleGroupItem>
        </ToggleGroup>
        <EnquiryList
          enquiries={enquiries!}
          loading={loading}
          // @ts-ignore
          error={error}
          selectedId={selectedEnquiry?._id!}
          onSelect={(enquiry) => setSelectedEnquiry(enquiry)}
          onRefetch={refetch}
        />
        
        {selectedEnquiry && (
          <EnquiryDetails
            enquiry={selectedEnquiry}
            onClose={() => setSelectedEnquiry(null)}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}