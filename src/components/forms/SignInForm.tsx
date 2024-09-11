import {
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CustomButton from '@/components/buttons/CustomButton';
import TextField from '@/components/input/TextField';
import { useState } from 'react';
import useValidate from '@/hooks/useValidate';
import { emailValidator, passwordValidator } from '@/lib/validators';

export default function SignInForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isFirstInteractionEmail, setIsFirstInteractionEmail] = useState(false);
  const [isFirstInteractionPassword, setIsFirstInteractionPass] =
    useState(false);

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

  return (
    <form>
      <Box maxWidth={{ xs: 320, md: 436 }}>
        <Stack spacing={2} mt={{ xs: '25px', md: '48px' }}>
          <TextField
            value={email}
            onBlur={(e) => setIsFirstInteractionEmail(true)}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="text"
            name="email"
            id="email"
            label="Email"
            min={8}
            error={emailError!}
          />
          <TextField
            value={password}
            onBlur={(e) => setIsFirstInteractionPass(true)}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            name="password"
            id="password"
            label="Password"
            min={8}
            error={passwordError}
          />
        </Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: { xs: '12px', md: '16px' },
            marginBottom: { xs: '30px', md: '56px' },
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
        <CustomButton
          size={isMobile ? 's' : 'l'}
          variant="contained"
          disabled={!!emailError || !email || !!passwordError || !password}
        >
          Sign in
        </CustomButton>
      </Box>
    </form>
  );
}
