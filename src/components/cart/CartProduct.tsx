'use client';

import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import ImageContainer from '@/components/containers/ImageContainer';
import CartProductBar from '@/components/cart/CartProductBar';
import { useCartContext } from '@/context/CartContext';
import DeleteModal from '../modals/DeleteModal';
import { useState } from 'react';

type CartProductProps = {
  id: string;
  name: string;
  price: number;
  gender: string;
  inStock: boolean;
  url: string;
  onDelete: () => void;
};

const CartProduct: React.FC<CartProductProps> = ({
  id,
  name,
  price,
  gender,
  url,
  inStock,
  onDelete,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { amount, onAmountIncrement, onAmountChange } = useCartContext();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const prodAmount = amount.find((p) => p.id === id)?.amount!;
  const prodSize = amount.find((entry) => entry.id === id)?.size ?? 'N/A';

  return (
    <Stack
      direction="row"
      sx={{
        width: {
          xs: '320px',
          md: '100%',
        },
        height: {
          xs: '100px',
          md: '214px',
        },
        gap: {
          xs: '15px',
          md: '46px',
        },
      }}
    >
      <DeleteModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={() => onDelete()}
        title="Delete Product"
        bodyText="Are you sure?"
      />
      <ImageContainer
        src={url}
        alt="product image"
        width={isMobile ? '104px' : '223px'}
        height={isMobile ? '100px' : '214px'}
      />
      <Stack justifyContent="space-between" flexGrow="1" height="100%">
        <Box sx={{ height: 'fit-content' }}>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Typography
              component="h3"
              sx={{
                fontSize: { md: '30px', xs: '12px' },
                fontWeight: '500',
                lineHeight: { md: '35.19px', xs: '14.8px' },
              }}
            >
              {name}
            </Typography>
            <Typography
              component="h3"
              sx={{
                fontSize: { md: '30px', xs: '12px' },
                fontWeight: '500',
                lineHeight: { md: '35.19px', xs: '14.8px' },
              }}
            >
              ${price}
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: { md: '20px', xs: '8px' },
              fontWeight: '500',
              lineHeight: { md: '23.46px', xs: '9.38px' },
              color: '#5C5C5C',
            }}
          >
            {gender}&apos;s shoes: EU-{prodSize}
          </Typography>
          {!isMobile && inStock && (
            <Typography
              color="primary.main"
              sx={{
                fontSize: '25px',
                fontWeight: '600',
                lineHeight: '29.33px',
                mt: '12px',
              }}
            >
              In Stock
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: { md: 'fit-content', xs: '100%' },
            marginLeft: 'auto',
          }}
        >
          <CartProductBar
            amount={prodAmount}
            onAddClick={() => {
              if (prodAmount >= 0) onAmountIncrement(id, '+');
            }}
            onSubtractClick={() => {
              if (prodAmount > 0) onAmountIncrement(id, '-');
            }}
            onDeleteClick={() => setOpenDeleteModal(true)}
            onAmountChange={(newValue: number) => onAmountChange(id, newValue)}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default CartProduct;
