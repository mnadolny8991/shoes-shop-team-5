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

export default function ProductCard({ product }: { product: Product }) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { id, name, price, images, gender } = product;

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

  const saveEdited = (product: Partial<Product>) => {
    console.log(product);
    handleEditClose();
    handleMenuClose();
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
    <Card square sx={{ position: 'relative' }}>
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
        onDelete={() => null}
        title="Are you sure to delete selected product?"
        bodyText={`${name}  $${price}`}
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={handleEditClose}
        product={product}
        onSave={saveEdited}
      />
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
        <Typography variant="subtitle2">{`${gender.name}’s Shoes`}</Typography>
      </CardContent>
    </Card>
  );
}
