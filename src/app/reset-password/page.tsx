"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import backgroundImage from "../../../public/reset-password-backgroound.png";
import CustomButton from "@/components/Buttons/CustomButton";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function ResetPassword() {
  return (
    <Grid2 container style={{ height: "100vh" }}>
      <Grid2 xs={12} md={6}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: "436px",
            }}
          >
            <CustomButton size="l" variant="contained">
              Reset Password
            </CustomButton>
          </Box>
        </Box>
      </Grid2>
      <Grid2 xs={12} md={6}>
        <Box
          sx={{
            height: "100%",
            backgroundImage: `url(${backgroundImage.src})`,
            backgroundSize: "fill",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Grid2>
    </Grid2>
  );
}
