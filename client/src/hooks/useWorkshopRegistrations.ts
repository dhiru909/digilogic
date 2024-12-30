import { useState, useEffect } from 'react';
import { WorkshopRegistration } from '../types/workshop';
import { getRegistrations } from '@/services/api';
export function useWorkshopRegistrations(workshopId: string) {
  const [registrations, setRegistrations] = useState<WorkshopRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);


  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await getRegistrations(workshopId)
      setRegistrations(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch registrations');
      console.error('Error fetching registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [workshopId]);

  return { registrations, loading, error, refetch: fetchRegistrations };
}