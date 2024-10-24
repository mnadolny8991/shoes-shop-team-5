'use client';
import { CartContextProvider } from '@/context/CartContext';
import { fetchProductById } from '@/lib/api/fetchProducts';
import mapProduct from '@/mappers/productMappers';
import { ProductsContextType } from '@/types/ProductsContext';
import { Product } from '@/types/product';
import { QueryClient, QueryClientProvider, useQueries } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import apiResponses from '@/testing/mocks/mockProductsById';
import { renderHook, waitFor } from '@testing-library/react';
import useProducts from './useProducts';
import WishlistContextProvider, { useWishlist } from '@/context/WishlistContext';

jest.mock('../lib/api/fetchProducts', () => ({
  fetchProductById: jest.fn(),
}));

describe('products hook', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
       retry: false,
      },
    }, 
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <WishlistContextProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WishlistContextProvider>
    );
  }

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      'wishlist',
      JSON.stringify([
        2084,
        1564,
      ])
    );
  });

  afterEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  test('should return product data when fetch is successful', async () => { 
    (fetchProductById as jest.Mock)
      .mockResolvedValueOnce(apiResponses[0])
      .mockResolvedValueOnce(apiResponses[1]);

    const { result } = renderHook(() => useProducts(useWishlist), { wrapper });

    // Expect to have two products when successfull
    await waitFor(() => expect(result.current).toHaveLength(2));
  });

  test('to not fetch nonexisting items', async () => { 
    (fetchProductById as jest.Mock)
      .mockRejectedValueOnce('error')
      .mockResolvedValueOnce(apiResponses[1]);

    const { result } = renderHook(() => useProducts(useWishlist), { wrapper });

    // Expect to have only one product if successfull
    await waitFor(() => expect(result.current).toHaveLength(1));
  });
})