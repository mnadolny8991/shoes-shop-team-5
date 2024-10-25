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
import shippingCost from '@/data/shippingCost';

export type ProductOrderProps = {
  orderNumber: number;
  date: Date;
  records: { id: string; productId: number; size: number; quantity: number }[];
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
  records,
  shipmentStatus,
  data,
  discount,
}) => {
  const [expanded, setExpanded] = useState<boolean>(orderNumber === 0);
  const queriesData = records.map((productRecord) => ({
    queryKey: ['productRecord', productRecord.id],
    queryFn: async () =>
      mapProduct(await fetchProductById(productRecord.productId)),
  }));
  const queries = useQueries({ queries: queriesData });
  const totalPrice = records.reduce((total, recordData, index) => {
    // Access the query result based on the index, which aligns with the records array
    const productQuery = queries[index];

    // Check if the query has successfully fetched data
    if (productQuery?.data) {
      const productPrice = productQuery.data.price || 0;
      // Assume recordData has a quantity field, adjust the total price calculation
      return total + productPrice * recordData.quantity;
    }

    // If the query data is not ready, return the current total without modification
    return total;
  }, 0) + shippingCost;
  const isLoading = queries.some((query) => query.isLoading);

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
        amount={records.length}
        expand={expanded}
        onExpandClick={handleExpandClick}
      />
      {expanded && (
        <Stack divider={<Divider sx={{ color: '#E7EBEF' }} />}>
          <ProductOrderData data={data} />
          {records.map((record, index) => {
            const query = queries[index];
            if (query.status === 'success') {
              return (
                <ProductOrderDetails
                  key={record.id}
                  productInfo={{
                    product: query.data,
                    quantity: record.quantity,
                    size: record.size,
                  }}
                />
              );
            }
          })}
          <ProductOrderInvoice discount={discount} />
        </Stack>
      )}
    </Stack>
  );
};

export default ProductOrder;
