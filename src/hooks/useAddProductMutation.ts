import { uploadFile } from '@/lib/api/fetchFiles';
import { saveProduct } from '@/lib/api/fetchProducts';
import { ApiPostProduct, ApiPutProduct } from '@/types/api/apiTypes';
import { useMutation } from '@tanstack/react-query';

export const useAddProductMutation = (token: string) => {
  const {
    mutate: addProduct,
    isPending: isPendingProduct,
    isSuccess,
  } = useMutation({
    mutationFn: (productProps: ApiPostProduct) =>
      saveProduct(productProps, token),
  });

  const {
    mutate: uploadImagesThenAddProduct,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ files }: { productProps: ApiPutProduct; files: File[] }) => {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      return uploadFile(formData);
    },
    onSuccess: (data, { productProps }) => {
      productProps.images = data.map(({ id }: { id: number }) => id);
      addProduct(productProps as ApiPostProduct);
    },
  });

  return {
    uploadImagesThenAddProduct,
    isPending,
    isPendingProduct,
    isSuccess,
    error,
  };
};
