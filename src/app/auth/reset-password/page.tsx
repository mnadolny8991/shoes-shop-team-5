'use client';

import { Box, Typography, useMediaQuery } from '@mui/material';
import backgroundImage from '../../../../public/reset-password-backgroound.png';
import CustomButton from '@/components/buttons/CustomButton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import theme from '@/styles/theme';
import TextField from '@/components/input/TextField';
import Link from 'next/link';
import useValidate from '@/hooks/useValidate';
import { Suspense, useState } from 'react';
import { confirmPasswordValdiator, passwordValidator } from '@/lib/validators';
import apiUrl from '@/data/apiUrl';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordContent({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');

  const [isFirstInteractionPass, setIsFirstInteractionPass] = useState(false);
  const [isFirstInteractionConfPass, setIsFirstInteractionConfPass] =
    useState(false);

  const { error: passError } = useValidate(
    password,
    passwordValidator,
    isFirstInteractionPass
  );
  const { error: confPassError } = useValidate(
    confPass,
    confirmPasswordValdiator(password),
    isFirstInteractionConfPass
  );

  const mutation = useMutation({
    mutationFn: ({
      password,
      passwordConfirmation,
      code,
    }: {
      password: string;
      passwordConfirmation: string;
      code: string;
    }) => {
      return fetch(`${apiUrl}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, passwordConfirmation, code }),
      });
    },
    onSuccess: () => {
      // Redirect to the sign-in page on success
      router.push('/sign-in');
    },
  });

  const onResetPassword = () => {
    if (!!passError || !password || !!confPassError || !confPass) return;

    mutation.mutate({
      password,
      passwordConfirmation: confPass,
      code: searchParams.get('code')!,
    });
  };

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
            <Typography variant="h1">Reset password</Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              Please create new password here
            </Typography>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => setIsFirstInteractionPass(true)}
              required
              type="password"
              name="password"
              id="password"
              label="Password"
              min={8}
              error={passError!}
            />
            <TextField
              value={confPass}
              onChange={(e) => setConfPass(e.target.value)}
              onBlur={(e) => setIsFirstInteractionConfPass(true)}
              required
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm password"
              min={8}
              error={confPassError!}
            />
            <CustomButton
              size={isMobile ? 's' : 'l'}
              variant="contained"
              disabled={
                !!passError || !password || !!confPassError || !confPass
              }
              onClick={onResetPassword}
            >
              Reset Password
            </CustomButton>
            <Typography variant="caption" textAlign="center">
              <Link href="/login">Back to log in</Link>
            </Typography>
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

export default function ResetPassword() {
  const searchParams = useSearchParams();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent searchParams={searchParams} />
    </Suspense>
  );
}
