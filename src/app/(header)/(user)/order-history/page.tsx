'use client';

import ProductOrder, { ProductOrderProps } from '@/components/products/ProductOrder';
import ProductOrderDetails from '@/components/products/ProductOrderDetails';
import mockOrders from '@/mock/mockOrders';
import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Page() {
  const [orderHistory, setOrderHistory] = useState<ProductOrderProps[] | null>(null);

  useEffect(() => {
    const dateReviver = (key: string, value: string) => {
      if (key === 'date') return new Date(value);
      return value;
    }

    const oh = JSON.parse(localStorage.getItem('orderHistory') || '[]', dateReviver) as ProductOrderProps[];
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
      {orderHistory 
        ? <Stack gap={2}>
            {orderHistory.map((order, i) => 
              <ProductOrder
                key={i}
                {...order}
              />
            )}
          </Stack>
        : <></>
      }
      
    </>
  );
}
