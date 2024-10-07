'use client';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ProductsContextType } from '@/types/api/ProductsContext';
import { createContext, useContext, ReactNode, FC, useEffect } from 'react';

const LastViewedContext = createContext<ProductsContextType | undefined>(
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

  const handleLastViewedAdd = (id: number) => {
    setLastViewedIds((prev) => {
      const lastViewedHashSet = new Set(prev);
      if (lastViewedHashSet.has(id)) return prev; // No duplicates allowed

      const updatedIds = [id, ...prev];

      if (updatedIds.length > 4) {
        updatedIds.pop();
      }

      return updatedIds;
    });
  };

  const handleLastViewedRemove = (id: number) => {
    setLastViewedIds(lastViewedIds.filter((i) => i !== id));
  };

  return (
    <LastViewedContext.Provider
      value={{
        ids: lastViewedIds,
        onProductAdd: handleLastViewedAdd,
        onProductRemove: handleLastViewedRemove,
      }}
    >
      {children}
    </LastViewedContext.Provider>
  );
};

export default LastViewedContextProvider;
