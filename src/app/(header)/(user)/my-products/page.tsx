'use client';

import {
  Avatar,
  Box,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import unsplash from '/public/pawel-czerwinski-unsplash-3.png';

import { products } from '@/mock/products';
import ProductsGrid from '@/components/products/ProductsGrid';
import MyProductsEmptyState from '@/components/products/MyProductsEmptyState';
import AddProductButton from '@/components/products/AddProductButton';

const MyProductsHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const UserInfo = styled('div')(() => ({
    position: 'relative',
    top: isMobile ? -15 : -30,
    marginLeft: isMobile ? 20 : 55,
    display: 'flex',
    gap: isMobile ? 13 : 26,
    alignItems: 'end',
  }));

  const UserName = styled(Typography)(() => ({
    fontSize: isMobile ? 14 : 20,
    fontWeight: 500,
    lineHeight: isMobile ? '16.42px' : '23.46px',
    marginBottom: isMobile ? 2 : 4,
  }));

  return (
    <>
      <Box
        height={isMobile ? '132px' : '262px'}
        position="relative"
        width="100%"
      >
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
      <UserInfo>
        <Avatar
          alt="Jane Meldrum"
          src="/jane-meldrum.png"
          sx={{
            width: isMobile ? 64 : 128,
            height: isMobile ? 64 : 128,
            border: '4px solid white',
          }}
        />
        <Box>
          <UserName>Jane Meldrum</UserName>
          <Typography variant="subtitle2">1 374 bonus points</Typography>
        </Box>
      </UserInfo>
      <Stack
        direction={'row'}
        justifyContent="space-between"
        alignItems="center"
        mx={'20px'}
        mb={isMobile ? '19px' : '36px'}
      >
        <Typography variant="h1">My products</Typography>
        {products && !isMobile && <AddProductButton />}
      </Stack>
    </>
  );
};

export default function MyProducts() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <MyProductsHeader />
      {products ? (
        <>
          <ProductsGrid products={products} />
          {isMobile && (
            <Box
              height="80px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <AddProductButton />
            </Box>
          )}
        </>
      ) : (
        <MyProductsEmptyState />
      )}
    </>
  );
}
