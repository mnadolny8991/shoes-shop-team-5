'use client';

import { FC, useState } from "react"
import ProductOrderBasicInfo from "./ProductOrderBasicInfo";
import ProductOrderData from "./ProductOrderData";
import { Divider, Stack } from "@mui/material";

type ProductOrderProps = {
  orderNumber: number;
  date: Date;
  products: { productId: number, size: number, quantity: number }[];
  shipmentStatus: 'Shipped' | 'Recieved' | 'Cancelled';
  data: { delivery: string, contacts: string, paymentStatus: 'Before payment' | 'After payment' };
}

const ProductOrder: FC<ProductOrderProps> = ({
  orderNumber,
  date,
  products,
  shipmentStatus,
  data,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  return (
    <Stack divider={<Divider sx={{ color: '#E7EBEF' }}/>}>
      <ProductOrderBasicInfo 
        orderNumber={orderNumber}
        date={date}
        amount={products.length}
        expand={expanded}
        onExpandClick={handleExpandClick}
      />
      {expanded &&
        
          <ProductOrderData 
            data={data}
          />
        
      }
    </Stack>
  )
}

export default ProductOrder;

