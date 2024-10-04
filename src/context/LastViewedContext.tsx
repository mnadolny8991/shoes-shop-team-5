'use client';
import useLocalStorage from '@/hooks/useLocalStorage';
import { createContext, useContext, ReactNode, FC, useEffect } from 'react';

type LastViewedContextType = {
  lastViewedIds: number[];
  onLastViewedAdd: (id: number) => void;
  onLastViewedRemove: (id: number) => void;
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

  const handleLastViewedRemove = (id: number) => {
    setLastViewedIds(lastViewedIds.filter((i) => i !== id));
  };

  return (
    <LastViewedContext.Provider
      value={{
        lastViewedIds,
        onLastViewedAdd: handleLastViewedAdd,
        onLastViewedRemove: handleLastViewedRemove,
      }}
    >
      {children}
    </LastViewedContext.Provider>
  );
};

export default LastViewedContextProvider;
