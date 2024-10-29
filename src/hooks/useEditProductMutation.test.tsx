import { useEditProductMutation } from "@/hooks/useEditProductMutation";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { updateProduct } from "@/lib/api/fetchProducts";
import { fetchFilesByIds, deleteFile, uploadFile } from "@/lib/api/fetchFiles";

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
jest.mock('../lib/api/fetchProducts', () => ({
  updateProduct: jest.fn(),
}));
jest.mock('../lib/api/fetchFiles', () => ({
  fetchFilesByIds: jest.fn(),
  deleteFile: jest.fn(),
  uploadFile: jest.fn(),
}));

describe('edit product mutation hook', () => {
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

  test('edit product successfull', async () => {
    (updateProduct as jest.Mock).mockResolvedValue('success');
    (fetchFilesByIds as jest.Mock)
      .mockImplementation((imagesToDelete: number[]) => 
        imagesToDelete.map((id) => ({ id }))
    );
    (deleteFile as jest.Mock).mockResolvedValue('ok');

    const mockProductProps = {
      name: "Nike Kyrie 998"
    };

    const { result } = renderHook(() => useEditProductMutation(1, 'token'), { wrapper });
    result.current.editProduct({
      productProps: mockProductProps,
      files: [new File(['1'], '1'), new File(['2'], '2')],   
      imagesToDelete: [1, 2, 3],                
    });

    await waitFor(() => 
      expect(updateProduct).toHaveBeenCalledWith(mockProductProps, 1, 'token')
    );
    expect(fetchFilesByIds).toHaveBeenCalled();
    expect(deleteFile).toHaveBeenCalledTimes(3);
    expect(result.current.errorEditingProduct).toBeFalsy();

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['myProducts'] });
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['product', 1] });
  });

  test('error while editing a product', () => {
    (updateProduct as jest.Mock).mockRejectedValue(new Error('message'));
    const { result } = renderHook(() => useEditProductMutation(1, 'token'), { wrapper });
    waitFor(
      () => expect(result.current.errorEditingProduct?.message).toBe('message')
    );
    expect(mockQueryClient.invalidateQueries).not.toHaveBeenCalledWith({ queryKey: ['myProducts'] });
    expect(mockQueryClient.invalidateQueries).not.toHaveBeenCalledWith({ queryKey: ['product', 1] });
  });

  test('upload images and then edit product successfull', async () => {
    (updateProduct as jest.Mock).mockResolvedValue('success');
    (fetchFilesByIds as jest.Mock)
      .mockImplementation((imagesToDelete: number[]) => 
        imagesToDelete.map((id) => ({ id }))
    );
    (deleteFile as jest.Mock).mockResolvedValue('ok');
    (uploadFile as jest.Mock).mockResolvedValue([{ id: 3 }, { id: 4 }]);

    const updateData = {
      name: "Nike Kyrie 998",
      images: [1, 2],
    };

    const mockProductProps = {
      productProps: updateData,
      files: [new File(['1'], '1'), new File(['2'], '2')],   
      imagesToDelete: [5, 6, 7],                
    }

    const { result } = renderHook(() => useEditProductMutation(1, 'token'), { wrapper });
    result.current.uploadImagesThenEditProduct(mockProductProps);
    await waitFor(() => 
      expect(uploadFile).toHaveBeenCalled()
    );
    expect(updateProduct).toHaveBeenCalledWith({ name: 'Nike Kyrie 998', images: [ 1, 2, 3, 4 ] }, 1, 'token');
    expect(result.current.errorEditingProduct).toBeFalsy();
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['myProducts'] });
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['product', 1] });
  });

  test('error while upload images and then edit product', () => {
    (updateProduct as jest.Mock).mockRejectedValue(new Error('message'));
    const updateData = {
      name: "Nike Kyrie 998",
      images: [1, 2],
    };

    const mockProductProps = {
      productProps: updateData,
      files: [new File(['1'], '1'), new File(['2'], '2')],   
      imagesToDelete: [5, 6, 7],                
    }

    const { result } = renderHook(() => useEditProductMutation(1, 'token'), { wrapper });
    result.current.uploadImagesThenEditProduct(mockProductProps);
    waitFor(
      () => expect(result.current.errorEditingProduct?.message).toBe('message')
    );
  });
});