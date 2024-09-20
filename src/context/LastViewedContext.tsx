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
  isLoading: boolean;
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

  const handleLastViewedAdd = (id: number) => {
    setLastViewedIds((prev) => {
      const lastViewedHashSet = new Set(prev);
      if (lastViewedHashSet.has(id)) return prev; // No duplicates allowed

      const updatedIds = [...prev, id];

      if (updatedIds.length > 4) {
        return updatedIds.slice(1);
      }

      return updatedIds;
    });
  };

  const isLoading = lastViewed.some((query) => query.isLoading);

  return (
    <LastViewedContext.Provider
      value={{
        lastViewed: lastViewed.map((p) => p.data!) ?? [],
        onLastViewedAdd: handleLastViewedAdd,
        isLoading,
      }}
    >
      {children}
    </LastViewedContext.Provider>
  );
};

export default LastViewedContextProvider;
