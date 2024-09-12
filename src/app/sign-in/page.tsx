'use client';
import Image from 'next/image';
import SignInForm from '@/components/forms/SignInForm';
import {
  Box,
  Divider,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export default function SignIn() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack direction="row">
      <Box sx={{ flex: 1 }}>
        <Link
          href="/"
          mt={{ xs: '18px', md: '50px' }}
          ml={{ xs: '20px', md: '40px' }}
          display="inline-block"
        >
          <Image
            src="/logo.svg"
            width={isMobile ? 35 : 40}
            height={isMobile ? 26.5 : 30}
            alt="website logo"
          />
        </Link>
        {isMobile && <Divider />}
        <Box
          margin={{
            xs: '35px  calc((100vw - 320px) / 2)',
            md: '20% calc((50vw - 436px) / 3)',
          }}
        >
          <Typography variant="h1">Welcome back</Typography>
          <Typography variant="subtitle2">
            Welcome back! Please enter your details to log into your account.
          </Typography>
          <SignInForm />
          <Typography
            mt={{ xs: '16px', md: '24px' }}
            maxWidth={{ xs: 320, md: 436 }}
            align="center"
            variant="body2"
          >
            Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
          </Typography>
        </Box>
      </Box>
      {!isMobile && (
        <Box sx={{ flex: 1 }}>
          <Image
            alt="pexels-melvin-buezo"
            src="/pexels-melvin-buezo-2529148.png"
            sizes="50vw"
            width={960}
            height={1112}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Box>
      )}
    </Stack>
  );
}
