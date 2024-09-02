"use client";

import { Box, Typography, Rating } from "@mui/material";
import CustomButton from "../Buttons/CustomButton";

export default function SignupSlider() {

  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: '756px',
        gap: '10px',
        border: '2px solid',
        borderImageSource: `
          linear-gradient(180deg, rgba(0, 0, 0, 0.074) 0%, rgba(0, 0, 0, 0) 23.44%, rgba(0, 0, 0, 0.086) 43.75%, rgba(0, 0, 0, 0) 79.17%, rgba(0, 0, 0, 0) 96.35%)
        `,
        borderImageSlice: 1,
        borderRadius: '32px',
        background: `
          radial-gradient(64.9% 185.04% at 19.81% 27.89%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.06) 100%),
          radial-gradient(55.99% 112.1% at 69.71% 44.01%, rgba(253, 253, 253, 0.074) 0%, rgba(0, 0, 0, 0) 100%)
        `,
        paddingTop: '56px',
        paddingRight: '40px',
        paddingBottom: '40px',
        paddingLeft: '68px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Typography
          variant='body1'>
          "Lorem Ipsum is a really great company because the team is passionate about the projects they produce, the people they work with, the quality of the work they do."
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Typography
            variant='body1'
            sx={{
              fontWeight: '600',
              fontSize: '25px',
            }}
          >
            "John Stone"
          </Typography>
          <Rating name="read-only" value={5} readOnly />
        </Box>
        <Typography
          sx={{
            fontSize: '18px',
          }}
          variant='subtitle2'
        >
          "Ukraine, Chernivtsi"
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
        }}
      >
        <Box
          sx={{
            cursor: 'pointer',
            width: '38px',
            height: '38px',
            backgroundImage: "url(/signup-review-left-arrow.png)",
            backgroundPosition: 'center',
            backgroundSize: '8px',
            backgroundRepeat: 'no-repeat',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #d7d2d5'
          }}
        />
        <Box
          sx={{
            cursor: 'pointer',
            width: '38px',
            height: '38px',
            backgroundImage: "url(/signup-review-right-arrow.png)",
            backgroundPosition: 'center',
            backgroundSize: '8px',
            backgroundRepeat: 'no-repeat',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #d7d2d5'
          }}
        >
        </Box>
      </Box>
    </Box >
  )
}