import { fetchProductsByUserId } from '@/lib/api/fetchProducts';
import { mapProductList } from '@/mappers/productMappers';
import { useQuery } from '@tanstack/react-query';

export const useProductsByUserId = (id: number, token: string, page: number, itemsPerPage: number) => {
  return useQuery({
    queryKey: ['myProducts'],
    queryFn: async () => mapProductList(await fetchProductsByUserId(id, token, '*', 'updatedAt', 'desc', page, itemsPerPage)),
  });
};
