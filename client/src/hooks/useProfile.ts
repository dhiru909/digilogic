import { getUserDetails } from '@/services/auth';
import { Details } from '@/types';
import { useState, useEffect } from 'react';

export function useProfile() {
  const [profile, setProfile] = useState<Details|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getUserDetails()
      setProfile(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch profile data');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, refetch: fetchProfile };
}