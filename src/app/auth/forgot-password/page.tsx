'use client';

import React, { ChangeEvent, useState } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import Image from 'next/image';
import theme from '@/styles/theme';
import TextField from '@/components/input/TextField';
import CustomButton from '@/components/buttons/CustomButton';
import useValidate from '@/hooks/useValidate';
import { emailValidator } from '@/lib/validators';
import { useMutation } from '@tanstack/react-query';
import apiUrl from '@/data/apiUrl';
import { Logo } from '@/components/logo/Logo';

const LogoContainer = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [email, setEmail] = useState('');
  const [isFirstInteraction, setIsFirstInteraction] = useState(false);

  const { error } = useValidate(email, emailValidator, isFirstInteraction);

  const mutation = useMutation({
    mutationFn: (email: string) => {
      return fetch(`${apiUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
    },
  });

  const handleForgotPassword = (email: string) => {
    if (error) return;
    mutation.mutate(email);
  };

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

              <TextField
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                onBlur={() => setIsFirstInteraction(true)}
                type="text"
                required
                name="email"
                id="email"
                label="Email"
                min={5}
                error={error}
              />
              {mutation.status === 'pending' && 
                <Typography variant="caption" textAlign="center">
                  Loading...
                </Typography>
              }
              {mutation.status === 'success' && 
                <Typography variant="caption" textAlign="center">
                  Password reset email has been sent
                </Typography>
              }

              <CustomButton
                size={isMobile ? 's' : 'l'}
                variant="contained"
                disabled={!!error || !email}
                onClick={() => handleForgotPassword(email)}
              >
                Reset Password
              </CustomButton>

              <Typography variant="caption" textAlign="center">
                <Link href="/auth/sign-in">Back to log in</Link>
              </Typography>
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
