import ProductForm from '@/components/forms/ProductForm';
import apiUrl from '@/data/apiUrl';
import { ApiPostProduct, ApiPutProduct } from '@/types/api/apiTypes';
import { Product } from '@/types/product';
import {
  Alert,
  Backdrop,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

type AddProductProps = {
  title: string;
  description: string;
  initialProduct?: Product;
  onSuccessClose: () => void;
};

export default function AddProduct({
  title,
  description,
  initialProduct,
  onSuccessClose,
}: AddProductProps) {
  const [prooductName, setProductName] = useState('');
  const { data: session } = useSession();

  const {
    mutate: addProduct,
    isPending: isPendingProduct,
    isSuccess,
  } = useMutation({
    mutationFn: (productProps: ApiPostProduct) =>
      fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ data: productProps }),
      }),
    onError: (error) => console.error(error),
  });

  const { mutate: uploadImagesThenAddProduct, isPending } = useMutation({
    mutationFn: ({ files }: { productProps: ApiPutProduct; files: File[] }) => {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      return fetch(`${apiUrl}/upload`, { method: 'POST', body: formData });
    },
    onSuccess: (res, { productProps }) =>
      res.json().then((data: { id: number }[]) => {
        productProps.images = productProps.images
          ? productProps.images.concat(data.map(({ id }) => id))
          : data.map(({ id }) => id);
        addProduct(productProps as ApiPostProduct);
      }),
    onError: (error) => console.error(error),
  });

  const submitForm = (product: {
    productProps: ApiPutProduct;
    files: File[];
  }) => {
    product.productProps.teamName = 'team-5';
    setProductName(product.productProps.name || '');
    product.productProps.userID = session?.id;
    uploadImagesThenAddProduct(product);
  };
  return (
    <>
      <ProductForm
        title={title}
        description={description}
        onSubmit={submitForm}
        product={initialProduct}
      />
      <Backdrop open={isPending || isPendingProduct || isSuccess}>
        {(isPending || isPendingProduct) && (
          <Stack spacing={4} alignItems="center">
            <CircularProgress size={200} />
            <Alert severity="info">
              <Typography>
                {isPending ? 'uploading files' : 'adding new Product'}
              </Typography>
            </Alert>
          </Stack>
        )}
        {isSuccess && (
          <Alert severity="success" onClose={onSuccessClose}>
            <Typography>
              {' '}
              The Product{' '}
              <Typography color="primary" component="span">
                {prooductName}
              </Typography>{' '}
              has been successfully added
            </Typography>
          </Alert>
        )}
      </Backdrop>
    </>
  );
}
