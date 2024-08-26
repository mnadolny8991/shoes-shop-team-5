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

export default function DeleteModal() {
  return (
    <Dialog open={true}>
      <DialogTitle>
        <Typography variant="h2" fontWeight="500" fontSize="45px">
          Are you sure to delete selected item
        </Typography>
      </DialogTitle>
      <IconButton
        onClick={() => null}
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
        <CustomButton size="xl" variant="outlined">
          Cancel
        </CustomButton>
        <CustomButton size="xl" variant="contained">
          Delete
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
