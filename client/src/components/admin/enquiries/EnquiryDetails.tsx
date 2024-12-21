import { X, Mail, Phone, Calendar, PersonStanding } from 'lucide-react';
import { Enquiry } from '../../../types/enquiry';

interface EnquiryDetailsProps {
  enquiry: Enquiry;
  onClose: () => void;
}

export default function EnquiryDetails({ enquiry, onClose }: EnquiryDetailsProps) {
  return (
    <div className="bg-background animate-in fade-in-40 duration-200  fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 items-center justify-center border rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-semibold">Enquiry Details</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
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
      </div>
    </div>
  );
}