import { Box, Drawer, IconButton, List, ListItem, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import SearchBar from "../SearchBar/SearchBar";
import { useRef } from "react";

const popularSearchTerms = [
  {
    id: 1,
    value: "Nike Air Force 1 LV8"
  },
  {
    id: 2,  
    value: "Nike Air Force 1"
  },
  {
    id: 3,
    value: "Nike Air Force 1 '07 High"
  }
];

type SearchPopupProps = {
  show: boolean;
  close: () => void;
  searchText: string;
  onTextChange: (val: string) => void;
};

export default function SearchPopup({
  show,
  close,
  searchText,
  onTextChange
}: SearchPopupProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Drawer
      anchor="top"
      open={show}
      sx={{
        "& .MuiDrawer-paper": {
          width: "100%",
          height: isMobile ? "196px" : "419px",
        }
      }}>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        padding: "40px",
        paddingTop: "45px",
        alignItems: isMobile ? "center" : "start",
      }}>
        {
          !isMobile &&
          <IconButton>
            <Image
              src="/logo.svg"
              width={40}
              height={30}
              alt="website logo" />
          </IconButton>
        }
        <Stack gap="40px">
          <SearchBar
            value={searchText}
            onChange={(val: string) => onTextChange(val)}
            width={isMobile ? "290px" : "700px"}
            height={isMobile ? "25px" : "79px"}
            variant={isMobile ? "popupMobile" : "popupLarge"} />
            { !isMobile && 
            <Stack gap="24px">
              <Typography sx={{ fontWeight: "500", fontSize: "20px", lineHeight: "23.5px", color: "text.secondary" }}>
                Popular Search Terms
              </Typography>
              {
                popularSearchTerms.map(term => 
                  <Typography 
                    key={term.id}
                    sx={{ fontWeight: "500", fontSize: "22px", lineHeight: "25.81px", color: "text.primary" }}>
                    {term.value}
                  </Typography>
                )
              }
            </Stack>}
        </Stack>
        <IconButton
          onClick={close}
          sx={{
            color: "#494949",
          }}>
          <CloseIcon sx={{ width: isMobile ? "15px" : "24px", height: isMobile ? "15px" : "24px" }} />
        </IconButton>
      </Box>
    </Drawer>
  );
}