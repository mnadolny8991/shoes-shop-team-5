import apiUrl from '@/data/apiUrl';
import mapProduct, { mapProductList } from '@/mappers/productMappers';

export const fetchProductsByUserId = async (id: number, token: string) => {
  const response = await fetch(`${apiUrl}/products?filters[teamName]=team-5&filters[userID]=${id}&populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  if (!response.ok) throw new Error("Couldn't fetch products for userID = " + id);
  return mapProductList(await response.json());
}

export const fetchProductById = async (id: number) => {
  const response = await fetch(`${apiUrl}/products/${id}?populate=*`);
  if (!response.ok) throw new Error('There is no product with this id');
  const data = await response.json();
  return mapProduct(data);
};

export const fetchProducts = async () => {
  const response = await fetch(
    `${apiUrl}/products?filters[teamName]=team-5&populate=*`
  );
  if (!response.ok) throw new Error('Error while fetching products');
  const data = await response.json();
  return mapProductList(data);
};