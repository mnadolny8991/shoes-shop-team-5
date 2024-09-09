import { Box, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import CartProduct from "@/components/cart/CartProduct";
import CartSummary from "./CartSummary";

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
        my: '80px',
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
        <Stack
          sx={{
            width: '100%',
            gap: { md: '60px', xs: '30px' },
            mt: { md: '57px', xs: '32px' },
          }}
          divider={!isMobile && <Divider />}
        >
          <CartProduct
            name="Nike Air Max Pro"
            price={200}
            gender="male"
            inStock={true}
          />
          <CartProduct
            name="Nike Air Max Pro"
            price={200}
            gender="male"
            inStock={true}
          />
          <CartProduct
            name="Nike Air Max Pro"
            price={200}
            gender="male"
            inStock={true}
          />
        </Stack>
      </Box>
      <CartSummary
        subtotal={800}
        shipping={50}
        tax={0}
        sx={{ mt: totalDown ? '80px' : 0 }}
      />
    </Stack>
  );
}

export default Cart;