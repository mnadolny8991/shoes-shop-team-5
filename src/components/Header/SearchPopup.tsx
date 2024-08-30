import { Box, Drawer, IconButton, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import SearchBar from "../SearchBar/SearchBar";

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
        padding: "20px",
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
        <SearchBar
          value={searchText}
          onChange={(val: string) => onTextChange(val)}
          width={isMobile ? "290px" : "700px"}
          height={isMobile ? "25px" : "79px"}
          variant={isMobile ? "popupMobile" : "popupLarge"} />
        <IconButton
          onClick={close}
          sx={{
            color: "#494949",
          }}>
          <CloseIcon sx={{ width: "15px", height: "15px" }} />
        </IconButton>
      </Box>
    </Drawer>
  );
}