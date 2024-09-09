import { Box, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import CartProduct from "@/components/cart/CartProduct";
import CartSummary from "@/components/cart/CartSummary";
import cartProducts from '@/mock/cartProducts';

type CartProps = {

}

const Cart: React.FC<CartProps> = () => {
  const theme = useTheme();
  const totalDown = useMediaQuery(theme.breakpoints.down(1750));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      direction={totalDown ? 'column' : 'row'}
      sx={{
        width: isMobile ? '320px' : '80%',
        maxWidth: '1800px',
        margin: 'auto',
        justifyContent: 'space-between',
        my: { xs: '30px', md: '80px' },
      }}
    >
      <Box 
        sx={{
          width: '100%',
          maxWidth: '963px'
        }}
      >
        <Typography variant="h1" component="h2">
          Cart
        </Typography>
        {isMobile && <Divider sx={{ mt: '12px' }} />}
        <Stack
          sx={{
            width: '100%',
            gap: { md: '60px', xs: '30px' },
            mt: { md: '57px', xs: '32px' },
          }}
          divider={!isMobile && <Divider />}
        >
          {cartProducts.map(product => 
            <CartProduct
              key={product.id}
              name={product.name}
              price={product.price}
              gender={product.gender}
              inStock={true}
            />
          )}
        </Stack>
      </Box>
      <CartSummary
        subtotal={cartProducts.reduce((val, acc) => acc.price + val, 0)}
        shipping={20}
        tax={0}
        sx={{ mt: totalDown ? '80px' : 0 }}
      />
    </Stack>
  );
}

export default Cart;