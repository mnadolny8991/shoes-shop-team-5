import apiUrl from '@/data/apiUrl';
import fetchData from '@/lib/api/fetchData';

export const fetchSizes = async () =>
  await fetchData(`${apiUrl}/sizes?fields=value`);
export const fetchColors = async () =>
  await fetchData(`${apiUrl}/colors?fields=name`);
export const fetchBrands = async () =>
  await fetchData(`${apiUrl}/brands?fields=name`);
export const fetchGenders = async () =>
  await fetchData(`${apiUrl}/genders?fields=name`);
export const fetchSize = async (id: number) => 
  await fetchData(`${apiUrl}/sizes/${id}`);
