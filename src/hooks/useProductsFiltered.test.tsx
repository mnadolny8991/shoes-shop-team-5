'use client';
import { fetchProductsByFiltersAndName } from '@/lib/api/fetchProducts';
import apiResponse from '@/testing/mocks/mockProductsByUserId';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import useFilteredProducts from './useProductsFiltered';
import { Filters } from '@/context/SearchContext';

jest.mock('../lib/api/fetchProducts', () => ({
  fetchProductsByFiltersAndName: jest.fn(),
}));

describe('use filtered products', () => {
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
    queryClient.clear();
    jest.clearAllMocks();
  });

  test('finds products', async () => {
    (fetchProductsByFiltersAndName as jest.Mock).mockResolvedValue(apiResponse);

    const { result } = renderHook(
      () =>
        useFilteredProducts(
          'example text',
          {
            gender: [],
            size: [],
            brand: [],
            price: [1, 999],
            color: [],
          },
          1
        ),
      { wrapper }
    );
    await waitFor(() => expect(result.current.data.data).toHaveLength(7));
  });

  test('have error on failure', async () => {
    (fetchProductsByFiltersAndName as jest.Mock).mockRejectedValue(new Error());

    const { result } = renderHook(
      () =>
        useFilteredProducts(
          'example text',
          {
            gender: [],
            size: [],
            brand: [],
            price: [1, 999],
            color: [],
          },
          1
        ),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
