'use client';
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { Product } from '@/types/product';
import { MoreHoriz } from '@mui/icons-material';
import { useState } from 'react';
import DeleteModal from '@/components/modals/DeleteModal';
import EditProductModal from '@/components/modals/EditProductModal';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ProductForm from '@/components/forms/ProductForm';
import {
  ProductUpdatingProps,
  useEditProductMutation,
} from '@/hooks/useEditProductMutation';
import ServerErrorBox from '@/components/containers/ServerErrorBox';
import { useDeleteProductMutation } from '@/hooks/useDeleteProductMutation';
import AddProduct from '@/components/products/AddProduct';
import { useQueryClient } from '@tanstack/react-query';

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
}

export default function ProductCard({
  product,
  isAdmin = true,
}: ProductCardProps) {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { id, name, price, images, gender } = product;

  const { deleteProduct } = useDeleteProductMutation(id, session?.accessToken!);
  const {
    editProduct,
    uploadImagesThenEditProduct,
    errorUploading,
    errorEditingProduct,
  } = useEditProductMutation(id, session?.accessToken!);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };
  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDuplicateClick = () => {
    setIsDuplicateModalOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteClose = () => {
    setIsDeleteModalOpen(false);
  };
  const handleEditClose = () => {
    setIsEditModalOpen(false);
  };
  const handleDuplicateClose = () => {
    setIsDuplicateModalOpen(false);
  };

  const saveEdited = (productUpdatingProps: ProductUpdatingProps) => {
    if (productUpdatingProps.productProps.images)
      productUpdatingProps.imagesToDelete = images
        .map(({ id }) => id)
        .filter(
          (id) => !productUpdatingProps.productProps.images?.includes(id)
        );
    else if (productUpdatingProps.files.length)
      productUpdatingProps.productProps.images = images.map(({ id }) => id);

    productUpdatingProps.files.length
      ? uploadImagesThenEditProduct(productUpdatingProps)
      : editProduct(productUpdatingProps);
    handleEditClose();
    handleMenuClose();
  };

  const onAddDuplicated = () => {
    queryClient.invalidateQueries({ queryKey: ['myProducts'] });
    handleDuplicateClose();
    handleMenuClose();
  };

  const handleCardClick = () => {
    if (!isAdmin && id) {
      router.push(`/products/${id}`);
    }
  };

  const open = Boolean(anchorEl);
  const PopoverId = open ? 'simple-popover' : undefined;

  const CardName = styled(Typography)(({ theme }) => ({
    fontSize: 10,
    fontWeight: 500,
    lineHeight: '11.7px',
    [theme.breakpoints.up('md')]: {
      fontSize: 16,
      lineHeight: '18px',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 22,
      lineHeight: '25.81px',
    },
  }));

  return (
    <Card
      square
      elevation={0}
      sx={{ position: 'relative', cursor: !isAdmin ? 'pointer' : 'default' }}
      onClick={handleCardClick}
    >
      {isAdmin && (
        <>
          <IconButton
            sx={{ position: 'absolute', right: 0 }}
            aria-describedby={PopoverId}
            onClick={handleClick}
          >
            <MoreHoriz />
          </IconButton>
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ opacity: 0.85 }}
            MenuListProps={{
              sx: {
                p: 1,
                width: 112,
                '& .MuiMenuItem-root': {
                  height: 22,
                  minHeight: 22,
                  '&:not(:last-child)': { mb: 1 },
                },
              },
            }}
          >
            <MenuItem
              component="a"
              href={`./products/${id}`}
              divider
              disableGutters
            >
              <Typography variant="subtitle2">View</Typography>
            </MenuItem>
            <MenuItem onClick={handleEditClick} divider disableGutters>
              <Typography variant="subtitle2">Edit</Typography>
            </MenuItem>
            <MenuItem onClick={handleDuplicateClick} divider disableGutters>
              <Typography variant="subtitle2">Duplicate</Typography>
            </MenuItem>
            <MenuItem onClick={handleDeleteClick} disableGutters>
              <Typography variant="subtitle2">Delete</Typography>
            </MenuItem>
          </Menu>
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={handleDeleteClose}
            onDelete={deleteProduct}
            title="Are you sure to delete selected product?"
            bodyText={`${name}  $${price}`}
          />
          <EditProductModal isOpen={isEditModalOpen} onClose={handleEditClose}>
            <ServerErrorBox
              message={errorUploading?.message || ''}
              submessages={[]}
              sx={{ width: 'fit-content', my: '1rem' }}
            />
            <ServerErrorBox
              message={errorEditingProduct?.message || ''}
              submessages={[]}
              sx={{ width: 'fit-content', my: '1rem' }}
            />
            <ProductForm
              title="Edit product"
              description=""
              onSubmit={saveEdited}
              product={product}
              submitDirty
            />
          </EditProductModal>
          <EditProductModal
            isOpen={isDuplicateModalOpen}
            onClose={handleDuplicateClose}
          >
            <AddProduct
              title="Duplicate product"
              description=""
              initialProduct={product}
              onSuccessClose={onAddDuplicated}
            />
          </EditProductModal>
        </>
      )}
      <CardMedia
        title={images[0].name}
        image={images[0].url}
        sx={{ height: { xs: '170px', md: '275px', xl: '380px' } }}
      />
      <CardContent sx={{ px: 0 }}>
        <Stack direction="row" justifyContent="space-between" mb="2px">
          <CardName>{name}</CardName>
          <CardName>${price}</CardName>
        </Stack>
        <Typography variant="subtitle2">{gender.name}&apos;s Shoes</Typography>
      </CardContent>
    </Card>
  );
}
