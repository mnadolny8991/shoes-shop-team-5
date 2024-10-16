'use client';

import { FC, useState } from 'react';
import ProductOrderBasicInfo from './ProductOrderBasicInfo';
import ProductOrderData from './ProductOrderData';
import { Divider, Stack } from '@mui/material';
import ProductOrderDetails from './ProductOrderDetails';
import mapProduct from '@/mappers/productMappers';
import { fetchProductById } from '@/lib/api/fetchProducts';
import { useQueries } from '@tanstack/react-query';
import ProductOrderInvoice from '@/components/products/ProductOrderInvoice';

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
  discount: number;
};

const ProductOrder: FC<ProductOrderProps> = ({
  orderNumber,
  date,
  products,
  shipmentStatus,
  data,
  discount
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const queriesData = products.map((product) => ({
    queryKey: ['products', product.productId],
    queryFn: async () => mapProduct(await fetchProductById(product.productId)),
  }));
  const queries = useQueries({ queries: queriesData });
  const totalPrice = queries.reduce((total, query) => 
    query.data
      ? total + (query.data.price * products.find((p) => p.productId === query.data.id)!.quantity)
      : total
  , 0);
  const isLoading = queries.some(query => query.isLoading);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Stack divider={<Divider sx={{ color: '#E7EBEF' }} />}>
      <ProductOrderBasicInfo
        orderNumber={orderNumber}
        date={date}
        shipmentStatus={shipmentStatus}
        summaryPrice={isLoading ? NaN : totalPrice - discount}
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
                  key={query.data.id}
                  productInfo={{
                    product: query.data,
                    quantity: products.find((p) => p.productId === query.data.id)?.quantity!,
                    size: products.find((p) => p.productId === query.data.id)?.size!,
                  }}
                />
              );
            }
          })}
          <ProductOrderInvoice discount={discount}/>
        </Stack>
      }
    </Stack>
  );
};

export default ProductOrder;
