'use client';
import { Filters } from "@/context/SearchContext";
import { fetchProductsByFiltersAndName } from "@/lib/api/fetchProducts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useFilteredProducts = (searchText: string, filters: Filters, page: number) => {
  const query = useQuery({
    queryKey: ['products', { searchText, filters, page }],
    queryFn: () => fetchProductsByFiltersAndName(filters, searchText, page, 6),
    placeholderData: keepPreviousData,
  });

  return query;
}

export default useFilteredProducts;