import { useState } from "react";
import { Plus } from "lucide-react";
import { useWorkshops } from "../../../hooks/useWorkshops";
import WorkshopList from "./WorkshopList";
import WorkshopForm from "./WorkshopForm";
import { Workshop } from "@/types/workshop";

export default function WorkshopManagement() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const { workshops, loading, error, refetch } = useWorkshops();

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingWorkshop(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Workshop Management</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Workshop
        </button>
      </div>

      <WorkshopList
        workshops={workshops}
        loading={loading}
        error={error}
        onEdit={(workshop)=>setEditingWorkshop(workshop)}
        onRefetch={refetch}
      />

      {(isFormOpen || editingWorkshop) && (
        <WorkshopForm
          workshop={editingWorkshop}
          onClose={handleFormClose}
          onSuccess={() => {
            handleFormClose();
            refetch();
          }}
        />
      )}
    </div>
  );
}
