'use client';
import {
  fetchBrands,
  fetchColors,
  fetchGenders,
  fetchSize,
  fetchSizes,
} from '@/lib/api/fetchCategories';
import {
  mapAllColors,
  mapAllSizes,
  mapApiSizeToSize,
  mapBrands,
  mapGenders,
} from '@/mappers/productMappers';
import { useQuery } from '@tanstack/react-query';

export const useColors = () => {
  return useQuery({
    queryKey: ['colors'],
    queryFn: async () => mapAllColors(await fetchColors()),
  });
};

export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => mapBrands(await fetchBrands()),
  });
};

export const useGenders = () => {
  return useQuery({
    queryKey: ['genders'],
    queryFn: async () => mapGenders(await fetchGenders()),
  });
};

export const useSizes = () => {
  return useQuery({
    queryKey: ['sizes'],
    queryFn: async () => mapAllSizes(await fetchSizes()),
  });
};

