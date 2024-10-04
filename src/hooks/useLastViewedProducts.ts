'use client';
import { useLastViewed } from '@/context/LastViewedContext';
import { fetchProductById } from '@/lib/api/fetchProducts';
import mapProduct from '@/mappers/productMappers';
import { Product } from '@/types/product';
import { useQueries } from '@tanstack/react-query';

const useLastViewedProducts = () => {
  const { lastViewedIds, onLastViewedRemove } = useLastViewed();
  const queries = lastViewedIds.map((id: number) => {
    return {
      queryKey: ['product', id],
      queryFn: async () => mapProduct(await fetchProductById(id)),
      retry: false,
    };
  });
  const lastViewed = useQueries({ queries });
  const products = lastViewed
    .filter((result, index) => {
      if (result.isSuccess) {
        return true;
      } else if (result.isError) {
        const idToRemove = queries[index].queryKey[1] as number;
        onLastViewedRemove(idToRemove);
        return false;
      }
      return true;
    })
    .map((result) => result.data)
    .filter((product) => product) as Product[];

  return products;
};

export default useLastViewedProducts;
