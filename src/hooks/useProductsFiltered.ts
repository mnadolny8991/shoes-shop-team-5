'use client';
import { Filters } from '@/context/SearchContext';
import pageSize from '@/data/pageSize';
import { fetchProductsByFiltersAndName } from '@/lib/api/fetchProducts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useFilteredProducts = (
  searchText: string,
  filters: Filters,
  page: number
) => {
  const query = useQuery({
    queryKey: ['products', { filters: JSON.stringify(filters), searchText, page }],
    queryFn: () => fetchProductsByFiltersAndName(filters, searchText, page, pageSize),
    placeholderData: keepPreviousData,
  });

  return query;
};

export default useFilteredProducts;
