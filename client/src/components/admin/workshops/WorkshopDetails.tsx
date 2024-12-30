import { Workshop } from "../../../types/workshop";
import { useWorkshopRegistrations } from "../../../hooks/useWorkshopRegistrations";
import RegistrationList from "./RegistrationList";
import { Calendar, MapPin, Users, Clock, X } from "lucide-react";

interface WorkshopDetailsProps {
  workshop: Workshop;
  onClose: () => void;
}

export default function WorkshopDetails({
  workshop,
  onClose,
}: WorkshopDetailsProps) {
  const { registrations, loading, error, refetch } = useWorkshopRegistrations(
    workshop._id
  );

  return (
    <div className="fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{workshop.title}</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(workshop.date).toLocaleString()}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {workshop.duration}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {workshop.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {workshop.registeredCount} / {workshop.capacity}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading ? (
            <div className="text-center py-4">Loading registrations...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-4">{error}</div>
          ) : (
            <RegistrationList
              registrations={registrations}
              workshopPrice={workshop.price}
              onStatusUpdate={refetch}
            />
          )}
        </div>
      </div>
    </div>
  );
}
