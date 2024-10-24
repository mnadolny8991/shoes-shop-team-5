'use client';
import { fetchProductsByFiltersAndName } from '@/lib/api/fetchProducts';
import apiResponse from '@/testing/mocks/mockProductsByUserId';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useAvatarQuery } from './useAvatarQuery';
import { Filters } from '@/context/SearchContext';
import { SessionProvider, useSession } from 'next-auth/react';

jest.mock('../lib/api/fetchProducts', () => ({
  fetchProductsByFiltersAndName: jest.fn(),
}));

describe('use avatar query hook', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
       retry: false,
      },
    }, 
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    );
  }

  afterEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  test('fetches user avatar given a session', () => {
    
  });
});