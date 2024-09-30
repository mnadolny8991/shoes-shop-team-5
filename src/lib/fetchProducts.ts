import apiUrl from '@/data/apiUrl';
import mapProduct, { mapProductList } from '@/mappers/productMappers';
import { ApiError } from '@/types/api/apiError';
import { Filters } from '@/types/search';

export const fetchProductsByUserId = async (id: number, token: string) => {
  const response = await fetch(
    `${apiUrl}/products?filters[teamName]=team-5&filters[userID]=${id}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok)
    throw new Error("Couldn't fetch products for userID = " + id);
  return mapProductList(await response.json());
};

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
  if (!response.ok) {
    throw new Error('Error while fetching products', {
      cause: (await response.json()).error as ApiError,
    });
  }
  const data = await response.json();
  return mapProductList(data);
};

const getFiltersStringArray = (filters: Filters): string[] => {
  const genderFilter = filters.gender
    ? `filters[gender][name]=${filters.gender}`
    : '';
  const brandFilter = filters.brand
    ? `filters[brand][name]=${filters.brand}`
    : '';
  const colorFilter = filters.color
    ? `filters[color][name]=${filters.color}`
    : '';
  const sizeFilters = filters.size
    ? filters.size.map((size) => `filters[sizes][value]=${size}`)
    : [];
  const priceRangeFilter = filters.priceRange
    ? `filters[price][$gte]=${filters.priceRange[0]}&filters[price][$lte]=${filters.priceRange[1]}`
    : '';
  const filtersStrArray = [
    genderFilter,
    brandFilter,
    colorFilter,
    ...sizeFilters,
    priceRangeFilter,
  ];
  return filtersStrArray.filter((filter) => filter !== '');
}

export const fetchProductsWithFiltersByPage = async (filters: Filters, page: number, pageSize: number) => {
  const filtersStrArray = getFiltersStringArray(filters);
  const response = await fetch(
    `${apiUrl}/products?pagination[page]=${page}&pagination[pageSize]=${pageSize}&` +
    `${filtersStrArray.join('&')}&` +
    'filters[teamName]=team-5&populate=*'
  );
  if (!response.ok) {
    throw new Error('Error while fetching products', {
      cause: (await response.json()).error as ApiError,
    });
  }
  const data = await response.json();
  return mapProductList(data);
};
