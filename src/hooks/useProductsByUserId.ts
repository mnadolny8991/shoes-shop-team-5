import { fetchProductsByUserId } from '@/lib/api/fetchProducts';
import { useQuery } from '@tanstack/react-query';

export const useProductsByUserId = (id: number, token: string, page: number, itemsPerPage: number) => {
  return useQuery({
    queryKey: ['myProducts', page],
    queryFn: () => fetchProductsByUserId(id, token, '*', 'updatedAt', 'desc', page, itemsPerPage),
  });
};
