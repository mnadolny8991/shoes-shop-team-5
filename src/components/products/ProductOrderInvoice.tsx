import { Box, Stack } from "@mui/material";
import { FC } from "react"
import OrderTypography from "@/styles/OrderTypography";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Link from "next/link";

type ProductOrderInvoiceProps = {
  discount: number,
}

const ProductOrderInvoice: FC<ProductOrderInvoiceProps> = ({ discount }) => {
  return (
    <Box
      padding="16px 24px"
      sx={{ backgroundColor: '#FAFAFA' }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" gap={1}>
          <PictureAsPdfIcon sx={{ color: '#E5252A' }}/>
          <OrderTypography><Link href="#" style={{ textDecoration: 'underline' }}>PDF invoice download</Link></OrderTypography>
        </Stack>
        <Stack direction="row" gap={1}>
          <OrderTypography sx={{ color: '#8C9196' }}>Discount:</OrderTypography>
          <OrderTypography sx={{ color: '#EB5656', fontSize: '16px' }}>{discount}$</OrderTypography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ProductOrderInvoice;