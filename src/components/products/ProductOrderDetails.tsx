import OrderTypography from '@/styles/OrderTypography';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import ImageContainer from '../containers/ImageContainer';
import { Product } from '@/types/product';

type ProductOrderDetailsProps = {
  productInfo: { product: Product; size: number; quantity: number };
};

const ProductOrderDetails: FC<ProductOrderDetailsProps> = ({ productInfo }) => {
  return (
    <Box padding="16px 24px" sx={{ backgroundColor: '#FAFAFA' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack 
          direction="row"
          gap="20px"
          alignItems="center"
        >
          <ImageContainer 
            src={productInfo.product.images[0].url}
            alt={productInfo.product.images[0].alternativeText}
            width={104}
            height={104}
          />
          <Stack 
            gap={1}
            sx={{
              minWidth: { lg: '426px', xs: 'none' },
            }}
          >
            <Stack>
              <Typography 
                sx={{
                  fontSize: '24px',
                  lineHeight: '28.15px',
                  fontWeight: 500,
                  color: 'black',
                }}
              >
                {productInfo.product.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: '16px',
                  lineHeight: '18.77px',
                  fontWeight: 500,
                }}
                color="text.secondary"
              >
                {productInfo.product.gender.name}&apos;s shoes
              </Typography>
            </Stack>
            <OrderTypography sx={{ lineHeight: '20px' }}>Size: {productInfo.size} EU</OrderTypography>
          </Stack>
        </Stack>
        <Stack direction="row" gap={1}>
          <OrderTypography sx={{ color: '#8C9196' }}>Quantity:</OrderTypography>
          <OrderTypography >{productInfo.quantity}</OrderTypography>
        </Stack>
        <Stack direction="row" gap={1}>
          <OrderTypography sx={{ color: '#8C9196' }}>Price:</OrderTypography>
          <OrderTypography sx={{ fontSize: '16px' }}>{productInfo.product.price}$</OrderTypography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductOrderDetails;