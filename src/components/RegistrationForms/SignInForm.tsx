import {
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CustomButton from '../Buttons/CustomButton';
import TextField from '../InputField/TextField';
import { useState } from 'react';
import useValidate from '@/app/Hooks/useValidate';

export default function SignInForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { values, errors, handleChange, handleFirstInteraction } =
    useValidate();

  return (
    <form>
      <Box maxWidth={isMobile ? 320 : 436}>
        <Stack spacing={2} mt={isMobile ? '25px' : '48px'}>
          <TextField
            value={values.email}
            onBlur={(e) => handleFirstInteraction(e)}
            onChange={(e) => handleChange(e)}
            required
            name="email"
            id="email"
            label="Email"
            min={8}
            error={errors.email!}
          />
          <TextField
            value={values.password}
            onBlur={(e) => handleFirstInteraction(e)}
            onChange={(e) => handleChange(e)}
            required
            password
            name="password"
            id="password"
            label="Password"
            min={8}
          />
        </Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: isMobile ? '12px' : '16px',
            marginBottom: isMobile ? '30px' : '56px',
          }}
        >
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
            slotProps={{ typography: { variant: 'body2' } }}
          />
          <Link variant="body2" href="/forgot_password">
            Forgot password?
          </Link>
        </Box>
        <CustomButton
          size={isMobile ? 's' : 'l'}
          variant="contained"
          disabled={
            !!errors.email ||
            !values.email ||
            !!errors.password ||
            !values.password
          }
        >
          Sign in
        </CustomButton>
      </Box>
    </form>
  );
}
