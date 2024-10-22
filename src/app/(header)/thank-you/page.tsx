'use client';
import CustomButton from '@/components/buttons/CustomButton';
import { useCartContext } from '@/context/CartContext';
import { usePaymentContext } from '@/context/PaymentContext';
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import illustrations from '/public/vctrly-business-illustrations-9.png';
import Image from 'next/image';
import { ProductOrderProps } from '@/components/products/ProductOrder';

export default function ThankYou() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { payment, setPayment } = usePaymentContext();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<number | null>(null);
  const { onCartClear } = useCartContext();
  // const router = useRouter()
  // if(!searchParams.get("payment_intent") || searchParams.get("redirect_status") !== "succeeded")
  //     router.push("/")

  useEffect(() => {
    if (
      payment?.paymentIntentId === searchParams.get('payment_intent') &&
      searchParams.get('redirect_status') === 'succeeded'
    ) {
      setOrderId(payment.orderId);
      setPayment(null);

      const pending = JSON.parse(localStorage.getItem('pending')!);
      localStorage.removeItem('pending');
      const orderHistory = JSON.parse(
        localStorage.getItem('orderHistory') ?? '[]'
      ) as ProductOrderProps[];
      orderHistory.unshift(pending);
      orderHistory.map((record, i) => ({ ...record, orderNumber: i }));
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

      onCartClear();
    }
  }, [payment, onCartClear, searchParams, setPayment]);

  return (
    <Stack
      spacing={{ xs: 6, xl: 12 }}
      direction={{ lg: 'row' }}
      mx={{ xs: 1, sm: 2 }}
      mt={10}
      justifyContent="center"
      alignItems={{ xs: 'center', lg: 'flex-end' }}
    >
      <Box maxWidth={820} mb={9}>
        <Typography
          fontSize={{ xs: 50, sm: 90, md: 140 }}
          fontWeight={900}
          lineHeight="1.2em"
        >
          THANK YOU
        </Typography>
        <Typography variant="h1" fontStyle={'italic'}>
          for your order{' '}
          <Typography
            component={'span'}
            color={'primary.main'}
            fontStyle="normal"
          >
            #{orderId}
          </Typography>
        </Typography>
        <Typography fontWeight={300} color={'text.secondary'} my={10}>
          Your order has been received and is currently being processed. You
          will receive an email confirmation with your order details shortly.
        </Typography>
        <Stack
          direction="row"
          spacing={4}
          width={{ xs: 340, sm: 592 }}
          maxWidth="95vw"
        >
          <CustomButton size="xl" variant="outlined" href="/order-history">
            View Order
          </CustomButton>
          <CustomButton size="xl" variant="contained" href="/catalog">
            Continue Shopping
          </CustomButton>
        </Stack>
      </Box>
      <Box
        width={{ xs: '100vw', sm: 493.8 }}
        position="relative"
        top={{ lg: 90 }}
      >
        <Image
          alt="vctrly-business-illustrations-9"
          src={illustrations}
          placeholder="blur"
          quality={100}
          sizes={isMobile ? '100vw' : '493.8'}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Box>
    </Stack>
  );
}
