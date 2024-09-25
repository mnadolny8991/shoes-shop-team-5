'use client';

import { Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import CustomButton from '@/components/buttons/CustomButton';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import theme from '@/styles/theme';
import useValidate from '@/hooks/useValidate';
import { confirmPasswordValdiator, passwordValidator } from '@/lib/validators';
import { useMutation } from '@tanstack/react-query';
import apiUrl from '@/data/apiUrl';
import TextField from '@/components/input/TextField';

const ResetPasswordForm = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const searchParams = useSearchParams();
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
      router.push('/auth/sign-in');
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
    <>
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
        disabled={!!passError || !password || !!confPassError || !confPass}
        onClick={onResetPassword}
      >
        Reset Password
      </CustomButton>
      <Typography variant="caption" textAlign="center">
        <Link href="/auth/sign-in">Back to log in</Link>
      </Typography>
    </>
  );
};

export default ResetPasswordForm;
