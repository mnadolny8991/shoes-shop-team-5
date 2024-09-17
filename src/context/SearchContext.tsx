'use client';
import { createContext, useContext, useState, ReactNode, FC } from 'react';

// filters type
type Filters = {
  gender: string[];
  size: string[];
  brand: string[];
  price: [number, number];
  color: string[];
};

// context type
type SearchContextType = {
  searchText: string;
  setSearchText: (query: string) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
};

const defaultFilters: Filters = {
  gender: [],
  size: [],
  brand: [],
  price: [0, 999],
  color: [],
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Custom hook to access search context
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

const SearchContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SearchContext.Provider
      value={{
        searchText,
        setSearchText,
        filters,
        setFilters,
        updateFilter,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
