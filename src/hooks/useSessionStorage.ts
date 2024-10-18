import { useEffect, useState } from "react";

const useSessionStorage = <T>(key: string, initialValue: T) => {
  const [data, setData] = useState<T>(initialValue);
  const [isMounted, setIsMounted] = useState(false); // Track hydration

  useEffect(() => {
    setIsMounted(true); // Set mounted to true when the component mounts
  }, []);

  useEffect(() => {
    const dataJson = sessionStorage.getItem(key);
    if (dataJson) {
      setData(JSON.parse(dataJson) as T);
    }
  }, [key]);

  useEffect(() => {
    if (isMounted) {
      sessionStorage.setItem(key, JSON.stringify(data));
    }
  }, [data, key, isMounted]);

  return [data, setData] as const;
};

export default useSessionStorage;