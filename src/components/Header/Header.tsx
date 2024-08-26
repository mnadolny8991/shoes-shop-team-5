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

export default function Header() {
  const theme = useTheme();
  const isAboveSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <AppBar 
        position="static"
        color="transparent">
        <Toolbar 
          disableGutters={true}
          sx={{
            margin: 0,
            height: isAboveSm ? 120 : 59,
            px: isAboveSm ? "40px" : "20px",
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
  const isAboveSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "44px"
      }}>
      <Image
        src="/logo.svg"
        width={isAboveSm ? 40 : 35}
        height={isAboveSm ? 30 : 26.5} 
        alt="website logo"/>
      { isAboveSm && 
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
  const isAboveSm = useMediaQuery(theme.breakpoints.up('sm'));
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
          width={isAboveSm ? 24 : 20}
          height={isAboveSm ? 24 : 20} 
          alt="website logo"/>
      </Box>
      <SearchBar />
    </Box>
  );
}