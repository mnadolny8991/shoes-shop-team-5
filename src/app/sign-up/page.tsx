"use client";

import theme from "@/styles/theme";
import { Grid, Box, Typography, Divider, useMediaQuery } from "@mui/material";
import Image from 'next/image'
import SignupForm from "@/components/forms/SignupForm";
import SignupSlider from "@/components/sliders/SignupSlider";


export default function Signup() {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const Logo = () => {
    return (
      <Image
        src="/logo.svg"
        width={isMobile ? 35 : 40}
        height={isMobile ? 26.5 : 30}
        alt="shoes shop logo"
        style={{
          marginTop: isMobile ? '20px' : '50px',
          marginLeft: isMobile ? '20px' : '40px'
        }}
      />
    )
  }

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        xs={12} md={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Box
          sx={{
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Logo />
          {isMobile && (
            <Divider
              sx={{
                marginTop: '10px',
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            width: isMobile ? '320px' : '436px',
          }}
        >
          <Typography variant="h1">
            Create an account
          </Typography>
          <Typography variant="subtitle2">
            Create an account to get an easy access to your dream shopping
          </Typography>
          <SignupForm />
        </Box>
      </Grid >
      {!isMobile && <Grid
        xs={false}
        md={6}
        sx={{
          backgroundImage: "url(/signup-form-desktop-bg-image.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          padding: '16px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            mb: '252px',
          }}
        >
          <SignupSlider />
        </Box>
      </Grid>}
    </Grid>
  );
}
