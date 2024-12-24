import { X, Mail, Phone, Calendar, PersonStanding, Trash2 } from 'lucide-react';
import { Enquiry } from '../../../types/enquiry';

interface EnquiryDetailsProps {
  enquiry: Enquiry;
  onClose: () => void;
  onStatusChange: (id: string, status: Enquiry['status']) => void;
  onDelete: (id: string) => void;
}

export default function EnquiryDetails({ enquiry, onClose, onStatusChange, onDelete }: EnquiryDetailsProps) {
  const getStatusColor = (status: Enquiry['status']) => {
    switch (status) {
      case 'replied': return 'bg-green-100 text-green-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      onDelete(enquiry._id);
    }
  };
  return (
    <div className="bg-background z-20 animate-in fade-in-40 duration-200  fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 items-center justify-center border rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-semibold">Enquiry Details</h3>
        <div className="flex items-center space-x-2">
        <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 p-1"
            title="Delete enquiry"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center text-gray-600">
          <Mail className="w-5 h-5 mr-2" />
          <span>{enquiry.email}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <PersonStanding className="w-5 h-5 mr-2" />
          <span>{enquiry.name}</span>
        </div>
        
        {enquiry.phone && (
          <div className="flex items-center text-gray-600">
            <Phone className="w-5 h-5 mr-2" />
            <span>{enquiry.phone}</span>
          </div>
        )}
        
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-2" />
          <span>{new Date(enquiry.createdAt).toLocaleString()}</span>
        </div>

        <div className="mt-4">
          <h4 className="font-medium mb-2">Message</h4>
          <p className="text-gray-600 whitespace-pre-wrap">{enquiry.message}</p>
        </div>
        <select
            value={enquiry.status}
            onChange={(e) => onStatusChange(enquiry._id, e.target.value as Enquiry['status'])}
            className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(enquiry.status)}`}
          >
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
      </div>
    </div>
  );
}