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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMobile ? 'center' : 'flex-start',
        marginLeft: isMobile ? '26px' : '60px',
        marginTop: isMobile ? '25px' : 0,
        marginBottom: '50px',
      }}>
      <Box
        sx={{
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
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: isMobile ? '10px' : '33px',
            marginBottom: isMobile ? '10px' : '47px',
            maxWidth: isMobile ? '245px' : '370px',
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
              gap: isMobile ? '15px' : '23px',
            }}
          >
            <CustomButton size={isMobile ? 's' : 'm'} variant='outlined' sx={{ borderRadius: '8px' }}>
              Change photo
            </CustomButton>
            <CustomButton size={isMobile ? 's' : 'm'} variant='contained' sx={{ borderRadius: '8px' }}>
              Delete
            </CustomButton>
          </Box>
        </Box>
        <Typography
          variant="subtitle2"
          sx={{
            marginBottom: isMobile ? '0px' : '23px',
          }}
        >
          Welcome back! Please enter your details to log into your account.
        </Typography>
        <UpdateProfileForm />
      </Box>
    </Box>
  );
}