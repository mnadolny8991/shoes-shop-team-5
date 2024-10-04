import ProductForm from '@/components/forms/ProductForm';
import { useAddProductMutation } from '@/hooks/useAddProductMutation';
import { ApiPostProduct, ApiPutProduct } from '@/types/api/apiTypes';
import { Product } from '@/types/product';
import {
  Alert,
  Backdrop,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import ServerErrorBox from '@/components/containers/ServerErrorBox';

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
    addProduct,
    uploadImagesThenAddProduct,
    isPending,
    isPendingProduct,
    isSuccess,
    error,
  } = useAddProductMutation(session?.accessToken!);

  const submitForm = (product: {
    productProps: ApiPutProduct;
    files: File[];
  }) => {
    product.productProps.teamName = 'team-5';
    setProductName(product.productProps.name || '');
    product.productProps.userID = session?.id;
    product.files.length
      ? uploadImagesThenAddProduct(product)
      : addProduct(product.productProps as ApiPostProduct);
  };
  return (
    <>
      <ServerErrorBox
        message={error?.message || ''}
        submessages={[]}
        sx={{ width: 'fit-content', my: '1rem' }}
      />
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
