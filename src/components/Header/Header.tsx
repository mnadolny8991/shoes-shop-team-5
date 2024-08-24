"use client";
import { useTheme } from '@mui/material/styles';
import {
  AppBar, 
  Typography, 
  Divider, 
  Container,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

type HeaderProps = {
  signedIn: boolean;
}

const NavbarContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  height: 120,
  marginLeft: 40,
  marginRight: 40,
  [theme.breakpoints.down('sm')]: {
    height: 58.87,
    marginLeft: 20,
    marginRight: 20,
  }
}));

export default function Header() {
  return (
    <header>
      <NavbarContainer
        disableGutters={true}>
        <NavLeft />
        <NavRight />
      </NavbarContainer>
      <Divider sx={{ color: "#EAECF0" }}/>
    </header>
  );
}

function NavLeft() {
  const theme = useTheme();
  const isAboveSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "44px"
      }}
      disableGutters={true}>
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
    </Container>
  );
}

function NavRight() {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center"
      }}
      disableGutters={true}>

    </Container>
  );
}