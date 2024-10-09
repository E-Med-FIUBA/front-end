import { useState, useEffect } from 'react';

export const useFetch = <T,>(
  fetchFunction: () => Promise<T>,
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
} => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFunction();
        setData(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchFunction]);

  return { data, loading, error };
};
