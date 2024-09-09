'use client';

import {
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import AddProductButton from '@/components/products/AddProductButton';

export default function MyProductsEmptyState() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      alignItems="center"
      spacing="10px"
      mt={{xs: '65px', md: '100px'}}
      useFlexGap
    >
      <IconButton
        sx={{ width: 72, height: 72, backgroundColor: '#F9FAFB' }}
      >
        <Image
          src="/bag.svg"
          width={isMobile ? 20 : 24}
          height={isMobile ? 20 : 24}
          alt="bag icon"
        />
      </IconButton>
      <Typography variant='h4'>You don’t have any products yet</Typography>
      <Typography variant="subtitle2" mb={{xs:4, md: 5}}>
        Post can contain video, images and text.
      </Typography>
      <AddProductButton />
    </Stack>
  );
}
