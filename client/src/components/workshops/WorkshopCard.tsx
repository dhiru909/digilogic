import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Workshop } from "../../types/workshop";

interface WorkshopCardProps {
  workshop: Workshop;
  onRegister?: () => void;
  showRegisterButton?: boolean;
}

export default function WorkshopCard({
  workshop,
  onRegister,
  showRegisterButton = true,
}: WorkshopCardProps) {
  const isFullyBooked = workshop.registeredCount >= workshop.capacity;

  return (
    <div className="bg-background border rounded-lg shadow-md overflow-hidden">
      <img
        src={workshop.image}
        alt={workshop.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{workshop.title}</h3>
        <p className="text-gray-600 mb-4">{workshop.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(workshop.date).toLocaleString()}
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {workshop.duration}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {workshop.location}
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {workshop.registeredCount} / {workshop.capacity} registered
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ₹{workshop.price.toFixed(2)}
          </span>
          {showRegisterButton && (
            <button
              onClick={onRegister}
              disabled={isFullyBooked}
              className={`px-4 py-2 rounded-lg ${
                isFullyBooked
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isFullyBooked ? "Fully Booked" : "Register Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
