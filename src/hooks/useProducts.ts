'use client';
import { fetchProductById } from '@/lib/api/fetchProducts';
import mapProduct from '@/mappers/productMappers';
import { ProductsContextType } from '@/types/api/ProductsContext';
import { Product } from '@/types/product';
import { useQueries } from '@tanstack/react-query';

const useProducts = (useProductsContext: () => ProductsContextType) => {
  const { ids, onProductRemove } = useProductsContext();
  const queries = ids.map((id: number) => {
    return {
      queryKey: ['product', id],
      queryFn: async () => mapProduct(await fetchProductById(id)),
      retry: false,
    };
  });
  const products = useQueries({ queries })
    .filter((result, index) => {
      if (result.isSuccess) {
        return true;
      } else if (result.isError) {
        const idToRemove = queries[index].queryKey[1] as number;
        onProductRemove(idToRemove);
        return false;
      }
      return true;
    })
    .map((result) => result.data)
    .filter((product) => product) as Product[];

  return products;
};

export default useProducts;
