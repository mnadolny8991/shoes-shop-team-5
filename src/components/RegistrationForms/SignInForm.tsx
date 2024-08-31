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

export default function SignInForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <Box maxWidth={isMobile ? 320 : 436}>
        <Stack spacing={2} mt={isMobile ? '25px' : '48px'}>
          <TextField
            value={email}
            onChange={(val: string) => setEmail(val)}
            required
            name="email"
            id="email"
            label="Email"
            min={8}
          />
          <TextField
            value={password}
            onChange={(val: string) => setPassword(val)}
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
          <Link variant="body2" href="/forgot-password">
            Forgot password?
          </Link>
        </Box>
        <CustomButton size={isMobile ? 's' : 'l'} variant="contained">
          Sign in
        </CustomButton>
      </Box>
    </form>
  );
}
