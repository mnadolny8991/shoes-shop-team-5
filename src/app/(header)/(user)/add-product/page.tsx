'use client';
import ProductForm from '@/components/forms/ProductForm';
import apiUrl from '@/data/apiUrl';
import token from '@/data/token';
import { ApiPostProduct, ApiPutProduct } from '@/types/api/apiTypes';
import {
  Alert,
  Backdrop,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddProduct() {
  const [prooductName, setProductName] = useState('');

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
          Authorization: `Bearer ${token}`,
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
        (productProps.images = data.map(({ id }) => id)),
          addProduct(productProps as ApiPostProduct);
      }),
    onError: (error) => console.error(error),
  });

  const router = useRouter();

  const submitForm = (product: {
    productProps: ApiPutProduct;
    files: File[];
  }) => {
    product.productProps.teamName = 'team-5';
    setProductName(product.productProps.name || '');
    // product.productProps.userID = ;
    uploadImagesThenAddProduct(product);
  };
  return (
    <>
      <ProductForm
        title="Add a product"
        description="Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:"
        onSubmit={submitForm}
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
          <Alert severity="success" onClose={() => router.push('/my-products')}>
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
