'use client';
import { Box, CircularProgress } from '@mui/material';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

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
  getSearchParamsWithEmptyFilters: () => string;
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

const generateFilters = (searchParams: ReadonlyURLSearchParams): Filters => {
  return {
    brand: JSON.parse(searchParams.get('brand') ?? 'null') ?? [],
    color: JSON.parse(searchParams.get('color') ?? 'null') ?? [],
    gender: JSON.parse(searchParams.get('gender') ?? 'null') ?? [],
    price: JSON.parse(searchParams.get('price') ?? 'null') ?? [0, 999],
    size: JSON.parse(searchParams.get('size') ?? 'null') ?? [],
  };
}

const SearchContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(() => searchParams.get('search') ?? '');
  const [filters, setFilters] = useState<Filters>(() => generateFilters(searchParams));

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const getSearchParamsWithEmptyFilters = useCallback(() => {
    const params = new URLSearchParams();
    params.set('search', searchText);
    params.set('brand', 'null');
    params.set('color', 'null');
    params.set('gender', 'null');
    params.set('price', 'null');
    params.set('size', 'null');
    params.set('page', '1');
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
        getSearchParamsWithEmptyFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
