'use client';

import { Box, Typography, useMediaQuery } from '@mui/material';
import backgroundImage from '../../../public/reset-password-backgroound.png';
import CustomButton from '@/components/Buttons/CustomButton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import theme from '@/theme';
import TextField from '@/components/InputField/TextField';
import Link from 'next/link';
import useValidate from '../Hooks/useValidate';

export default function ResetPassword() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { values, errors, handleChange, handleFirstInteraction } =
    useValidate();

  return (
    <Grid2 container style={{ height: '100vh' }}>
      <Grid2 xs={12} md={6}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              width: isMobile ? '320px' : '436px',
            }}
          >
            <Typography variant="h1" fontSize={isMobile ? '30px' : '45px'}>
              Reset password
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              Please create new password here
            </Typography>
            <TextField
              value={values.password}
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleFirstInteraction(e)}
              required
              password
              name="password"
              id="password"
              label="Password"
              min={8}
              error={errors.password!}
            />
            <TextField
              value={values.confirmPassword}
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleFirstInteraction(e)}
              required
              password
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm password"
              min={8}
              error={errors.confirmPassword!}
            />
            <CustomButton
              size={isMobile ? 's' : 'l'}
              variant="contained"
              disabled={
                !!errors.password ||
                !values.password ||
                !!errors.confirmPassword ||
                !values.confirmPassword
              }
            >
              Reset Password
            </CustomButton>
            <Typography
              variant="caption"
              fontSize={isMobile ? '11.15px' : '15px'}
              textAlign="center"
            >
              <Link href="/login">Back to log in</Link>
            </Typography>
          </Box>
        </Box>
      </Grid2>
      {!isMobile && (
        <Grid2 md={6}>
          <Box
            sx={{
              height: '100%',
              backgroundImage: `url(${backgroundImage.src})`,
              backgroundSize: 'fill',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </Grid2>
      )}
    </Grid2>
  );
}
