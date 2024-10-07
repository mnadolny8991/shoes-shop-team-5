'use client';
import { Box, CircularProgress } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  Suspense,
} from 'react';

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
  const searchParams = useSearchParams();

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    // init filters and search text from the searchParams
    setSearchText(searchParams.get('search') ?? '');
    setFilters({
      brand: JSON.parse(searchParams.get('brand') ?? 'null') ?? [],
      color: JSON.parse(searchParams.get('color') ?? 'null') ?? [],
      gender: JSON.parse(searchParams.get('gender') ?? 'null') ?? [],
      price: JSON.parse(searchParams.get('price') ?? 'null') ?? [0, 999],
      size: JSON.parse(searchParams.get('size') ?? 'null') ?? [],
    });
  }, [searchParams]);

  const getSearchParams = () => {
    const params = new URLSearchParams();
    params.set('search', searchText);
    params.set('brand', JSON.stringify(filters.brand));
    params.set('color', JSON.stringify(filters.color));
    params.set('gender', JSON.stringify(filters.gender));
    params.set('price', JSON.stringify(filters.price));
    params.set('size', JSON.stringify(filters.size));
    return params.toString();
  };

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <SearchContext.Provider
        value={{
          searchText,
          setSearchText,
          filters,
          setFilters,
          updateFilter,
          getSearchParams,
        }}
      >
        {children}
      </SearchContext.Provider>
    </Suspense>
  );
};

export { SearchContext, SearchContextProvider };
