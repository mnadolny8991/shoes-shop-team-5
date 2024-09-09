'use client';

import { Box, useTheme, useMediaQuery } from '@mui/material';
import TextField from '../input/TextField';
import CustomButton from '../buttons/CustomButton';

export default function UpdateProfileForm() {
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
            marginTop: isMobile ? '7px' : '34px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <CustomButton
            size={isMobile ? 's' : 'm'}
            variant="contained"
            type="submit"
            sx={{ maxWidth: '150px', borderRadius: '8px' }}
          >
            Save Changes
          </CustomButton>
        </Box>
      </Box>
    </form>
  );
}
