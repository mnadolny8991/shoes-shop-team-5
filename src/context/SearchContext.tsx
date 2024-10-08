'use client';
import { Box, CircularProgress } from '@mui/material';
import { createContext, useCallback, useContext, useState } from 'react';

// filters type
export type Filters = {
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
  getSearchParams: () => string;
  getSearchParamsWithEmptyFilters: () => string;
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

  const getSearchParams = useCallback(() => {
    const params = new URLSearchParams();
    params.set('search', searchText);
    params.set('brand', JSON.stringify(filters.brand));
    params.set('color', JSON.stringify(filters.color));
    params.set('gender', JSON.stringify(filters.gender));
    params.set('price', JSON.stringify(filters.price));
    params.set('size', JSON.stringify(filters.size));
    return params.toString();
  }, [filters, searchText]);

  const getSearchParamsWithEmptyFilters = useCallback(() => {
    const params = new URLSearchParams();
    params.set('search', searchText);
    params.set('brand', 'null');
    params.set('color', 'null');
    params.set('gender', 'null');
    params.set('price', 'null');
    params.set('size', 'null');
    return params.toString();
  }, [searchText]);

  return (
    <SearchContext.Provider
      value={{
        searchText,
        setSearchText,
        filters,
        setFilters,
        updateFilter,
        getSearchParams,
        getSearchParamsWithEmptyFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
