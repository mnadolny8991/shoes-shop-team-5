import apiUrl from '@/data/apiUrl';
import mapProduct from '@/mappers/productMappers';

export const fetchProductById = async (id: number) => {
  const response = await fetch(`${apiUrl}/products/${id}?populate=*`);
  if (!response.ok) throw new Error('There is no product with this id');
  const data = await response.json();
  return mapProduct(data);
};
