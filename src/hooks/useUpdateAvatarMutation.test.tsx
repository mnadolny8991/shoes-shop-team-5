import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import useUpdateAvatarMutation from '@/hooks/useUpdateAvatarMutation';
import { updateUserData } from '@/lib/api/fetchUserData';
import { uploadFile } from '@/lib/api/fetchFiles';

const mockInvalidateQueries = jest.fn();
const mockQueryClient = {
  invalidateQueries: mockInvalidateQueries,
  setQueryData: jest.fn(),
};
const queryClient = new QueryClient();
jest.mock('../lib/api/fetchUserData', () => ({
  updateUserData: jest.fn(),
}));
jest.mock('../lib/api/fetchFiles', () => ({
  uploadFile: jest.fn(),
}));
const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('update avatar mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(QueryClient.prototype, 'invalidateQueries')
      .mockImplementation(mockInvalidateQueries);
    jest
      .spyOn(QueryClient.prototype, 'setQueryData')
      .mockImplementation(mockQueryClient.setQueryData);
    queryClient.clear();
  });

  test('update mutation', async () => {
    const mockImageData = {
      id: 123,
      url: 'example url',
    };
    (uploadFile as jest.Mock).mockResolvedValue([mockImageData]);

    const { result } = renderHook(() => useUpdateAvatarMutation(1, 'token'), {
      wrapper,
    });

    const formData = new FormData();
    formData.append('files', 'mock image file');

    expect(result.current.updateAvatarMutation.isIdle).toBe(true);
    result.current.updateAvatarMutation.mutate(formData);
    await waitFor(() => expect(uploadFile).toHaveBeenCalled());
    expect(updateUserData).toHaveBeenCalledWith(1, 'token', {
      avatar: mockImageData.id,
    });
    expect(mockQueryClient.setQueryData).toHaveBeenCalled();
  });

  test('update mutation error', () => {
    (uploadFile as jest.Mock).mockRejectedValue(new Error('message'));

    const { result } = renderHook(() => useUpdateAvatarMutation(1, 'token'), {
      wrapper,
    });
    result.current.updateAvatarMutation.mutate(new FormData());
    expect(result.current.updateAvatarMutation.status === 'error');
    expect(result.current.updateAvatarMutation.error?.message === 'message');
    expect(mockQueryClient.setQueryData).not.toHaveBeenCalled();
  });

  test('delete mutation', async () => {
    (updateUserData as jest.Mock).mockResolvedValue('');
    const { result } = renderHook(() => useUpdateAvatarMutation(1, 'token'), {
      wrapper,
    });

    expect(result.current.deleteAvatarMutation.isIdle).toBe(true);
    result.current.deleteAvatarMutation.mutate();
    await waitFor(() =>
      expect(updateUserData).toHaveBeenCalledWith(1, 'token', { avatar: null })
    );
    expect(mockQueryClient.setQueryData).toHaveBeenCalled();
  });

  test('delete mutation error', async () => {
    (updateUserData as jest.Mock).mockRejectedValue(new Error('message'));
    const { result } = renderHook(() => useUpdateAvatarMutation(1, 'token'), {
      wrapper,
    });

    expect(result.current.deleteAvatarMutation.isIdle).toBe(true);
    result.current.deleteAvatarMutation.mutate();
    await waitFor(() =>
      expect(updateUserData).toHaveBeenCalledWith(1, 'token', { avatar: null })
    );
    expect(result.current.updateAvatarMutation.status === 'error');
    expect(result.current.updateAvatarMutation.error?.message === 'message');
    expect(mockQueryClient.setQueryData).not.toHaveBeenCalled();
  });
});
