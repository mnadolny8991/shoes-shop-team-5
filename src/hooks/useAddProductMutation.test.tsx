import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { saveProduct } from '@/lib/api/fetchProducts';
import { uploadFile } from '@/lib/api/fetchFiles';
import { ApiPostProduct, ApiPutProduct } from '@/types/api/apiTypes';
import apiResponse from '@/testing/mocks/mockFileUploadResp';
import { useAddProductMutation } from './useAddProductMutation';
import { renderHook, waitFor } from '@testing-library/react';

jest.mock('../lib/api/fetchFiles', () => ({
  uploadFile: jest.fn(),
}));
jest.mock('../lib/api/fetchProducts', () => ({
  saveProduct: jest.fn(),
}));

describe('add product mutation hook', () => {
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

  test('uploads the product after uploading the images', async () => {
    (uploadFile as jest.Mock).mockImplementation(
      async (_formData: FormData) => []
    );
    (saveProduct as jest.Mock).mockResolvedValue('success');

    const { result } = renderHook(() => useAddProductMutation('token'), {
      wrapper,
    });

    expect(result.current.isPending).toBe(false);

    result.current.uploadImagesThenAddProduct({ productProps: {}, files: [] });

    await waitFor(() => {
      expect(uploadFile).toHaveBeenCalled();
    });
    expect(saveProduct).toHaveBeenCalled();
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.error).toBeFalsy();
  });

  test('sets isError flag after encountering an error', async () => {
    (uploadFile as jest.Mock).mockImplementation(
      async (_formData: FormData) => new Error('error')
    );
    (saveProduct as jest.Mock).mockRejectedValue([]);

    const { result } = renderHook(() => useAddProductMutation('token'), {
      wrapper,
    });

    result.current.uploadImagesThenAddProduct({ productProps: {}, files: [] });

    await waitFor(() => {
      expect(uploadFile).toHaveBeenCalled();
    });
    expect(result.current.error).toBeTruthy();
  });

  test('allows to add a product without uploading images', async () => {
    (saveProduct as jest.Mock).mockResolvedValue('success');

    const { result } = renderHook(() => useAddProductMutation('token'), {
      wrapper,
    });

    result.current.addProduct({
      name: 'shoes example',
      images: [1, 2, 3],
      description: 'shoes',
      teamName: 'team-5',
    } as ApiPostProduct);

    await waitFor(() => {
      expect(saveProduct).toHaveBeenCalled();
    });
    expect(result.current.isSuccess).toBe(true);
  });
});
