'use client';

import {
  Box,
  Typography,
  Link,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from '@mui/material';
import TextField from '@/components/input/TextField';
import CustomButton from '@/components/buttons/CustomButton';
import { useState } from 'react';
import useValidate from '@/hooks/useValidate';
import {
  confirmPasswordValdiator,
  emailValidator,
  nameValidator,
  passwordValidator,
} from '@/lib/validators';
import { useMutation } from '@tanstack/react-query';
import { UserFormData } from '@/types/userFormData';
import apiUrl from '@/data/apiUrl';
import { useRouter } from 'next/navigation';
import { ApiError, ApiErrorDetails } from '@/types/api/apiFormError';

export default function SignupForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');

  const [isFirstInteractionName, setIsFirstInteractionName] = useState(false);
  const [isFirstInteractionEmail, setIsFirstInteractionEmail] = useState(false);
  const [isFirstInteractionPassword, setIsFirstInteractionPassword] =
    useState(false);
  const [isFirstInteractionConfPass, setIsFirstInteractionConfPass] =
    useState(false);

  const { error: nameError } = useValidate(
    name,
    nameValidator,
    isFirstInteractionName
  );
  const { error: emailError } = useValidate(
    email,
    emailValidator,
    isFirstInteractionEmail
  );
  const { error: passwordError } = useValidate(
    password,
    passwordValidator,
    isFirstInteractionPassword
  );
  const { error: confPassError } = useValidate(
    confPass,
    confirmPasswordValdiator(password),
    isFirstInteractionConfPass
  );

  const mutation = useMutation({
    mutationFn: async (user: UserFormData) => {
      const response = await fetch(`${apiUrl}/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        return response.json();
      }
      const errorResponse = (await response.json()).error as ApiError;
      throw new Error(errorResponse.message, {
        cause: errorResponse.details,
      });
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      username: name,
      email,
      password,
    });
  };

  return (
    <form>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: { xs: '320px', md: '436px' },
          gap: '22px',
        }}
      >
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={mutation.status === 'error'}
          autoHideDuration={2000}
        >
          <Alert severity="error">
            <>{mutation.error?.message || 'Server error'}</>
            <ul>
              {(mutation.error?.cause as ApiErrorDetails)?.errors?.map(
                (error, index) => <li key={index}>{error.message}</li>
              )}
            </ul>
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={mutation.status === 'success'}
          autoHideDuration={2000}
        >
          <Alert severity="success">
            Account successfully created. Please check your email.
          </Alert>
        </Snackbar>
        <TextField
          required
          name="name"
          id="name"
          label="Username"
          min={3}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setIsFirstInteractionName(true)}
          placeholder="Hayman"
          error={nameError}
        />
        <TextField
          required
          name="email"
          id="email"
          label="Email"
          min={8}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setIsFirstInteractionEmail(true)}
          placeholder="example@email.com"
          error={emailError}
        />
        <TextField
          required
          name="password"
          id="password"
          label="Password"
          type="password"
          min={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setIsFirstInteractionPassword(true)}
          error={passwordError}
        />
        <TextField
          required
          name="confirm-password"
          id="confirm-password"
          label="Confirm password"
          type="password"
          min={8}
          value={confPass}
          onChange={(e) => setConfPass(e.target.value)}
          onBlur={() => setIsFirstInteractionConfPass(true)}
          error={confPassError}
        />

        <Box
          sx={{
            mt: { xs: '29px', md: '68px' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {mutation.status === 'pending' && (
            <Typography variant="caption">Loading...</Typography>
          )}
          <CustomButton
            size={isMobile ? 's' : 'l'}
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !!nameError ||
              !name ||
              !!emailError ||
              !email ||
              !!passwordError ||
              !password ||
              !!confPassError ||
              !confPass
            }
          >
            Sign Up
          </CustomButton>
          <Typography variant="caption">
            Already have an account?
            <Link
              sx={{
                marginLeft: { xs: '5px', md: '7px' },
              }}
              href="/auth/sign-in"
              color="primary"
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </Box>
    </form>
  );
}
