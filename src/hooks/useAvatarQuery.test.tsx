'use client';

import { apiResponse } from '@/testing/mocks/mockUserDataWithAvatar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useAvatarQuery } from './useAvatarQuery';
import { SessionProvider, useSession } from 'next-auth/react';
import { getUserDataWithAvatar } from '@/lib/api/fetchUserData';
import { Session } from 'next-auth';

jest.mock('../lib/api/fetchUserData');

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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  afterEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  test('fetches user avatar when authenticated', async () => {
    (getUserDataWithAvatar as jest.Mock).mockResolvedValue(apiResponse);

    const { result } = renderHook(() => useAvatarQuery(), { wrapper });
    expect(result.current.status).toBe('pending');

    await waitFor(() =>
      expect(result.current.data).toStrictEqual({
        name: 'Michal Nadolny',
        src: 'https://res.cloudinary.com/devc11z9p/image/upload/v1729760796/avatar_image_4f813fc71f.png',
        alt: 'your Avatar',
      })
    );
  });

  test('have error status when fetch rejects', async () => {
    (getUserDataWithAvatar as jest.Mock).mockRejectedValue(new Error('error'));

    const { result } = renderHook(useAvatarQuery, { wrapper });
    expect(result.current.status).toBe('pending');

    await waitFor(() => expect(result.current.status).toBe('error'));
  });

  test('not load avatar when not authenticated', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: undefined,
      status: 'unauthentiated',
    });
    (getUserDataWithAvatar as jest.Mock).mockResolvedValue(apiResponse);

    const { result } = renderHook(useAvatarQuery, { wrapper });
    expect(result.current.status).toBe('pending');

    await waitFor(() => expect(result.current.status).toBe('pending'));
  });
});
