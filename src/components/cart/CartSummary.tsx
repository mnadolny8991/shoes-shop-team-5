import { Box, Divider, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomButton from '../buttons/CustomButton';

type CartSummaryProps = {
  subtotal: number;
  shipping: number;
  tax: number;
};

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping,
  tax,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const total = subtotal + shipping + tax;

  return (
    <Box
      sx={{
        width: {
          xs: '360px',
          md: '400px',
        },
      }}
    >
      <Typography variant="h1" component="h2">
        Summary
      </Typography>
      {isMobile && <Divider sx={{ mt: '12px' }} />}
      <Stack 
        direction="row" 
        alignItems="center" 
        sx={{ 
          mt: {
            md: '69px',
            xs: '32.4px',
          }
        }}
      >
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: '400',
            lineHeight: '23.46px',
          }}
        >
          Do you have a promcode?
        </Typography>
        <IconButton>
          <ExpandMoreIcon />
        </IconButton>
      </Stack>
      <Stack 
        sx={{
          mt: {
            xs: '32px',
            md: '38px',
          },
          gap: '20px',
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h2" component="p">Subtotal</Typography>
          <Typography variant="h2" component="p">${subtotal}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h2" component="p">Shipping</Typography>
          <Typography variant="h2" component="p">${shipping}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h2" component="p">Tax</Typography>
          <Typography variant="h2" component="p">${tax}</Typography>
        </Stack>
      </Stack>
      <Stack 
        sx={{
          mt: {
            xs: '28px',
            md: '56px',
          },
          gap: {
            xs: '15.17px',
            md: '19px',
          },
        }}
      >
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h2" component="p" sx={{ fontWeight: '600' }}>Total</Typography>
          <Typography variant="h2" component="p" sx={{ fontWeight: '600' }}>${total}</Typography>
        </Stack>
        <Divider />
      </Stack>
      <CustomButton 
        size="m" 
        variant="contained" 
        sx={{ 
          mt: {
            md: '113px',
            xs: '84px',
          }
        }}
      >
        Checkout
      </CustomButton>
    </Box>
  );
};

export default CartSummary;
