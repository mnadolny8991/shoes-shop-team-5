import { Product } from '@/types/product';
import { BRANDS } from '@/mock/BRANDS';
import ALL_COLORS from '@/mock/ALL_COLORS';

//Filters types
export type Filters = {
  gender?: 'Men' | 'Women';
  brand?: string[];
  color?: string[];
  size?: string[];
  priceRange?: [number, number];
};

//Available product filters types
export type AvailableFilters = {
  brands: typeof BRANDS;
  genders: Array<'Men' | 'Women'>;
  colors: string[];
  sizes: string[];
  priceRange: {min: number; max: number};
};

export type SearchContextType = {
  products: Product[];
  filteredProducts: Product[];
  filters: Filters;
  searchQuery: string;
  searchFilters: (filters: Filters) => void;
  setSearchQuery: (query: string) => void;
  availableFilters: AvailableFilters;
};
