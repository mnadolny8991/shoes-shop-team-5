'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { apiResponse as apiResponseGenders } from '@/testing/mocks/mockGenders';
import { apiResponse as apiResponseColors } from '@/testing/mocks/mockColors';
import { apiResponse as apiResponseBrands } from '@/testing/mocks/mockBrands';
import { apiResponse as apiResponseSizes } from '@/testing/mocks/mockSizes';
import * as fetchCategories from '@/lib/api/fetchCategories';
import * as categories from '@/hooks/categories';
import {
  mapAllCategories,
  mapAllColors,
  mapAllSizes,
  mapBrands,
  mapGenders,
} from '@/mappers/productMappers';
import { renderHook, waitFor } from '@testing-library/react';

jest.mock('../lib/api/fetchCategories');

describe('category hooks', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  afterEach(() => {
    jest.resetAllMocks();
    queryClient.clear();
  });

  test('use colors hook', async () => {
    (fetchCategories.fetchColors as jest.Mock)
      .mockResolvedValueOnce(apiResponseColors)
      .mockRejectedValueOnce(new Error('error'));

    const { result: resultSuccess } = renderHook(categories.useColors, { wrapper });
    expect(resultSuccess.current.status).toBe('pending');

    await waitFor(() =>
      expect(resultSuccess.current.data).toStrictEqual(mapAllColors(apiResponseColors))
    );

    const { result } = renderHook(categories.useColors, { wrapper });

    await waitFor(() =>
      expect(result.current.isError).toBeTruthy()
    );
  });

  test('use genders hook', async () => {
    (fetchCategories.fetchGenders as jest.Mock)
      .mockResolvedValueOnce(apiResponseGenders)
      .mockRejectedValueOnce(new Error('error'));

    const { result: resultSuccess } = renderHook(categories.useGenders, { wrapper });
    expect(resultSuccess.current.status).toBe('pending');

    await waitFor(() =>
      expect(resultSuccess.current.data).toStrictEqual(mapGenders(apiResponseGenders))
    );

    const { result } = renderHook(categories.useGenders, { wrapper });

    await waitFor(() =>
      expect(result.current.isError).toBeTruthy()
    );
  });

  test('use sizes hook', async () => {
    (fetchCategories.fetchSizes as jest.Mock)
      .mockResolvedValueOnce(apiResponseSizes)
      .mockRejectedValueOnce(new Error('error'));

    const { result: resultSuccess } = renderHook(categories.useSizes, { wrapper });
    expect(resultSuccess.current.status).toBe('pending');

    await waitFor(() =>
      expect(resultSuccess.current.data).toStrictEqual(mapAllSizes(apiResponseSizes))
    );

    const { result } = renderHook(categories.useSizes, { wrapper });

    await waitFor(() =>
      expect(result.current.isError).toBeTruthy()
    );
  });

  test('use brands hook', async () => {
    (fetchCategories.fetchBrands as jest.Mock)
    .mockResolvedValueOnce(apiResponseBrands)
    .mockRejectedValueOnce(new Error('error'));

    const { result: resultSuccess } = renderHook(categories.useBrands, { wrapper });
    expect(resultSuccess.current.status).toBe('pending');

    await waitFor(() =>
      expect(resultSuccess.current.data).toStrictEqual(mapBrands(apiResponseBrands))
    );

    const { result } = renderHook(categories.useBrands, { wrapper });

    await waitFor(() =>
      expect(result.current.isError).toBeTruthy()
    );
  });
});
