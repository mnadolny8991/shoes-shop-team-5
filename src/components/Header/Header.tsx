"use client";
import { useTheme } from '@mui/material/styles';
import { 
  Typography, 
  Divider, 
  Container,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import useMediaQuery from '@mui/material/useMediaQuery';

type HeaderProps = {
  signedIn: boolean;
}

const NavbarContainer = styled(Toolbar)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  height: 120,
  padding: 0,
  marginLeft: 40,
  marginRight: 40,
  [theme.breakpoints.down('sm')]: {
    height: 58.87,
    marginLeft: 20,
    marginRight: 20,
  }
}));

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
  const theme = useTheme();
  const isAboveSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
      }}
      disableGutters={true}>
      <Image
        src="/bag.svg"
        width={isAboveSm ? 24 : 20}
        height={isAboveSm ? 24 : 20} 
        alt="website logo"/>
    </Container>
  );
}