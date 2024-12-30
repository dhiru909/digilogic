import { Workshop } from "../../types/workshop";
import WorkshopDetails from "./WorkshopDetails";
import WorkshopActions from "./WorkshopActions";

interface WorkshopListItemProps {
  workshop: Workshop;
  onRegister: () => void;
}

export default function WorkshopListItem({
  workshop,
  onRegister,
}: WorkshopListItemProps) {
  const isFullyBooked = workshop.registeredCount >= workshop.capacity;

  return (
    <div className="bg-background rounded-lg shadow-md overflow-hidden">
      <img
        src={workshop.image}
        alt={workshop.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{workshop.title}</h3>
        <p className="text-gray-600 mb-4">{workshop.description}</p>

        <WorkshopDetails workshop={workshop} />
        <WorkshopActions
          price={workshop.price}
          isFullyBooked={isFullyBooked}
          onRegister={onRegister}
        />
      </div>
    </div>
  );
}
