import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserUpdateFormData } from '@/types/userUpdateFormData';
import { updateUserData } from '@/lib/api/fetchUser';
import { renderHook, waitFor } from '@testing-library/react';
import useUpdateUserDataMutation from './useUpdateUserDataMutation';

const mockQueryClient = {
  invalidateQueries: jest.fn(),
  setQueryData: jest.fn(),
};
const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
jest.mock('../lib/api/fetchUser', () => ({
  updateUserData: jest.fn(),
}));

describe('update user data', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(QueryClient.prototype, 'invalidateQueries')
      .mockImplementation(mockQueryClient.invalidateQueries);
    jest
      .spyOn(QueryClient.prototype, 'setQueryData')
      .mockImplementation(mockQueryClient.setQueryData);
    queryClient.clear();
  });

  test('mutation success', async () => {
    const mockUserData = {
      email: 'jon.snow@example.com',
      firstName: 'jon',
      lastName: 'snow',
      phoneNumber: '7255555551',
    } as UserUpdateFormData;
    (updateUserData as jest.Mock).mockResolvedValue(mockUserData);
    const { result } = renderHook(() => useUpdateUserDataMutation(1, 'token'), { wrapper });

    expect(result.current.status).toBe('idle');
    result.current.mutate(mockUserData);

    await waitFor(
      () => expect(updateUserData).toHaveBeenCalledWith(1, 'token', mockUserData)
    );
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['userAvatar']});
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['user']});
  });

  test('mutation failure', () => {
    const mockUserData = {
      email: 'jon.snow@example.com',
      firstName: 'jon',
      lastName: 'snow',
      phoneNumber: '7255555551',
    } as UserUpdateFormData;
    (updateUserData as jest.Mock).mockRejectedValue(new Error('message'));
    const { result } = renderHook(() => useUpdateUserDataMutation(1, 'token'), { wrapper });

    expect(result.current.status).toBe('idle');
    result.current.mutate(mockUserData);

    waitFor(
      () => expect(result.current.error?.message).toBe('message')
    );
    expect(mockQueryClient.invalidateQueries).not.toHaveBeenCalledWith({ queryKey: ['userAvatar']});
    expect(mockQueryClient.invalidateQueries).not.toHaveBeenCalledWith({ queryKey: ['user']});
  });
});