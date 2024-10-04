import { deleteFile, fetchFilesByIds, uploadFile } from '@/lib/api/fetchFiles';
import { updateProduct } from '@/lib/api/fetchProducts';
import mapProduct from '@/mappers/productMappers';
import { ApiPutProduct } from '@/types/api/apiTypes';
import { Product } from '@/types/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type ProductUpdatingProps = {
  productProps: ApiPutProduct;
  files: File[];
  imagesToDelete?: number[];
};

export const useEditProductMutation = (id: number, token: string) => {
  const queryClient = useQueryClient();

  const { mutate: deleteImage } = useMutation({
    mutationFn: (id: number) => deleteFile(id, token),
  });

  const { mutate: editProduct, error: errorEditingProduct } = useMutation({
    mutationFn: ({ productProps }: ProductUpdatingProps) =>
      updateProduct(productProps, id, token),
    onSuccess: async (res, { imagesToDelete }) => {
      const product = await mapProduct(res);
      if (imagesToDelete) {
        const images: { id: number; related?: { id: number } }[] =
          await fetchFilesByIds(imagesToDelete);
        images.forEach((image) => image.related ?? deleteImage(image.id));
      }

      queryClient.setQueryData(['myProducts'], (old: Product[]) =>
        old.with(
          old.findIndex((oldProduct) => oldProduct.id === id),
          product
        )
      );
    },
  });

  const { mutate: uploadImagesThenEditProduct, error: errorUploading } =
    useMutation({
      mutationFn: ({ files }: ProductUpdatingProps) => {
        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));
        return uploadFile(formData);
      },
      onSuccess: (res, productUpdatingProps) => {
        productUpdatingProps.productProps.images = [
          ...productUpdatingProps.productProps.images!,
          ...res.map(({ id }: { id: number }) => id),
        ];
        editProduct(productUpdatingProps);
      },
    });

  return {
    editProduct,
    uploadImagesThenEditProduct,
    errorUploading,
    errorEditingProduct,
  };
};