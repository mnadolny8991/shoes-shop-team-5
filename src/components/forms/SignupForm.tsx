'use client';

import { Box, Typography, Link, useTheme, useMediaQuery } from '@mui/material';
import TextField from '../input/TextField';
import CustomButton from '../buttons/CustomButton';

export default function SignupForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <form>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: isMobile ? '320px' : '436px',
          gap: '22px',
        }}
      >
        <TextField
          required
          name="name"
          id="name"
          label="Name"
          min={8}
          value={''}
          onChange={() => { }}
        />
        <TextField
          required
          name="email"
          id="email"
          label="Email"
          min={8}
          value={''}
          onChange={() => { }}
        />
        <TextField
          required
          name="password"
          id="password"
          label="Password"
          min={8}
          value={''}
          onChange={() => { }}
        />
        <TextField
          required
          name="confirm-password"
          id="confirm-password"
          label="Confirm password"
          min={8}
          value={''}
          onChange={() => { }}
        />

        <Box
          sx={{
            marginTop: isMobile ? '29px' : '68px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <CustomButton
            size={isMobile ? 's' : 'l'}
            variant="contained"
            type="submit"
          >
            Sign Up
          </CustomButton>
          <Typography variant="caption">
            Already have an account?
            <Link
              sx={{
                marginLeft: isMobile ? '5px' : '7px',
              }}
              href="/sign-in"
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