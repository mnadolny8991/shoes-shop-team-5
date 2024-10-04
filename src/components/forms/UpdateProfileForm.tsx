'use client';
import { MouseEventHandler, useEffect, useState } from 'react';
import { Box, useTheme, useMediaQuery, Snackbar, Alert } from '@mui/material';
import TextField from '@/components/input/TextField';
import CustomButton from '@/components/buttons/CustomButton';
import useValidate from '@/hooks/useValidate';
import {
  emailValidator,
  nameValidator,
  phoneValidator,
} from '@/lib/validators';
import { useSession } from 'next-auth/react';
import useUserData from '@/hooks/useUserData';
import useUpdateUserDataMutation from '@/hooks/useUpdateUserDataMutation';

export default function UpdateProfileForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: session } = useSession();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isFirstInteractionFirstName, setIsFirstInteractionFirstName] =
    useState(false);
  const [isFirstInteractionLastName, setIsFirstInteractionLastName] =
    useState(false);
  const [isFirstInteractionEmail, setIsFirstInteractionEmail] = useState(false);
  const [isFirstInteractionPhone, setIsFirstInteractionPhone] = useState(false);

  const { error: firstNameError } = useValidate(
    firstName,
    nameValidator,
    isFirstInteractionFirstName
  );
  const { error: lastNameError } = useValidate(
    lastName,
    nameValidator,
    isFirstInteractionLastName
  );
  const { error: emailError } = useValidate(
    email,
    emailValidator,
    isFirstInteractionEmail
  );
  const { error: phoneError } = useValidate(
    phoneNumber,
    phoneValidator,
    isFirstInteractionPhone
  );

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );
  const { data, status } = useUserData(session?.id!, session?.accessToken!);

  useEffect(() => {
    if (status === 'success') {
      setFirstName(data.firstName ?? '');
      setLastName(data.lastName ?? '');
      setPhoneNumber(data.phoneNumber ?? '');
      setEmail(data.email);
    }
  }, [data, status]);

  const mutation = useUpdateUserDataMutation(session?.id!, session?.accessToken!);
  useEffect(() => {
    switch (mutation.status) {
      case 'success':
        setSnackbarMessage('Profile updated successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        break;
      case 'error':
        setSnackbarMessage(`Failed to update profile: ${mutation.error.message}`);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        break;
    }
  }, [mutation.status, mutation.error]);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    mutation.mutate({
      firstName,
      lastName,
      email,
      phoneNumber,
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
        <TextField
          value={firstName}
          onBlur={(e) => setIsFirstInteractionFirstName(true)}
          onChange={(e) => setFirstName(e.target.value)}
          required
          type="text"
          name="name"
          id="name"
          label="Name"
          min={8}
          error={firstNameError!}
        />
        <TextField
          value={lastName}
          onBlur={(e) => setIsFirstInteractionLastName(true)}
          onChange={(e) => setLastName(e.target.value)}
          required
          type="text"
          name="lastName"
          id="lastName"
          label="Surname"
          min={8}
          error={lastNameError}
        />
        <TextField
          value={email}
          onBlur={(e) => setIsFirstInteractionEmail(true)}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="text"
          name="email"
          id="email"
          label="Email"
          disabled={true}
          min={8}
          error={emailError}
        />
        <TextField
          value={phoneNumber}
          onBlur={(e) => setIsFirstInteractionPhone(true)}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          type="text"
          name="phone"
          id="phone"
          label="Phone"
          min={8}
          error={phoneError}
        />
        <Box
          sx={{
            marginTop: { sx: '7px', md: '34px' },
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <CustomButton
            size={isMobile ? 's' : 'm'}
            onClick={handleSubmit}
            variant="contained"
            type="submit"
            sx={{ maxWidth: '150px', borderRadius: '8px' }}
            disabled={
              !!firstNameError ||
              !firstName ||
              !!lastNameError ||
              !lastName ||
              !!emailError ||
              !email ||
              !!phoneError ||
              !phoneNumber
            }
          >
            Save Changes
          </CustomButton>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
}
