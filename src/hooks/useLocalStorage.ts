// 'use client';
// import { useEffect, useState } from 'react';

// const useLocalStorage = <T>(key: string, initialValue: T) => {
//   const [data, setData] = useState<T>(initialValue);
//   const [isMounted, setIsMounted] = useState(false); // Track hydration

//   useEffect(() => {
//     setIsMounted(true); // Set mounted to true when the component mounts
//   }, []);

//   useEffect(() => {
//     if (isMounted) {
//       const dataJson = localStorage.getItem(key);
//       if (dataJson) {
//         setData(JSON.parse(dataJson) as T);
//       }
//     }
//   }, [isMounted, key]);

//   useEffect(() => {
//     if (isMounted) {
//       localStorage.setItem(key, JSON.stringify(data));
//     }
//   }, [data, key, isMounted]);

//   return [data, setData] as const;
// };

// export default useLocalStorage;
