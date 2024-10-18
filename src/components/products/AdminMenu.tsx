import { MoreHoriz } from '@mui/icons-material';
import { Alert, IconButton, Menu, MenuItem, Snackbar, Typography } from '@mui/material';
import ProductForm from '@/components/forms/ProductForm';
import DeleteModal from '@/components/modals/DeleteModal';
import EditProductModal from '@/components/modals/EditProductModal';
import AddProduct from '@/components/products/AddProduct';
import { Product } from '@/types/product';
import { useDeleteProductMutation } from '@/hooks/useDeleteProductMutation';
import {
  useEditProductMutation,
  ProductUpdatingProps,
} from '@/hooks/useEditProductMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function AdminMenu({ product }: { product: Product }) {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [editPromptStatus, setEditPromptStatus] = useState('');

  const { id, name, price, images } = product;

  const handleDeleteSuccess = () => {
    handleEditClose();
    handleMenuClose();
  }

  const { mutate: deleteProduct, status: deletingStatus, error: deletingError } 
    = useDeleteProductMutation(id, session?.accessToken!, handleDeleteSuccess);
  const {
    editProduct,
    uploadImagesThenEditProduct,
    errorUploading,
    errorEditingProduct,
    editingStatus,
    uploadingStatus,
  } = useEditProductMutation(id, session?.accessToken!);

  useEffect(() => {
    setEditPromptStatus(editingStatus);
  }, [editingStatus]);

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

  const open = Boolean(anchorEl);
  const PopoverId = open ? 'simple-popover' : undefined;

  return (
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={deletingStatus === 'success'}
        autoHideDuration={2000}
        onClose={() => setEditPromptStatus('')}
      >
        <Alert severity="success">Product deleted</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={editPromptStatus === 'success'}
        autoHideDuration={2000}
        onClose={() => setEditPromptStatus('')}
      >
        <Alert severity="success">Product saved</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={editPromptStatus === 'error'}
        autoHideDuration={2000}
        onClose={() => setEditPromptStatus('')}
      >
        <Alert severity="error">{JSON.stringify(errorEditingProduct?.message) || 'Server error'}</Alert>
      </Snackbar>
      <EditProductModal isOpen={isEditModalOpen} onClose={handleEditClose}>
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
  );
}
