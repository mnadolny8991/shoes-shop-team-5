'use client';
import { fetchProductsByUserId } from '@/lib/api/fetchProducts';
import apiResponse from '@/testing/mocks/mockProductsByUserId';
import {
  QueryClient,
  QueryClientProvider,
  useQueries,
} from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useProductsByUserId } from './useProductsByUserId';

jest.mock('../lib/api/fetchProducts', () => ({
  fetchProductsByUserId: jest.fn(),
}));

describe('use products by user id', () => {
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

  test('finds all user related products on success', async () => {
    (fetchProductsByUserId as jest.Mock).mockResolvedValue(apiResponse);

    const { result } = renderHook(
      () => useProductsByUserId(679, 'some token', 1, 3),
      { wrapper }
    );

    await waitFor(() => expect(result.current.data.data).toHaveLength(7));
  });

  test('have error on failure', async () => {
    (fetchProductsByUserId as jest.Mock).mockRejectedValue(new Error());

    const { result } = renderHook(
      () => useProductsByUserId(679, 'some token', 1, 3),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
