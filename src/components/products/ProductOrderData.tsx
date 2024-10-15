import { Box, Stack } from "@mui/material";
import { FC } from "react"
import OrderTypography from "@/styles/OrderTypography";

type ProductOrderDataProps = {
  data: { delivery: string, contacts: string, paymentStatus: 'Before payment' | 'After payment' };
}

const ProductOrderData: FC<ProductOrderDataProps> = ({ data }) => {
  return (
    <Box
      padding="16px 24px"
      sx={{ backgroundColor: '#FAFAFA' }}
    >
      <Stack direction="row" justifyContent="center" gap="40px">
        <Stack direction="row" gap={1}>
          <OrderTypography sx={{ color: '#8C9196' }}>Delivery</OrderTypography>
          <OrderTypography>{data.delivery}</OrderTypography>
        </Stack>
        <Stack direction="row" gap={1}>
          <OrderTypography sx={{ color: '#8C9196' }}>Contacts</OrderTypography>
          <OrderTypography>{data.contacts}</OrderTypography>
        </Stack>
        <Stack direction="row" gap={1}>
          <OrderTypography sx={{ color: '#8C9196' }}>Payment status</OrderTypography>
          <OrderTypography>{data.paymentStatus}</OrderTypography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ProductOrderData;