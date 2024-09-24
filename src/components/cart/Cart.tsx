'use client';
import {
  Box,
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
import { fetchProductById } from '@/lib/fetchProducts';
import { useQueries } from '@tanstack/react-query';
import { Product } from '@/types/product';

type CartProps = {};

const Cart: React.FC<CartProps> = () => {
  const theme = useTheme();
  const totalDown = useMediaQuery(theme.breakpoints.down(1750));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { amount, onDelete } = useCartContext();

  const queries = amount.map((product) => {
    return {
      queryKey: ['product', product.id],
      queryFn: () => fetchProductById(product.id),
      retry: false,
    };
  });
  const productsData = useQueries({ queries });

  const products = productsData
    .filter((result, index) => {
      if (result.isSuccess) {
        return true;
      } else if (result.isError) {
        const idToRemove = queries[index].queryKey[1] as number;
        console.log(idToRemove);
        onDelete(idToRemove);
        return false;
      }
      return true;
    })
    .map((result) => result.data)
    .filter((product) => product) as Product[];

  // const productsData = useQueries({
  //   queries: amount.map((p) => {
  //     return {
  //       queryKey: ['product', p.id],
  //       queryFn: () => fetchProductById(p.id),
  //     };
  //   }),
  // });
  // const products = productsData
  //   .map((response) => response.data)
  //   .filter((product) => product ? true : false) as Product[];

  const empty = products.length <= 0;

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
          {products.map((product) => (
            <CartProduct
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              gender={product.gender.name}
              url={product.images[0].url}
              inStock={true}
              onDelete={() => onDelete(product.id)}
            />
          ))}
        </Stack>
      </Box>
      {!empty && (
        <CartSummary
          subtotal={products.reduce(
            (acc, val) =>
              val.price * amount.find((a) => a.id === val.id)?.amount! + acc,
            0
          )}
          shipping={20}
          tax={0}
          sx={{ mt: totalDown ? '80px' : 0 }}
        />
      )}
    </Stack>
  );
};

export default Cart;
