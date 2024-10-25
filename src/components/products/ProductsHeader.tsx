'use client';
import {
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import unsplash from '/public/pawel-czerwinski-unsplash-3.png';
import { useAvatarQuery } from '@/hooks/useAvatarQuery';
import { useSession } from 'next-auth/react';

const ProductsHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data } = useAvatarQuery();

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
      {data && (
        <Box
          position="relative"
          top={{ xs: -15, md: -30 }}
          marginLeft={{ xs: '20px', md: '55px' }}
          display="flex"
          gap={{ xs: '13px', md: '26px' }}
          alignItems="center"
        >
          <Avatar
            alt={data.alt}
            src={data.src}
            sx={{
              width: { xs: 64, md: 128 },
              height: { xs: 64, md: 128 },
              border: '4px solid white',
            }}
          />
          <Typography variant="h5" mb={{ xs: '2px', md: '4px' }}>
            {data.name}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ProductsHeader;
