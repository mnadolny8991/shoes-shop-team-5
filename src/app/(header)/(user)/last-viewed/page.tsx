'use client';

import {
  Avatar,
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import unsplash from '/public/pawel-czerwinski-unsplash-3.png';

import { products } from '@/mock/products';
import ProductsGrid from '@/components/products/ProductsGrid';

const ProductsHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Box height={{ xs: 132, md: 262 }} position="relative" width="100%">
        <Image
          alt="Pawel Czerwinski unsplash-3"
          src={unsplash}
          placeholder="blur"
          quality={100}
          fill
          sizes={isMobile ? '100vw' : 'calc(100vw - 440px)'}
          style={{
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box
        position="relative"
        top={{ xs: -15, md: -30 }}
        marginLeft={{ xs: '20px', md: '55px' }}
        display="flex"
        gap={{ xs: '13px', md: '26px' }}
        alignItems="end"
      >
        <Avatar
          alt="Jane Meldrum"
          src="/jane-meldrum.png"
          sx={{
            width: { xs: 64, md: 128 },
            height: { xs: 64, md: 128 },
            border: '4px solid white',
          }}
        />
        <Box>
          <Typography variant="h5" mb={{ xs: '2px', md: '4px' }}>
            Jane Meldrum
          </Typography>
          <Typography variant="subtitle2">1 374 bonus points</Typography>
        </Box>
      </Box>
      <Stack
        direction={'row'}
        justifyContent="space-between"
        alignItems="center"
        mx={'20px'}
        mb={{ xs: '19px', md: '36px' }}
      >
        <Typography variant="h1">Last viewed products</Typography>
      </Stack>
    </>
  );
};

export default function DefaultProducts() {
  return (
    <>
      <ProductsHeader />
      {products && (
        <>
          <ProductsGrid products={products} />
        </>
      )}
    </>
  );
}
