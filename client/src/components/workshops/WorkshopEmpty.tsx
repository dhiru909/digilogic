import { Calendar } from "lucide-react";

export default function WorkshopEmpty() {
  return (
    <div className="text-center py-12">
      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No Workshops Available
      </h3>
      <p className="text-gray-600">Check back later for upcoming workshops.</p>
    </div>
  );
}
