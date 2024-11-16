import { useCallback, useRef } from 'react';

export const useDebouncedCallback = (
  func: (...args: any) => any,
  wait: number,
) => {
  const timeout = useRef<NodeJS.Timeout | null>();

  return useCallback(
    (...args: any) => {
      const later = () => {
        if (timeout.current) clearTimeout(timeout.current);
        func(...args);
      };

      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(later, wait);
    },
    [func, wait],
  );
};
