import { renderHook, waitFor } from '@testing-library/react';
import useProduct from '@/hooks/useProduct';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchProductById } from '@/lib/api/fetchProducts';
import mapProduct from '@/mappers/productMappers';
import apiResponse from '@/testing/mocks/mockProductById';

jest.mock('../lib/api/fetchProducts', () => ({
  fetchProductById: jest.fn(),
}));

describe('useProduct', () => {
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

  test('should return product data when fetch is successful', async () => {
    // Mock fetchProductById return value
    (fetchProductById as jest.Mock).mockResolvedValue(apiResponse);

    // Act: Render the hook inside the QueryClientProvider
    const { result } = renderHook(() => useProduct(2084), { wrapper });

    // Assert: Initially, loading state should be true
    expect(result.current.isLoading).toBe(true);

    // Wait for the query to finish
    await waitFor(() => expect(result.current.isSuccess).toBe(true), {
      timeout: 5000,
    });

    // Check if product is mapped
    await waitFor(async () =>
      expect(result.current.data).toEqual(await mapProduct(apiResponse))
    );
  });

  test('should handle error when fetch fails', async () => {
    // Arrange: Mock the fetchProductById function to throw an error
    const errorMessage = 'Failed to fetch product';
    (fetchProductById as jest.Mock).mockRejectedValue(new Error(errorMessage));

    // Act: Render the hook inside the QueryClientProvider
    const { result } = renderHook(() => useProduct(2084), { wrapper });

    // Assert: Initially, loading state should be true
    expect(result.current.isLoading).toBe(true);

    // Wait for the query to finish
    await waitFor(() => expect(result.current.isError).toBe(true), {
      timeout: 5000,
    });

    // Check if the error message is correct
    expect(result.current.error?.message).toBe(errorMessage);
  });
});
