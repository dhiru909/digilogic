import { useState } from 'react';
import { useWorkshops } from '../hooks/useWorkshops';
import WorkshopCard from '../components/workshops/WorkshopCard';
import WorkshopRegistrationModal from '../components/workshops/WorkshopRegistrationModal';
import { Workshop } from '../types/workshop';

export default function Workshops() {
  const { workshops, loading, error, refetch } = useWorkshops();
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  if (loading) {
    return <div>Loading workshops...</div>;
  }

  if (error) {
    return <div>Error loading workshops: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Workshops</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map(workshop => (
          <WorkshopCard
            key={workshop._id}
            workshop={workshop}
            onRegister={() => setSelectedWorkshop(workshop)}
          />
        ))}
      </div>

      {selectedWorkshop && (
        <WorkshopRegistrationModal
          workshop={selectedWorkshop}
          onClose={() => setSelectedWorkshop(null)}
          onSuccess={() => {
            setSelectedWorkshop(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}