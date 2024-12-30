import { useState } from "react";
import { Workshop } from "../../../types/workshop";
import { Pencil, Trash2, Calendar, MapPin, Users, Eye } from "lucide-react";
import { deleteWorkshop } from "../../../services/api";
import AdminWorkshopSkeleton from "./AdminWorkshopSkeleton";
import AdminWorkshopError from "./AdminWorkshopError";
import WorkshopDetails from "./WorkshopDetails";

interface AdminWorkshopListProps {
  workshops: Workshop[];
  loading: boolean;
  error: string | null;
  onEdit: (workshop: Workshop) => void;
  onRefetch: () => void;
}

export default function AdminWorkshopList({
  workshops,
  loading,
  error,
  onEdit,
  onRefetch,
}: AdminWorkshopListProps) {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(
    null
  );
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this workshop?")) {
      return;
    }

    try {
      await deleteWorkshop(id);
      onRefetch();
      setDeleteError(null);
    } catch (err) {
      setDeleteError("Failed to delete workshop");
      console.error("Error deleting workshop:", err);
    }
  };

  if (loading) {
    return <AdminWorkshopSkeleton />;
  }

  if (error) {
    return <AdminWorkshopError message={error} />;
  }

  return (
    <div className="bg-background rounded-lg shadow-md overflow-auto">
      {deleteError && (
        <div className="p-4 bg-background text-red-700 border-b">
          {deleteError}
        </div>
      )}

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Workshop
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date & Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Registration
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price & Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-background divide-y divide-gray-200">
          {workshops?.map((workshop) => (
            <tr key={workshop._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-primary">
                      {workshop.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {workshop.instructor}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(workshop.date).toLocaleString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {workshop.location}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  {workshop.registeredCount} / {workshop.capacity}
                </div>
                <div className="text-sm text-gray-500">{workshop.duration}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap ">
                {/* <div className="flex  items-center text-sm text-gray-500"> */}
                  <div className=" text-sm text-gray-500">
                    {workshop.status}
                  </div>
                  <div className="text-sm text-gray-500">
                    ₹{workshop.price.toFixed(2)}
                  </div>
                {/* </div> */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(workshop)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedWorkshop(workshop)}
                  className="text-blue-600 hover:text-blue-700 mr-4"
                >
                  <Eye className="w-5 h-5" />
                </button>
                {selectedWorkshop && (
                  <WorkshopDetails
                    workshop={selectedWorkshop}
                    onClose={() => setSelectedWorkshop(null)}
                  />
                )}
                <button
                  onClick={() => handleDelete(workshop._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
