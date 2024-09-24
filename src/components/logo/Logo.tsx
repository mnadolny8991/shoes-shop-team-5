'use client';

import theme from '@/styles/theme';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';

export const Logo = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  return (
    <Image
      src="/logo.svg"
      width={isMobile ? 35 : 40}
      height={isMobile ? 26.5 : 30}
      alt="shoes shop logo"
      style={{
        cursor: 'pointer',
      }}
      onClick={() => router.push('/')}
    />
  );
};
