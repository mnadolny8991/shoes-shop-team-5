import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay: number, initialValue: T) => {
  const [debounced, setDebounced] = useState<T>(initialValue);

  useEffect(() => {
    const timId = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timId);
  }, [value, delay]);

  return debounced;
};

export default useDebounce;
