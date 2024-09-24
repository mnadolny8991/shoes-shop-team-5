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

export default function NothingFound() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      alignItems="center"
      spacing="10px"
      mt={{ xs: '65px', md: '100px' }}
      useFlexGap
    >
      <IconButton
        sx={{ width: '72px', height: '72px', backgroundColor: '#F9FAFB' }}
      >
        <Image
          src="/search-normal.svg"
          width={isMobile ? 20 : 24}
          height={isMobile ? 20 : 24}
          alt="bag icon"
        />
      </IconButton>
      <Typography variant="h4">No products found</Typography>
      <Typography variant="subtitle2" mb={{ xs: 4, md: 5 }}>
        We couldn&apos;t find what you searched for.
      </Typography>
    </Stack>
  );
}
