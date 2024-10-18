import { useCartContext } from "@/context/CartContext";
import { fetchProductById } from "@/lib/api/fetchProducts";
import mapProduct from "@/mappers/productMappers";
import { Product } from "@/types/product";
import { useQueries } from "@tanstack/react-query";

const useCartSubtotal = () =>{
    const { amount, onDelete } = useCartContext();

    const queries = amount.map(product =>({
            queryKey: ['product', product.id],
            queryFn: async () => mapProduct(await fetchProductById(product.id)),
            retry: false,
        }))
    const {productsData, isPending} = useQueries({
        queries,
        combine: productsData => ({
            productsData: productsData.filter(({isError}, i) => isError ? onDelete(queries[i].queryKey[1] as number) : true) as {data:Product}[],
            isPending: productsData.some(({isPending}) => isPending)
        })
    })

    const subtotal = isPending ? 0 : productsData.map(({data}) => data).reduce(
        (acc, val) =>
          val.price * amount.find((a) => a.id === val.id)?.amount! + acc,
        0
      )
    return {subtotal, isPending}
}
export default useCartSubtotal