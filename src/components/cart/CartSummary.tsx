'use client';

import {
  Box,
  Divider,
  IconButton,
  Input,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomButton from '@/components/buttons/CustomButton';
import { useState } from 'react';
import { useCartContext } from '@/context/CartContext';

type CartSummaryProps = {
  subtotal: number;
  shipping: number;
  tax: number;
  sx?: object;
};

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping,
  tax,
  sx,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [hasPromocode, setHasPromocode] = useState<boolean>(false);
  const { promocode, onPromocodeChange } = useCartContext();

  const total = subtotal + shipping + tax;

  return (
    <Box
      data-testid="cart-summary"
      sx={{
        width: {
          xs: '320px',
          md: '400px',
        },
        ...sx,
      }}
    >
      <Typography data-testid="summary-heading" variant="h1" component="h2">
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
          },
        }}
      >
        <Typography variant="h4" fontWeight={400}>
          Do you have a promocode?
        </Typography>
        <IconButton
          data-testid="promocode-toggle"
          onClick={() => setHasPromocode(!hasPromocode)}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Stack>
      {hasPromocode && (
        <Input
          inputProps={{ 'data-testid': 'promocode-input' }}
          value={promocode}
          onChange={(e) => onPromocodeChange(e.target.value)}
        />
      )}
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
          <Typography variant="h2" component="p">
            Subtotal
          </Typography>
          <Typography data-testid="subtotal" variant="h2" component="p">
            ${subtotal}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h2" component="p">
            Shipping
          </Typography>
          <Typography data-testid="shipping" variant="h2" component="p">
            ${shipping}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h2" component="p">
            Tax
          </Typography>
          <Typography data-testid="tax" variant="h2" component="p">
            ${tax}
          </Typography>
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
          <Typography variant="h2" component="p" sx={{ fontWeight: '600' }}>
            Total
          </Typography>
          <Typography
            data-testid="total"
            variant="h2"
            component="p"
            sx={{ fontWeight: '600' }}
          >
            ${total}
          </Typography>
        </Stack>
        <Divider />
      </Stack>
      <CustomButton
        href="/checkout"
        data-testid="checkout-button"
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
  );
};

export default CartSummary;
