import { renderHook, act } from '@testing-library/react';
import { useDeleteProductMutation } from './useDeleteProductMutation';
import { deleteFile } from '@/lib/api/fetchFiles';
import { deleteProductReturnImages } from '@/lib/api/fetchProducts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the external API functions
jest.mock('../lib/api/fetchFiles', () => ({
  deleteFile: jest.fn(),
}));
jest.mock('../lib/api/fetchProducts', () => ({
  deleteProductReturnImages: jest.fn(),
}));

// Create a mock for the QueryClient
const mockInvalidateQueries = jest.fn();

const mockQueryClient = {
  invalidateQueries: mockInvalidateQueries,
  setQueryData: jest.fn(),
};

// Initialize a QueryClient
const queryClient = new QueryClient();

describe('useDeleteProductMutation', () => {
  const token = 'test-token';
  const onSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(QueryClient.prototype, 'invalidateQueries')
      .mockImplementation(mockInvalidateQueries);
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  test('successfully deletes a product and its images', async () => {
    const mockProductId = 1;
    const mockResponse = {
      data: {
        attributes: {
          images: {
            data: [
              { id: 101, attributes: { related: [] } },
              { id: 102, attributes: { related: [{ id: mockProductId }] } },
            ],
          },
        },
      },
    };

    (deleteProductReturnImages as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(
      () => useDeleteProductMutation(mockProductId, token, onSuccess),
      { wrapper }
    );

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(deleteProductReturnImages).toHaveBeenCalledWith(
      mockProductId,
      token
    );
    expect(deleteFile).toHaveBeenCalledWith(101, token);
    expect(deleteFile).toHaveBeenCalledWith(102, token);
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['myProducts'],
    });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['product', mockProductId],
    });
    expect(onSuccess).toHaveBeenCalled();
  });

  test('does not delete images that are not related to the product', async () => {
    const mockProductId = 2;
    const mockResponse = {
      data: {
        attributes: {
          images: {
            data: [
              { id: 201, attributes: { related: [] } }, // Should be deleted
              { id: 202, attributes: { related: [{ id: 3 }] } }, // Should NOT be deleted
              { id: 203, attributes: { related: [{ id: mockProductId }] } }, // Should be deleted
            ],
          },
        },
      },
    };

    (deleteProductReturnImages as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(
      () => useDeleteProductMutation(mockProductId, token, onSuccess),
      { wrapper }
    );

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(deleteFile).toHaveBeenCalledWith(201, token);
    expect(deleteFile).toHaveBeenCalledWith(203, token);
    expect(deleteFile).not.toHaveBeenCalledWith(202, token); // Check that 202 was not deleted
  });
});
