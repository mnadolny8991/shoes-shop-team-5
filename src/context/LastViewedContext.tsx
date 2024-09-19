'use client';
import apiUrl from '@/data/apiUrl';
import useLocalStorage from '@/hooks/useLocalStorage';
import mapProduct from '@/mappers/productMappers';
import { Product } from '@/types/product';
import { useQueries } from '@tanstack/react-query';
import { createContext, useContext, ReactNode, FC } from 'react';

type LastViewedContextType = {
  lastViewed: Product[];
  onLastViewedAdd: (id: number) => void;
};

const LastViewedContext = createContext<LastViewedContextType | undefined>(
  undefined
);

export const useLastViewed = () => {
  const context = useContext(LastViewedContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

const LastViewedContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lastViewedIds, setLastViewedIds] = useLocalStorage<number[]>(
    'lastViewed',
    []
  );
  const lastViewed = useQueries({
    queries: lastViewedIds.map((id: number) => {
      return {
        queryKey: ['product', id],
        queryFn: () =>
          fetch(`${apiUrl}/products/${id}?populate=*`)
            .then((res) => {
              if (res.status === 404) {
                console.log('somethings wrong');
                throw new Error('There is no product with this id');
              }
              return res.json();
            })
            .then((data) => mapProduct(data)),
      };
    }),
  });

  const lastViewedHashSet = new Set(lastViewedIds);

  const handleLastViewedAdd = (id: number) => {
    if (lastViewedIds.length === 4) 
      setLastViewedIds(lastViewedIds.filter((_id, idx) => idx > 0));
    if (!lastViewedHashSet.has(id))
      setLastViewedIds(prev => [...prev, id]);
  };

  return (
    <LastViewedContext.Provider
      value={{
        lastViewed: lastViewed.map((p) => p.data!) ?? [],
        onLastViewedAdd: handleLastViewedAdd,
      }}
    >
      {children}
    </LastViewedContext.Provider>
  );
};

export default LastViewedContextProvider;
