import { fetchProductsByUserId } from "@/lib/api/fetchProducts";
import { mapProductList } from "@/mappers/productMappers";
import { useQuery } from "@tanstack/react-query";

export const useProductsById = (id: number, token: string) => {
  return useQuery({
    queryKey: ['myProducts'],
    queryFn: async () => mapProductList(await fetchProductsByUserId(id, token)),
  });
}
