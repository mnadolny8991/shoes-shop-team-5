import apiUrl from '@/data/apiUrl';
import mapProduct, { mapProductList } from '@/mappers/productMappers';
import { ApiError } from '@/types/api/apiError';
import { Filters } from '@/context/SearchContext';
import { QuizRounded } from '@mui/icons-material';

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
  const genderFilters = filters.gender
    ? filters.gender.map((gender) => `filters[gender][name]=${gender}`)
    : [];
  const brandFilters = filters.brand
    ? filters.brand.map((brand) => `filters[brand][name]=${brand}`)
    : [];
  const colorFilters = filters.color
    ? filters.color.map((color) => `filters[color][name]=${color}`)
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
  pageSize: number
) => {
  const filtersStrArray = getFiltersStringArray(filters);
  const nameQuery = name ? `filters[name][$containsi]=${name}` : '';
  const queryString =
    `${apiUrl}/products?pagination[page]=${page}&pagination[pageSize]=${pageSize}&` +
    `${filtersStrArray.join('&')}&${nameQuery}&` +
    'filters[teamName]=team-5&populate=*';
  // console.log(queryString);
  const response = await fetch(queryString);
  if (!response.ok) {
    throw new Error('Error while fetching products', {
      cause: (await response.json()).error as ApiError,
    });
  }
  const data = await response.json();
  return mapProductList(data);
};
