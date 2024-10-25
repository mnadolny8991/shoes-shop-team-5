import { Box, Paper, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import CustomButton from '../buttons/CustomButton';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type WelcomePageProps = {};

const WelcomePage: FC<WelcomePageProps> = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: '300px',
        position: 'relative',
      }}
    >
      <Paper>
        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '200px', md: '400px' },
            alignItems: 'center',
            gap: '30px',
          }}
        >
          <Typography variant="h1" width="100%" textAlign="center">
            Welcome
          </Typography>
          <Stack direction="row" gap="15px" width="100%">
            <CustomButton
              size="m"
              variant="contained"
              onClick={() => signIn('credentials')}
            >
              Sign In
            </CustomButton>
            <CustomButton
              size="m"
              variant="outlined"
              onClick={() => router.push('/catalog')}
            >
              Catalog
            </CustomButton>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default WelcomePage;
