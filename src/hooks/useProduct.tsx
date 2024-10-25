import { fetchProductById } from '@/lib/api/fetchProducts';
import mapProduct from '@/mappers/productMappers';
import { useQuery } from '@tanstack/react-query';

const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => mapProduct(await fetchProductById(id)),
  });
};

export default useProduct;
