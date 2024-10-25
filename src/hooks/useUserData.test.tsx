import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import useUserData from './useUserData'; // Adjust the path based on your project structure
import { getUserData } from '@/lib/api/fetchUserData';

jest.mock('../lib/api/fetchUserData', () => ({
  getUserData: jest.fn(),
})); // Mock the entire module

describe('useUserData', () => {
  const mockToken = 'test-token';
  const mockUserId = 1;

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
    jest.clearAllMocks();
    queryClient.clear();
  });

  test('fetches user data successfully', async () => {
    const mockUserData = { id: mockUserId, name: 'John Doe' };
    (getUserData as jest.Mock).mockResolvedValue(mockUserData);

    const { result } = renderHook(() => useUserData(mockUserId, mockToken), { wrapper });

    // Initially, the data should be undefined
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();

    // Wait for the query to resolve
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // After the data is loaded
    expect(result.current.data).toEqual(mockUserData);
    expect(result.current.error).toBeNull();
  });

  test('handles error when fetching user data', async () => {
    const mockError = new Error('Failed to fetch user data');
    (getUserData as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useUserData(mockUserId, mockToken), { wrapper });

    expect(result.current.error).toBeNull();

    // Wait for the query to resolve
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // After the error is caught
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual(mockError);
  });
});
