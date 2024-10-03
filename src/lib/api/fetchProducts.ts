import apiUrl from '@/data/apiUrl';
import { Filters } from '@/context/SearchContext';
import fetchData from '@/lib/api/fetchData';

export const fetchProductsByUserId = async (
  id: number,
  token: string,
  populate?: string
) => {
  return await fetchData(
    `${apiUrl}/products?filters[teamName]=team-5&filters[userID]=${id}&populate=${populate ?? '*'}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const fetchProductById = async (id: number, populate?: string) => {
  return await fetchData(
    `${apiUrl}/products/${id}?populate=${populate ?? '*'}`
  );
};

export const fetchProducts = async (populate?: string) =>
  await fetchData(
    `${apiUrl}/products?filters[teamName]=team-5&populate=${populate ?? '*'}`
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
  populate?: string
) => {
  const filtersStrArray = getFiltersStringArray(filters);
  const nameQuery = name ? `filters[name][$containsi]=${name}` : '';
  const queryString =
    `${apiUrl}/products?pagination[page]=${page}&pagination[pageSize]=${pageSize}&` +
    `${filtersStrArray.join('&')}&${nameQuery}&` +
    `filters[teamName]=team-5&populate=${populate ?? '*'}`;
  // console.log(queryString);
  return await fetchData(queryString);
};
