import OrderTypography from '@/styles/OrderTypography';
import { Box, IconButton, Stack } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

type ProductOrderBasicInfoProps = {
  orderNumber: number;
  date: Date;
  shipmentStatus: 'Shipped' | 'Recieved' | 'Cancelled';
  summaryPrice: number;
  amount: number;
  expand: boolean;
  onExpandClick: () => void;
};

const ProductOrderBasicInfo: FC<ProductOrderBasicInfoProps> = ({
  orderNumber,
  date,
  shipmentStatus,
  summaryPrice,
  amount,
  expand,
  onExpandClick,
}) => {
  let statusInfo;
  switch (shipmentStatus) {
    case 'Shipped':
      statusInfo = (
        <Stack direction="row" gap={1}>
          <LocalShippingOutlinedIcon sx={{ color: '#8C9196' }} fontSize="small" />
          <OrderTypography sx={{ color: '#8C9196' }}>
            {shipmentStatus}
          </OrderTypography>
      </Stack>
      );
      break;
    case 'Recieved':
      statusInfo = (
        <Stack direction="row" gap={1}>
          <CheckIcon sx={{ color: '#3D9D41' }} fontSize="small" />
          <OrderTypography sx={{ color: '#3D9D41' }}>
            {shipmentStatus}
          </OrderTypography>
        </Stack>
      );
      break;
    default:
      statusInfo = (
        <Stack direction="row" gap={1}>
          <CloseIcon sx={{ color: '#CD3C37' }} fontSize="small" />
          <OrderTypography sx={{ color: '#CD3C37' }}>
            {shipmentStatus}
          </OrderTypography>
        </Stack>
      );
      break;
  }

  return (
    <Box padding="16px 24px" sx={{ backgroundColor: '#FAFAFA' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={1}>
          <OrderTypography>&#8470;{orderNumber}:</OrderTypography>
          <OrderTypography sx={{ color: '#8C9196' }}>
            {date.toLocaleDateString()}
          </OrderTypography>
        </Stack>
        <Stack direction="row" gap={1}>
          <OrderTypography sx={{ color: '#8C9196' }}>Products:</OrderTypography>
          <OrderTypography>{amount}</OrderTypography>
        </Stack>
        <Stack direction="row" gap={4} alignItems="center">
          <Stack direction="row" gap={1}>
            <OrderTypography sx={{ color: '#8C9196' }}>
              Summary:
            </OrderTypography>
            <OrderTypography sx={{ fontSize: '16px' }}>
              {summaryPrice}$
            </OrderTypography>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center">
            {statusInfo}
          </Stack>
          <IconButton onClick={onExpandClick} sx={{ p: 0 }}>
            {expand ? (
              <ExpandLessIcon sx={{ color: '#8C9196' }} />
            ) : (
              <ExpandMoreIcon sx={{ color: '#8C9196' }} />
            )}
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductOrderBasicInfo;
