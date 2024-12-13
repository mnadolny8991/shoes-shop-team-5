'use client';
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CartProduct from '@/components/cart/CartProduct';
import CartSummary from '@/components/cart/CartSummary';
import { useCartContext } from '@/context/CartContext';
import CartEmpty from '@/components/cart/CartEmpty';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import useCartProducts from '@/hooks/useCartProducts';
import CustomButton from '@/components/buttons/CustomButton';
import shippingCost from '@/data/shippingCost';

type CartProps = {};

const Cart: React.FC<CartProps> = () => {
  const theme = useTheme();
  const totalDown = useMediaQuery(theme.breakpoints.down(1750));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isMounted, setIsMounted] = useState(false);
  const { amount, onDelete } = useCartContext();
  const { products, isLoading } = useCartProducts();
  const empty = isLoading ? true : products.length <= 0;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLoading) {
    return (
      <CircularProgress
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }

  return (
    <Stack
      direction={totalDown ? 'column' : 'row'}
      sx={{
        width: { xs: '320px', md: '80%' },
        maxWidth: '1800px',
        margin: 'auto',
        justifyContent: 'space-between',
        my: { xs: '30px', md: '80px' },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: empty ? 'none' : '963px',
        }}
      >
        <Typography variant="h1" component="h2">
          Cart
        </Typography>
        {empty && isMounted && createPortal(<CartEmpty />, document.body)}
        {isMobile && <Divider sx={{ mt: '12px' }} />}
        <Stack
          sx={{
            width: '100%',
            gap: { md: '60px', xs: '30px' },
            mt: { md: '57px', xs: '32px' },
          }}
          divider={!isMobile && <Divider />}
        >
          {amount.map((productCartEntry) => {
            const product = products.find(
              (p) => p.id === productCartEntry.productId
            )!;
            return (
              <CartProduct
                key={productCartEntry.id}
                id={productCartEntry.id}
                name={product.name}
                price={product.price}
                gender={product.gender.name}
                url={product.images[0].url}
                inStock={true}
                onDelete={() => onDelete(productCartEntry.id)}
              />
            );
          })}
        </Stack>
      </Box>
      {!empty && (
        <Box width={{ xs: 320, md: 400 }}>
          <CartSummary
            subtotal={amount.reduce(
              (acc, cartEntry) =>
                products.find((p) => p.id === cartEntry.productId)!.price *
                  cartEntry.amount +
                acc,
              0
            )}
            shipping={shippingCost}
            tax={0}
            sx={{ mt: totalDown ? '80px' : 0 }}
          />
          <CustomButton
            href="/checkout"
            size="m"
            variant="contained"
            sx={{
              mt: {
                md: '113px',
                xs: '84px',
              },
            }}
          >
            Checkout
          </CustomButton>
        </Box>
      )}
    </Stack>
  );
};

export default Cart;
