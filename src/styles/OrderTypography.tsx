import { styled, Typography } from "@mui/material";
import { nunitoSans } from "@/styles/theme";

const OrderTypography = styled(Typography)(({ theme }) => ({
  fontFamily: nunitoSans.style.fontFamily,
  color: '#1E2832',
  fontSize: '14px',
  fontWeight: '700',
  lineHeight: '24px',
}));

export default OrderTypography;