import { useState, useEffect, useCallback } from 'react';

import { ApiError } from '@/lib/api-client';

import { useAuth } from './use-auth';

export const useFetch = <T,>(
  fetchFunction: () => Promise<T>,
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
} => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { logout } = useAuth();

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchFunction();
      setData(data);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        logout();
        return;
      }
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, logout]);

  useEffect(() => {
    fetchData();
  }, [fetchData, fetchFunction]);

  const refresh = async () => {
    setLoading(true);
    return fetchData();
  };

  return { data, loading, error, refresh };
};
