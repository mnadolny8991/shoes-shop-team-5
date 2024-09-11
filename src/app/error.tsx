'use client';

import GoBackAndHomeButtonsStack from '@/components/buttons/GoBackAndHomeButtonsStack';
import {
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const ImageMessageContainer = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      height: 443,
      width: '100%',
      padding: '5%',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      textAlign: 'center',
    },
    '& p': {
      fontSize: 20,
      fontWeight: 500,
      lineHeight: '28.66px',
      color: theme.palette.text.secondary,
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        lineHeight: '17.2px',
        color: theme.palette.primary.contrastText,
      },
    },
    '& img': {
      zIndex: -1,
      [theme.breakpoints.down('md')]: {
        objectPosition: '70% 50%',
        objectFit: 'cover',
      },
      [theme.breakpoints.up('md')]: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: 'auto',
      },
    },
  }));

  return (
    <Stack
      sx={{
        alignItems: { xs: 'center', md: 'flex-start' },
        position: { md: 'relative' },
        padding: { md: '10%' },
      }}
    >
      <Typography variant="h1" mt={'43px'} mb={{ xs: 2, md: 3 }}>
        We lost that page...
      </Typography>
      <ImageMessageContainer>
        <Image
          alt="sebastian svenson unsplash"
          src="/sebastian-svenson-LpbyDENbQQg-unsplash.png"
          quality={100}
          {...(isMobile
            ? { fill: true }
            : { width: 4096, height: 2013, sizes: '100vw' })}
        />
        <Typography>
          The error occurred! Error message: {error.message}
        </Typography>
      </ImageMessageContainer>
      <GoBackAndHomeButtonsStack />
    </Stack>
  );
}
