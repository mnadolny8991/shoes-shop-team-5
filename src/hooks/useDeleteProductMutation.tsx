import { deleteFile } from '@/lib/api/fetchFiles';
import { deleteProductReturnImages } from '@/lib/api/fetchProducts';
import { Product } from '@/types/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteProductMutation = (
  id: number,
  token: string,
  onSuccess: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProductReturnImages(id, token),
    onSuccess: (data) => {
      // queryClient.setQueryData(['myProducts'], (old: Product[]) =>
      //   old.filter((oldProduct) => oldProduct.id !== id)
      // );
      data.data.attributes.images.data.forEach(
        (image: { id: number; attributes: { related: { id: number }[] } }) =>
          (image.attributes.related.length === 0 ||
            (image.attributes.related.length === 1 &&
              image.attributes.related[0].id === id)) &&
          deleteFile(image.id, token)
      );
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      onSuccess();
    },
  });
};
