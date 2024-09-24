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
import { ApiPutProduct } from '@/types/api/apiTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiUrl from '@/data/apiUrl';
import mapProduct from '@/mappers/productMappers';
import token from '@/data/token';
import { useRouter } from 'next/navigation';
import { useLastViewed } from '@/context/LastViewedContext';
import { on } from 'stream';
import { useSession } from 'next-auth/react';

type ProductUpdatingProps = {
  productProps: ApiPutProduct;
  files: File[];
  imagesToDelete?: number[];
};

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
}

export default function ProductCard({
  product,
  isAdmin = true,
}: ProductCardProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();
  const { onLastViewedRemove } = useLastViewed();

  const { id, name, price, images, gender } = product;

  const { mutate: editProduct } = useMutation({
    mutationFn: ({ productProps }: ProductUpdatingProps) =>
      fetch(`${apiUrl}/products/${id}?populate=*`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ data: productProps }),
      }),
    onSuccess: (res, { imagesToDelete }) =>
      res
        .json()
        .then((data) => mapProduct(data))
        .then((product) => {
          imagesToDelete?.forEach((id) => deleteImage(id));
          queryClient.setQueryData(['myProducts'], (old: Product[]) =>
            old.with(
              old.findIndex((oldProduct) => oldProduct.id === id),
              product
            )
          );
        }),
    onError: (error) => console.error(error),
  });

  const { mutate: uploadImages } = useMutation({
    mutationFn: ({ files }: ProductUpdatingProps) => {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      return fetch(`${apiUrl}/upload`, { method: 'POST', body: formData });
    },
    onSuccess: (res, productUpdatingProps) =>
      res.json().then((data: { id: number }[]) => {
        productUpdatingProps.productProps.images = [
          ...(productUpdatingProps.productProps.images ||
            images.map(({ id }) => id)),
          ...data.map(({ id }) => id),
        ];
        editProduct(productUpdatingProps);
      }),
    onError: (error) => console.error(error),
  });

  const { mutate: deleteImage } = useMutation({
    mutationFn: (id: number) =>
      fetch(`${apiUrl}/upload/files/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    onError: (error) => console.error(error),
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: () =>
      fetch(`${apiUrl}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.setQueryData(['myProducts'], (old: Product[]) =>
        old.filter((oldProduct) => oldProduct.id !== id)
      );
      // onLastViewedRemove(id);
      images.map(({ id }) => id).forEach((imageId) => deleteImage(imageId));
    },
    onError: (error) => console.error(error),
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };
  const handleEditClick = () => {
    setIsEditModalOpen(true);
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

  const saveEdited = (productUpdatingProps: ProductUpdatingProps) => {
    if (productUpdatingProps.productProps.images)
      productUpdatingProps.imagesToDelete = images
        .map(({ id }) => id)
        .filter(
          (id) => !productUpdatingProps.productProps.images?.includes(id)
        );

    productUpdatingProps.files.length
      ? uploadImages(productUpdatingProps)
      : editProduct(productUpdatingProps);
    handleEditClose();
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
          <EditProductModal
            isOpen={isEditModalOpen}
            onClose={handleEditClose}
            product={product}
            onSave={saveEdited}
          />
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
