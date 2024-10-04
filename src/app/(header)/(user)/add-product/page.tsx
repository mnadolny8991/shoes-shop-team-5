'use client';
import ProductForm from '@/components/forms/ProductForm';
import { ApiPutProduct } from '@/types/api/apiTypes';
import {
  Alert,
  Backdrop,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ServerErrorBox from '@/components/containers/ServerErrorBox';
import { useAddProductMutation } from '@/hooks/useAddProductMutation';

export default function AddProduct() {
  const [prooductName, setProductName] = useState('');
  const { data: session } = useSession();
  const {
    uploadImagesThenAddProduct,
    isPending,
    isPendingProduct,
    isSuccess,
    error,
  } = useAddProductMutation(session?.accessToken!);
  const router = useRouter();

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
      <ServerErrorBox 
        message={error?.message || ''} 
        submessages={[]} 
        sx={{ width: 'fit-content', my: '1rem' }}
      />
      <ProductForm
        title="Add a product"
        description="Provide detailed information about your product, including name, price, color, gender, brand, description, sizes and images, to ensure a seamless experience for customers. Make sure all details are accurate and up-to-date."
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
