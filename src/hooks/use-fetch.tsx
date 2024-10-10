import { useState, useEffect, useCallback } from 'react';

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

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchFunction();
      setData(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData, fetchFunction]);

  const refresh = async () => {
    setLoading(true);
    return fetchData();
  };

  return { data, loading, error, refresh };
};
