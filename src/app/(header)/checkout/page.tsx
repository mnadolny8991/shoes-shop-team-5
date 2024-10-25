'use client';
import CartSummary from '@/components/cart/CartSummary';
import {
  Alert,
  Box,
  CircularProgress,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/forms/CheckoutForm';
import CustomButton from '@/components/buttons/CustomButton';
import { usePaymentContext } from '@/context/PaymentContext';
import { useEffect, useState } from 'react';
import useCartProducts from '@/hooks/useCartProducts';
import { useCartContext } from '@/context/CartContext';
import {
  createPaymentIntent,
  updatePaymentIntent,
} from '@/lib/fetchPaymentIntent';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const createOrderId = () => Math.floor(Math.random() * 999_999) + 1;

export default function Checkout() {
  const [isMounted, setIsMounted] = useState(false);
  const { payment, setPayment } = usePaymentContext();
  const { amount } = useCartContext();
  const { products, isLoading: isLoadingCartProducts } = useCartProducts();
  const empty = products.length <= 0;
  const subtotal = products.reduce(
    (acc, val) =>
      val.price * amount.find((a) => a.productId === val.id)?.amount! + acc,
    0
  );
  const shipping = 20;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const theme = useTheme();
  const appearance = {
    variables: {
      borderRadius: '8px',
      fontSizeBase: '15px',
      colorText: theme.palette.text.secondary,
      colorPrimary: '#292D32',
      colorDanger: theme.palette.error.main,
      gridRowSpacing: '15px',
    },
    rules: {
      '.Tab': {
        borderRadius: '12px',
        boxShadow: 'none',
      },
      '.Tab--selected': {
        borderColor: theme.palette.primary.main,
        boxShadow: 'none',
      },
    },
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const createPaymentIntentMutation = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: (data) => setPayment(data),
  });
  const updatePaymentIntentMutation = useMutation({
    mutationFn: updatePaymentIntent,
    onSuccess: (data) => setPayment(data),
  });

  useEffect(() => {
    if (!empty)
      if (!payment)
        createPaymentIntentMutation.mutate({
          amount: total * 100,
          orderId: createOrderId(),
        });
      else if (payment.amount !== total * 100)
        updatePaymentIntentMutation.mutate({
          amount: total * 100,
          paymentIntentId: payment.paymentIntentId,
        });
  }, [empty, payment]);

  const isLoading =
    !isMounted ||
    isLoadingCartProducts ||
    createPaymentIntentMutation.isPending ||
    updatePaymentIntentMutation.isPending;
  const error =
    createPaymentIntentMutation.error || updatePaymentIntentMutation.error;

  return (
    <>
      <Box mt={5} mb={3} ml={'5vw'}>
        <Link
          href="/cart"
          variant="subtitle2"
          underline="always"
          color={'text.secondary'}
          mb={'23px'}
          mt={'39px'}
        >
          Back to cart
        </Link>
      </Box>
      {isLoading ? (
        <CircularProgress sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}/>
      ) : empty ? (
        <Typography variant="h1">No Products in the Cart</Typography>
      ) : error ? (
        <Alert severity="error">{error.message}</Alert>
      ) : (
        payment && (
          <Stack
            mx={1}
            spacing={{ lg: '4vw', xl: '7vw' }}
            direction={{ lg: 'row' }}
            alignItems={{ xs: 'center', lg: 'flex-start' }}
            justifyContent={'center'}
          >
            <Box
              width={{ xs: '90vw', lg: '60vw' }}
              maxWidth={{ sm: 665, md: 800 }}
            >
              <Elements
                stripe={stripePromise}
                options={{ clientSecret: payment.clientSecret, appearance }}
              >
                <CheckoutForm />
              </Elements>
            </Box>
            <Box>
              <CartSummary subtotal={subtotal} shipping={shipping} tax={tax} />
              <CustomButton
                size="l"
                form="checkoutForm"
                type="submit"
                variant="contained"
              >
                Confirm & Pay
              </CustomButton>
            </Box>
          </Stack>
        )
      )}
    </>
  );
}
