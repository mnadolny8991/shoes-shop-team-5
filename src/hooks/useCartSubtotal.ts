import { useCartContext } from '@/context/CartContext';
import { fetchProductById } from '@/lib/api/fetchProducts';
import mapProduct from '@/mappers/productMappers';
import { Product } from '@/types/product';
import { useQueries } from '@tanstack/react-query';

const useCartSubtotal = () => {
  const { amount, onDelete } = useCartContext();

  const queries = amount.map((product) => ({
    queryKey: ['product', product.productId],
    queryFn: async () => mapProduct(await fetchProductById(product.productId)),
    retry: false,
  }));
  const { productsData, isPending } = useQueries({
    queries,
    combine: (productsData) => ({
      productsData: productsData.filter(({ isError }, i) =>
        isError ? onDelete(amount.find((e) => e.productId === queries[i].queryKey[1])!.id) : true
      ) as { data: Product }[],
      isPending: productsData.some(({ isPending }) => isPending),
    }),
  });

  const subtotal = isPending
    ? 0
    : productsData
        .map(({ data }) => data)
        .reduce(
          (acc, val) =>
            val.price * amount.find((a) => a.productId === val.id)?.amount! + acc,
          0
        );
  return { subtotal, isPending };
};
export default useCartSubtotal;
