'use client';
import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [data, setData] = useState<T>(() => {
    const dataJson = window.localStorage.getItem(key);
    if (dataJson) {
      return JSON.parse(dataJson) as T;
    }
    return initialValue as T;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData] as const;
};

export default useLocalStorage;
