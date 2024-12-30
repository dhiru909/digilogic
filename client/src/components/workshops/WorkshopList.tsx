import { Workshop } from "../../types/workshop";
import WorkshopListItem from "./WorkshopListItem";
import WorkshopSkeleton from "./WorkshopSkeleton";
import WorkshopError from "./WorkshopError";
import WorkshopEmpty from "./WorkshopEmpty";

interface WorkshopListProps {
  workshops: Workshop[];
  loading: boolean;
  error: string | null;
  onRegister: (workshop: Workshop) => void;
}

export default function WorkshopList({
  workshops,
  loading,
  error,
  onRegister,
}: WorkshopListProps) {
  if (loading) {
    return <WorkshopSkeleton />;
  }

  if (error) {
    return <WorkshopError message={error} />;
  }

  if (workshops.length === 0) {
    return <WorkshopEmpty />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workshops.map((workshop) => (
        <WorkshopListItem
          key={workshop._id}
          workshop={workshop}
          onRegister={() => onRegister(workshop)}
        />
      ))}
    </div>
  );
}
