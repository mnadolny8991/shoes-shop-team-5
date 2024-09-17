'use client';

import theme from '@/styles/theme';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';

export const Logo = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Image
      src="/logo.svg"
      width={isMobile ? 35 : 40}
      height={isMobile ? 26.5 : 30}
      alt="shoes shop logo"
      style={{
        marginTop: isMobile ? '20px' : '50px',
        marginLeft: isMobile ? '20px' : '40px',
      }}
    />
  );
};
