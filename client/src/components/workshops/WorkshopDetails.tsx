import { Workshop } from '../../types/workshop';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface WorkshopDetailsProps {
  workshop: Workshop;
}

export default function WorkshopDetails({ workshop }: WorkshopDetailsProps) {
  return (
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
  );
}