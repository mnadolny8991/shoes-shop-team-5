'use client';

import { Box, useMediaQuery } from '@mui/material';
import backgroundImage from '../../../../public/reset-password-backgroound.png';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import theme from '@/styles/theme';
import { Suspense } from 'react';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';

export default function ResetPassword() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid2 container style={{ height: '100vh' }}>
      <Grid2 xs={12} md={6}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              width: { xs: '320px', md: '436px' },
            }}
          >
            <Suspense>
              <ResetPasswordForm />
            </Suspense>
          </Box>
        </Box>
      </Grid2>
      {!isMobile && (
        <Grid2 md={6}>
          <Box
            sx={{
              height: '100%',
              backgroundImage: `url(${backgroundImage.src})`,
              backgroundSize: 'fill',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </Grid2>
      )}
    </Grid2>
  );
}
