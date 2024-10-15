import OrderTypography from '@/styles/OrderTypography';
import { Box, IconButton, Stack } from '@mui/material';
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
        gap="20px"
        alignItems="center"
      >
        <ImageContainer 
          src={productInfo.product.images[0].url}
          alt={productInfo.product.images[0].alternativeText}
          width={104}
          height={104}
        />
        <Stack>

        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductOrderDetails;