import { styled, Typography } from "@mui/material";
import { Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const OrderTypography = styled(Typography)(({ theme }) => ({
  fontFamily: nunitoSans.style.fontFamily,
  color: '#1E2832',
  fontSize: '14px',
  fontWeight: '700',
  lineHeight: '24px',
}));

export default OrderTypography;