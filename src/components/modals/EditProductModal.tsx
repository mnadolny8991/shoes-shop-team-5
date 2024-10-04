'use client';
import { Dialog } from '@mui/material';
import ProductForm from '@/components/forms/ProductForm';
import { Product } from '@/types/product';
import { ApiPutProduct } from '@/types/api/apiTypes';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onSave: ({
    productProps,
    files,
  }: {
    productProps: ApiPutProduct;
    files: File[];
  }) => void;
};

export default function EditProductModal({
  isOpen,
  onClose,
  product,
  onSave,
}: Props) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          mx: { xs: 1, md: 4, lg: 10 },
          px: { md: 4, lg: 10 },
          pt: { md: '53px' },
          width: 1,
          maxWidth: 1,
        },
      }}
    >
      <ProductForm
        title="Edit product"
        description=""
        onSubmit={onSave}
        product={product}
        submitDirty
      />
    </Dialog>
  );
}
