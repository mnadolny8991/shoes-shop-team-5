"use client";

import theme from "@/theme";
import { Box, Typography, Avatar, useMediaQuery } from "@mui/material";
import Image from 'next/image'
import CustomButton from "@/components/buttons/CustomButton";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";


export default function UserSettings() {
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
    <>
      <Box
        sx={{
          height: '100vh',
          maxWidth: "460px",
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h1">
          My Profile
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Avatar
            alt="Jane Meldrum"
            src="/jane-meldrum.png"
            sx={{
              width: isMobile ? 100 : 150,
              height: isMobile ? 100 : 150,
              border: '4px solid white',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CustomButton size={isMobile ? 's' : 'l'} variant='contained'>
              Change photo
            </CustomButton>
            <CustomButton size={isMobile ? 's' : 'l'} variant='contained'>
              Delete
            </CustomButton>
          </Box>
        </Box>
        <Typography variant="subtitle2">
          Welcome back! Please enter your details to log into your account.
        </Typography>
        <UpdateProfileForm />
      </Box>
    </>
  );
}