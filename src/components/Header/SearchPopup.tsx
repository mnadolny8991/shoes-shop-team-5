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
          height: "419px"
        }
      }}>
      <IconButton
        onClick={close}
        sx={{
          zIndex: 10,
          position: "absolute",
          right: 24,
          top: 24,
          color: "#494949",
        }}>
        <CloseIcon sx={{ width: "20px", height: "20px" }} />
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
          alt="website logo" />
      </IconButton>
      <Box sx={{
        position: "absolute",
        top: 45,
        left: "50%",
        transform: "translateX(-50%)",
      }}>
        <SearchBar
          value={searchText}
          onChange={(val: string) => onTextChange(val)}
          width={isMobile ? 290 : 1071}
          height={isMobile ? 25 : 79} />
      </Box>
    </Drawer>
  );
}