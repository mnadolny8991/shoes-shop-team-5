'use client';

import {
  IconButton,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import AddProductButton from './AddProductButton';

export default function MyProductsEmptyState() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const NoProductsCaption = styled(Typography)(() => ({
    fontSize: isMobile ? 16 : 20,
    fontWeight: 500,
    lineHeight: isMobile ? '18.77px' : '23.46px',
  }));

  return (
    <Stack
      alignItems="center"
      spacing="10px"
      mt={isMobile ? '65px' : '100px'}
      useFlexGap
    >
      <IconButton
        sx={{ width: '72px', height: '72px', backgroundColor: '#F9FAFB' }}
      >
        <Image
          src="/bag.svg"
          width={isMobile ? 20 : 24}
          height={isMobile ? 20 : 24}
          alt="bag icon"
        />
      </IconButton>
      <NoProductsCaption>You don’t have any products yet</NoProductsCaption>
      <Typography variant="subtitle2" mb={isMobile ? 4 : 5}>
        Post can contain video, images and text.
      </Typography>
      <AddProductButton />
    </Stack>
  );
}
