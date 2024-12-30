import { useState } from "react";
import { Download, Mail, Phone, Check, X, ExternalLink } from "lucide-react";
import { WorkshopRegistration } from "../../../types/workshop";
import {
  updateRegistrationStatus,
  downloadRegistrations,
} from "../../../services/api";

interface RegistrationListProps {
  registrations: WorkshopRegistration[];
  workshopPrice: number;
  onStatusUpdate: () => void;
}

export default function RegistrationList({
  registrations,
  workshopPrice,
  onStatusUpdate,
}: RegistrationListProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleStatusUpdate = async (
    id: string,
    status: "confirmed" | "rejected"
  ) => {
    try {
      setLoading(id);
      await updateRegistrationStatus(id, status);
      onStatusUpdate();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(null);
    }
  };

  const handleDownload = async () => {
    try {
      await downloadRegistrations(registrations?.map((r) => r._id));
    } catch (error) {
      console.error("Error downloading registrations:", error);
    }
  };

  return (
    <div className="bg-background rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold">Registrations</h3>
        <button
          onClick={handleDownload}
          className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Download All
        </button>
      </div>

      <div className="divide-y">
        {registrations?.map((registration) => (
          <div key={registration?._id} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium">{registration?.userName}</h4>
                <div className="flex items-center text-gray-600 mt-1">
                  <Mail className="w-4 h-4 mr-1" />
                  {registration?.email}
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <Phone className="w-4 h-4 mr-1" />
                  {registration?.phone}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {registration?.status === "pending" ? (
                  <>
                    <button
                      onClick={() =>
                        handleStatusUpdate(registration?._id, "confirmed")
                      }
                      disabled={loading === registration._id}
                      className="p-1 text-green-600 hover:bg-green-50 rounded-full"
                      title="Confirm Registration"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(registration._id, "rejected")
                      }
                      disabled={loading === registration._id}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                      title="Reject Registration"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      registration.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {registration.status.charAt(0).toUpperCase() +
                      registration.status.slice(1)}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Payment Details</span>
                <span className="text-sm text-gray-600">
                  Expected Amount: ₹{workshopPrice}
                </span>
              </div>
              {registration.paymentProof && (
                <div className="mt-2">
                  <a
                    href={registration.paymentProof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    View Transaction Screenshot
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
