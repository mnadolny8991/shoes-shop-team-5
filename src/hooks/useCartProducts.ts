'use client';
import { useCartContext } from '@/context/CartContext';
import { fetchProductById } from '@/lib/api/fetchProducts';
import mapProduct from '@/mappers/productMappers';
import { Product } from '@/types/product';
import { useQueries } from '@tanstack/react-query';

const useCartProducts = () => {
  const { amount, onDelete } = useCartContext();

  const queries = amount.map((product) => {
    return {
      queryKey: ['product', product.productId],
      queryFn: async () => mapProduct(await fetchProductById(product.productId)),
      retry: false,
    };
  });
  const productsData = useQueries({ queries });

  const isLoading = productsData.some((q) => q.isLoading);

  const products = productsData
    .filter((result, index) => {
      if (result.isSuccess) {
        return true;
      } else if (result.isError) {
        const idToRemove = queries[index].queryKey[1] as number;
        amount.forEach(
          (cartEntry) => cartEntry.productId === idToRemove 
            ? onDelete(cartEntry.id) 
            : null
        );
        return false;
      }
      return true;
    })
    .map((result) => result.data)
    .filter((product) => product) as Product[];

  return { products, isLoading };
};

export default useCartProducts;
