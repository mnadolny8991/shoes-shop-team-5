'use client';

import CustomButton from '@/components/buttons/CustomButton';
import ProductOrder, {
  ProductOrderProps,
} from '@/components/products/ProductOrder';
import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [orderHistory, setOrderHistory] = useState<ProductOrderProps[] | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const dateReviver = (key: string, value: string) => {
      if (key === 'date') return new Date(value);
      return value;
    };

    const oh = JSON.parse(
      localStorage.getItem('orderHistory') || '[]',
      dateReviver
    ) as ProductOrderProps[];
    if (!oh.length) {
      setOrderHistory(null);
      return;
    }
    setOrderHistory(oh);
  }, []);

  return (
    <>
      <Typography
        variant="h1"
        mx={{ xs: 2, md: 0 }}
        mb={{ xs: '19px', md: '36px' }}
      >
        Order history
      </Typography>
      {orderHistory ? (
        <Stack gap={2}>
          {orderHistory.map((order, i) => (
            <ProductOrder key={i} {...order} orderNumber={i} />
          ))}
        </Stack>
      ) : (
        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            gap: '1rem',
          }}
        >
          <Typography variant="h4">No orders yet</Typography>
          <CustomButton
            size="m"
            variant="contained"
            onClick={() =>
              router.push(
                '/catalog?search=&brand=%5B%5D&color=%5B%5D&gender=%5B%5D&price=%5B0%2C999%5D&size=%5B%5D&page=1'
              )
            }
          >
            Add product
          </CustomButton>
        </Stack>
      )}
    </>
  );
}
