'use client';

import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import theme from '@/styles/theme';
import { Logo } from '@/components/logo/Logo';
import ForgotPasswordForm from '@/components/forms/ForgotPassword';

const LogoContainer = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50px',
        left: '40px',
        zIndex: 1000,
      }}
    >
      <Logo />
    </Box>
  );
};

const ForgotPassword: React.FC = () => {
  return (
    <>
      <Grid container sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
          }}
        >
          <LogoContainer />
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
              <Typography variant="h1">Forgot password?</Typography>
              <Typography variant="body2" color={theme.palette.text.secondary}>
                Don&apos;t worry, we&apos;ll send you reset instructions.
              </Typography>

              <ForgotPasswordForm />
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={false}
          md={6}
          sx={{
            backgroundImage: 'url(/pexels-melvin-buezo-2529146.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </>
  );
};

export default ForgotPassword;
