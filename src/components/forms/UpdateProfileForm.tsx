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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          ></Box>
        </Box>
        <TextField
          required
          name="name"
          id="name"
          label="Name"
          type="text"
          min={8}
          value={''}
          onChange={() => {}}
        />
        <TextField
          required
          name="surname"
          id="surname"
          label="Surname"
          type="text"
          min={8}
          value={''}
          onChange={() => {}}
        />
        <TextField
          required
          name="email"
          id="email"
          label="Email"
          type="text"
          min={8}
          value={''}
          onChange={() => {}}
        />
        <TextField
          required
          name="phone"
          id="phone"
          type="text"
          label="Phone number"
          min={8}
          value={''}
          onChange={() => {}}
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
            Save Changes
          </CustomButton>
        </Box>
      </Box>
    </form>
  );
}
