import { EnquiryDetails } from "@/types";
import { Enquiry } from "../../types/enquiry";
import { MessageSquare, Calendar } from "lucide-react";

interface UserEnquiriesProps {
  enquiries: EnquiryDetails[];
}

export default function UserEnquiries({ enquiries }: UserEnquiriesProps) {
  const getStatusColor = (status: Enquiry["status"]) => {
    const colors = {
      new: "bg-yellow-100 text-yellow-800",
      read: "bg-blue-100 text-blue-800",
      replied: "bg-green-100 text-green-800",
    };
    return colors[status];
  };

  if (enquiries.length === 0) {
    return (
      <div className="bg-background rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">My Enquiries</h2>
        <p className="text-gray-600">No enquiries yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-background border rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">My Enquiries</h2>
      <div className="space-y-4">
        {enquiries.map((enquiry) => (
          <div key={enquiry._id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-muted" />
                <span className="font-medium">Enquiry</span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                  enquiry.status
                )}`}
              >
                {enquiry.status.charAt(0).toUpperCase() +
                  enquiry.status.slice(1)}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{enquiry.message}</p>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                Sent on {new Date(enquiry.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
