import { Calendar, Video, Clock, MapPin } from "lucide-react";
import { WorkshopRegistration } from "../../types/workshop";
import { WorkshopDetails } from "@/types";

interface UserWorkshopsProps {
  registrations: WorkshopDetails[];
}

export default function UserWorkshops({ registrations }: UserWorkshopsProps) {
  const getStatusColor = (status: WorkshopRegistration["status"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800",
    };
    return colors[status];
  };
  const getWorkshopStatusColor = (
    status: WorkshopDetails["workshopStatus"]
  ) => {
    const colors = {
      upcoming: "bg-yellow-100 text-yellow-800",
      ongoing: "bg-green-100 text-green-800",
      completed: "bg-red-100 text-red-800",
    };
    return colors[status];
  };

  if (registrations?.length === 0) {
    return (
      <div className="bg-background rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">My Workshops</h2>
        <p className="text-gray-600">No workshop registrations yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">My Workshops</h2>
      <div className="space-y-4">
        {registrations?.map((registration) => (
          <div key={registration._id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex space-x-2">
                  <h3 className="font-medium">{registration.workshopName}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getWorkshopStatusColor(
                      registration.workshopStatus
                    )}`}
                  >
                    {registration.workshopStatus}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(registration.date).toLocaleString()}
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {registration.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {registration.location}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                  registration.status
                )}`}
              >
                {registration.status.charAt(0).toUpperCase() +
                  registration.status.slice(1)}
              </span>
            </div>

            {registration.status === "confirmed" &&
              registration.workshopStatus === "ongoing" &&
              registration.link && (
                <a
                  href={registration.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Join Workshop
                </a>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
