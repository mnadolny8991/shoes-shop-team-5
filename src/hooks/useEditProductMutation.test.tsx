import { useEditProductMutation } from "@/hooks/useEditProductMutation";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { updateProduct } from "@/lib/api/fetchProducts";
import { fetchFilesByIds, deleteFile } from "@/lib/api/fetchFiles";

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

  test('');
});