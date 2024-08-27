"use client";
import { useTheme } from '@mui/material/styles';
import { 
  Typography, 
  Divider, 
  Container,
  AppBar,
  Toolbar,
  Box,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchBar from '../SearchBar/SearchBar';
import CustomButton from '../Buttons/CustomButton';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <AppBar 
        position="static"
        color="transparent">
        <Toolbar 
          disableGutters={true}
          sx={{
            margin: 0,
            height: isMobile ? "59px" : "120px",
            px: isMobile ? "20px" : "40px",
            justifyContent: "space-between",
          }}>
          <NavLeft />
          <NavRight />
        </Toolbar>
      </AppBar>
    </>
  );
}

function NavLeft() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "44px"
      }}>
      <Image
        src="/logo.svg"
        width={isMobile ? 35 : 40}
        height={isMobile ? 26.5 : 30} 
        alt="website logo"/>
      { !isMobile && 
        <Typography sx={{
          fontSize: 16,
          fontWeight: "500",
          lineHeight: "18.77px"
        }}>
          Products
        </Typography>
      }
    </Box>
  );
}

function NavRight() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const signedIn = true; // auth context here

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
        gap: "40px"
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row-reverse",
          gap: "16px"
        }}>
        { signedIn && <Avatar alt="Remy Sharp" src="/avatar.svg" sx={{ width: 24, height: 24 }}/> }
        <Image
          src="/bag.svg"
          width={isMobile ? 20 : 24}
          height={isMobile ? 20 : 24} 
          alt="website logo"/>
      </Box>
      <SearchBar />
      <CustomButton size="l" variant="outlined" fullWidth={false} sx={{
        width: "145px",
      }}>Sign In</CustomButton>
    </Box>
  );
}