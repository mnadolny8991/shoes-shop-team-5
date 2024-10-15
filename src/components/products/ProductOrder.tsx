'use client';

import { FC, useState } from 'react';
import ProductOrderBasicInfo from './ProductOrderBasicInfo';
import ProductOrderData from './ProductOrderData';
import { Divider, Stack, Typography } from '@mui/material';
import ProductOrderDetails from './ProductOrderDetails';
import mapProduct from '@/mappers/productMappers';
import { fetchProductById } from '@/lib/api/fetchProducts';
import { useQueries } from '@tanstack/react-query';

type ProductOrderProps = {
  orderNumber: number;
  date: Date;
  products: { productId: number; size: number; quantity: number }[];
  shipmentStatus: 'Shipped' | 'Recieved' | 'Cancelled';
  data: {
    delivery: string;
    contacts: string;
    paymentStatus: 'Before payment' | 'After payment';
  };
};

const ProductOrder: FC<ProductOrderProps> = ({
  orderNumber,
  date,
  products,
  shipmentStatus,
  data,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const queriesData = products.map((product) => ({
    queryKey: ['products', product.productId],
    queryFn: async () => mapProduct(await fetchProductById(product.productId)),
  }));
  const queries = useQueries({ queries: queriesData });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Stack divider={<Divider sx={{ color: '#E7EBEF' }} />}>
      <ProductOrderBasicInfo
        orderNumber={orderNumber}
        date={date}
        shipmentStatus={shipmentStatus}
        summaryPrice={160}
        amount={products.length}
        expand={expanded}
        onExpandClick={handleExpandClick}
      />
      {expanded &&
        <Stack divider={<Divider sx={{ color: '#E7EBEF' }} />}>
          <ProductOrderData data={data} />
          {queries.map((query) => {
            if (query.status === 'success') {
              return (
                <ProductOrderDetails 
                  productInfo={{
                    product: query.data,
                    quantity: products.find((p) => p.productId === query.data.id)?.quantity!,
                    size: products.find((p) => p.productId === query.data.id)?.size!,
                  }}
                />
              );
            } else if (query.status === 'pending') {
              return <Typography variant="h2">Loading...</Typography>;
            } else {
              return <Typography variant="h2">Cannot load product data</Typography>
            }
          })}
        </Stack>
      }
    </Stack>
  );
};

export default ProductOrder;
