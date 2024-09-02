"use client";

import theme from "@/theme";
import { Grid, Box, Typography, useMediaQuery } from "@mui/material";
import Image from 'next/image'
import SignupForm from "@/components/SignupForm/SignupForm";
import SignupSlider from "@/components/SignupSlider/SignupSlider";


export default function Signup() {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const Logo = () => {
    return (
      <Image
        src="/logo.svg"
        width={isMobile ? 35 : 40}
        height={isMobile ? 26.5 : 30}
        alt="shoes shop logo"
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
            position: 'absolute',
            top: isMobile ? '20px' : '50px',
            left: isMobile ? '20px' : '40px',
          }}
        >
          <Logo />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            width: isMobile ? '320px' : '436px',
          }}
        >
          <Typography variant="h1" fontSize={isMobile ? "30px" : "45px"}>
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
