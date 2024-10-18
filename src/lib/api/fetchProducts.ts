import apiUrl from '@/data/apiUrl';
import { Filters } from '@/context/SearchContext';
import fetchData from '@/lib/api/fetchData';
import { ApiPostProduct, ApiPutProduct } from '@/types/api/apiTypes';

export const fetchProductsByUserId = async (
  id: number,
  token: string,
  populate?: string,
  sort?: string,
  sortDir?: string,
  page?: number,
  itemsPerPage?: number
) => {
  return await fetchData(
    `${apiUrl}/products?filters[teamName]=team-5&` +
    `filters[userID]=${id}` +
    `&populate=${populate ?? '*'}${sort ? '&sort=' + sort + (sortDir ? ':' + sortDir : '') : ''}` +
    `${page ? `&pagination[page]=${page}` : ''}` +
    `${itemsPerPage ? `&pagination[pageSize]=${itemsPerPage}` : ''}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const fetchProductById = async (
  id: number,
  populate?: string,
  options?: RequestInit
) => {
  return await fetchData(
    `${apiUrl}/products/${id}?populate=${populate ?? '*'}`, options
  );
};

export const fetchProducts = async (populate?: string, sort?: string, sortDir?: string) =>
  await fetchData(
    `${apiUrl}/products?filters[teamName]=team-5&populate=${populate ?? '*'}` +
    `${sort ? '&sort=' + sort + (sortDir ? ':' + sortDir : '') : ''}`
  );

const getFiltersStringArray = (filters: Filters): string[] => {
  const genderFilters = filters.gender
    ? filters.gender.map((gender) => `filters[gender][name]=${gender}`)
    : [];
  const brandFilters = filters.brand
    ? filters.brand.map((brand) => `filters[brand][name]=${brand}`)
    : [];
  const colorFilters = filters.color
    ? filters.color.map((color) => `filters[color][name][$containsi]=${color}`)
    : [];
  const sizeFilters = filters.size
    ? filters.size.map((size) => `filters[sizes][value]=${size}`)
    : [];
  const priceRangeFilter = filters.price
    ? `filters[price][$gte]=${filters.price[0]}&filters[price][$lte]=${filters.price[1]}`
    : '';
  const filtersStrArray = [
    ...genderFilters,
    ...brandFilters,
    ...colorFilters,
    ...sizeFilters,
    priceRangeFilter,
  ];
  return filtersStrArray.filter((filter) => filter !== '');
};

export const fetchProductsByFiltersAndName = async (
  filters: Filters,
  name: string,
  page: number,
  pageSize: number,
  populate?: string,
  sort?: string,
  sortDir?: string,
  options?: RequestInit,
) => {
  const filtersStrArray = getFiltersStringArray(filters);
  const nameQuery = name ? `filters[name][$containsi]=${name}` : '';
  const queryString =
    `${apiUrl}/products?pagination[page]=${page}&pagination[pageSize]=${pageSize}&` +
    `${filtersStrArray.join('&')}&${nameQuery}&` +
    `filters[teamName]=team-5&populate=${populate ?? '*'}` +
    `${sort ? '&sort=' + sort + (sortDir ? ':' + sortDir : '') : ''}`;
  // console.log(queryString);
  return await fetchData(queryString, options);
};

export const saveProduct = async (
  productProps: ApiPostProduct,
  token: string
) => {
  return await fetchData(`${apiUrl}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: productProps }),
  });
};

export const updateProduct = async (
  productProps: ApiPutProduct,
  id: number,
  token: string
) =>
  await fetchData(`${apiUrl}/products/${id}?populate=*`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: productProps }),
  });

export const deleteProductReturnImages = async (id: number, token: string) =>
  await fetchData(
    `${apiUrl}/products/${id}?populate[images][fields][0]=id&populate[images][populate][related][fields][0]=id`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
