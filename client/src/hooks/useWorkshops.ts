import { useState, useEffect } from 'react';
import { Workshop } from '../types/workshop';
import { getWorkshops } from '../services/api';

export function useWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const data = await getWorkshops();
      setWorkshops(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch workshops');
      console.error('Error fetching workshops:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  return { workshops, loading, error, refetch: fetchWorkshops };
}