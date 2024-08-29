"use client";
import { useTheme } from '@mui/material/styles';
import { 
  Typography, 
  AppBar,
  Toolbar,
  Box,
  Avatar,
  IconButton,
  Drawer,
  Container,
} from "@mui/material";
import Image from "next/image";
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchBar from '../SearchBar/SearchBar';
import CustomButton from '../Buttons/CustomButton';
import Link from "next/link";
import { useState } from "react";
import PopupMenu from "./PopupMenu";
import CloseIcon from "@mui/icons-material/Close";

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
      <IconButton>
        <Image
          src="/logo.svg"
          width={isMobile ? 35 : 40}
          height={isMobile ? 26.5 : 30} 
          alt="website logo"/>
      </IconButton>
      { !isMobile && 
        <Link href="/" style={{ textDecoration: "none", color: theme.palette.text.primary }}>
          <Typography sx={{
            fontSize: 16,
            fontWeight: "500",
            lineHeight: "18.77px"
          }}>
            Products
          </Typography>
        </Link>
      }
    </Box>
  );
}

function NavRight() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showSearchPopup, setShowSearchPopup] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const signedIn = false; // auth context here

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
        gap: isMobile ? "20px" : "40px"
      }}>
      { 
        isMobile && 
          <IconButton onClick={() => setShowMenu(true)}>
            <Image
              src="/hamburger-icon.svg"
              width={20}
              height={20} 
              alt="menu icon"/> 
          </IconButton>
      }
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: isMobile ? "row" : "row-reverse",
          gap: "16px"
        }}>
        { 
          (signedIn && !isMobile) && 
            <IconButton>
              <Avatar alt="Remy Sharp" src="/avatar.svg" sx={{ width: 24, height: 24 }}/>
            </IconButton>
        }
        <IconButton>
          <Image
            src="/bag.svg"
            width={isMobile ? 20 : 24}
            height={isMobile ? 20 : 24} 
            alt="bag icon"/>
        </IconButton>
      </Box>
      <Box onClick={() => setShowSearchPopup(true)}>
        { 
          isMobile ? 
            <IconButton>
              <Image
                src="/search-normal.svg"
                width={20}
                height={20} 
                alt="website logo"/> 
            </IconButton>
            : 
            <SearchBar value={searchText} onChange={(val: string) => setSearchText(val)}/>
        }
      </Box>
      <Drawer
        anchor="top"
        open={showSearchPopup}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            height: "419px"
          }
      }}>
        <IconButton
          onClick={() => setShowSearchPopup(false)}
          sx={{
            zIndex: 10,
            position: "absolute",
            right: 24,
            top: 24,
            color: "#494949",
          }}>
          <CloseIcon sx={{ width: "20px", height: "20px" }}/>
        </IconButton>
        <IconButton sx={{
          position: "absolute",
          left: 24,
          top: 24,
        }}>
          <Image
            src="/logo.svg"
            width={isMobile ? 35 : 40}
            height={isMobile ? 26.5 : 30} 
            alt="website logo"/>
        </IconButton>
        <Box sx={{
          position: "absolute",
          top: 45,
          left: "50%",
          transform: "translateX(-50%)",
        }}>
          <SearchBar value={searchText} onChange={(val: string) => setSearchText(val)}/>
        </Box>
      </Drawer>
      {
        (!signedIn && !isMobile) && 
          <CustomButton 
            size="l" 
            variant="outlined" 
            fullWidth={false} 
            sx={{
              width: "145px",
            }}>
            Sign In
          </CustomButton>
      }
      {
        (isMobile && showMenu) &&
          <PopupMenu 
            signedIn 
            showMenu 
            onMenuClose={() => setShowMenu(false)} />
      }
    </Box>
  );
}