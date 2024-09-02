'use client';

import React, { useState } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import Image from 'next/image';
import theme from '@/theme';
import TextField from '../../components/input/TextField';
import CustomButton from '../../components/buttons/CustomButton';
import useValidate from '../../hooks/useValidate';
import { emailValidator } from '@/lib/validators';

const Logo = () => {
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
      <Image
        src="/logo.svg"
        width={isMobile ? 35 : 40}
        height={isMobile ? 26.5 : 30}
        alt="website logo"
      />
    </Box>
  );
};

const ForgotPassword: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [email, setEmail] = useState('');
  const [isFirstInteraction, setIsFirstInteraction] = useState(false);

  const { error } = useValidate(email, emailValidator, isFirstInteraction);

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
          <Logo />
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
                width: isMobile ? '320px' : '436px',
              }}
            >
              <Typography variant="h1" fontSize={isMobile ? '30px' : '45px'}>
                Forgot password?
              </Typography>
              <Typography variant="body2" color={theme.palette.text.secondary}>
                Don’t worry, we’ll send you reset instructions.
              </Typography>

              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => setIsFirstInteraction(true)}
                required
                name="email"
                id="email"
                label="Email"
                min={5}
                error={error}
              />

              <CustomButton
                size={isMobile ? 's' : 'l'}
                variant="contained"
                disabled={!!error || !email}
              >
                Reset Password
              </CustomButton>

              <Typography
                variant="caption"
                fontSize={isMobile ? '11.15px' : '15px'}
                textAlign="center"
              >
                <Link href="/login">Back to log in</Link>
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
