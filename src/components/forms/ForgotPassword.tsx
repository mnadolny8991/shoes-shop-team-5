import { Typography, useMediaQuery } from '@mui/material';
import ServerErrorBox from '../containers/ServerErrorBox';
import TextField from '../input/TextField';
import Link from 'next/link';
import CustomButton from '../buttons/CustomButton';
import useValidate from '@/hooks/useValidate';
import { ChangeEvent, useState } from 'react';
import { emailValidator } from '@/lib/validators';
import { useMutation } from '@tanstack/react-query';
import apiUrl from '@/data/apiUrl';
import theme from '@/styles/theme';
import { ApiError } from '@/types/api/apiError';

const ForgotPasswordForm = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [email, setEmail] = useState('');
  const [isFirstInteraction, setIsFirstInteraction] = useState(false);

  const { error } = useValidate(email, emailValidator, isFirstInteraction);

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const apiError = await response.json();
        const errorDetails = apiError.error as ApiError;
        throw new Error(errorDetails.message);
      }
    },
  });

  const handleForgotPassword = (email: string) => {
    mutation.mutate(email);
  };
  return (
    <>
      {' '}
      <ServerErrorBox
        message={mutation?.error?.message ?? ''}
        submessages={[]}
      />
      <TextField
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        onBlur={() => setIsFirstInteraction(true)}
        type="text"
        required
        name="email"
        id="email"
        label="Email"
        min={5}
        error={error}
      />
      {mutation.status === 'pending' && (
        <Typography variant="caption" textAlign="center">
          Loading...
        </Typography>
      )}
      {mutation.status === 'success' && (
        <Typography variant="caption" textAlign="center">
          Password reset email has been sent
        </Typography>
      )}
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
    </>
  );
};

export default ForgotPasswordForm;
