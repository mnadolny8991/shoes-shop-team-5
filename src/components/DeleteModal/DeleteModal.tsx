"use client";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../Buttons/CustomButton";
import theme from "@/theme";
import { Dispatch, SetStateAction } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onDelete: () => void;
};

export default function DeleteModal({ isOpen, setIsOpen }: Props) {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: isMobile ? "320px" : "656px",
          },
        },
      }}
    >
      <DialogTitle>
        <Typography
          fontWeight="500"
          fontSize={isMobile ? "30px" : "45px"}
          lineHeight={isMobile ? "35px" : "53px"}
        >
          Are you sure to delete selected item
        </Typography>
      </DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "#2F2E2D",
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Typography variant="body2" color={theme.palette.text.secondary}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
          perspiciatis in a quas doloribus impedit esse assumenda ut ratione,
          asperiores fuga maiores tempora ad atque inventore dolore consequatur
          soluta recusandae.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: "20px 24px" }}>
        <CustomButton
          size={isMobile ? "m" : "xl"}
          variant="outlined"
          onClick={handleClose}
        >
          Cancel
        </CustomButton>
        <CustomButton size={isMobile ? "m" : "xl"} variant="contained">
          Delete
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
