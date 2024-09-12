import { Dialog } from '@mui/material';
import ProductForm from '@/components/forms/ProductForm';
import { Product } from '@/mock/products';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onSave: (product: Partial<Product>) => void;
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
        description="Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with"
        onSubmit={onSave}
        product={product}
      />
    </Dialog>
  );
}
