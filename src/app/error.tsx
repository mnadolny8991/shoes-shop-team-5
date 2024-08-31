"use client"

import GoBackAndHomeButtonsStack from "@/components/Buttons/GoBackAndHomeButtonsStack"
import { Stack, styled, Typography, useMediaQuery, useTheme } from "@mui/material"
import Image from "next/image"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const ImageMessageContainer = styled('div')(({ theme }) => ({
    ...isMobile && {
      position: 'relative',
      height: 443,
      width: '100%',
      padding: '5%',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      textAlign: 'center',
    },
    '& p': {
      fontSize: isMobile ? 12 : 20,
      fontWeight: 500,
      lineHeight: isMobile ? '17.2px' : '28.66px',
      color: isMobile ? theme.palette.primary.contrastText : theme.palette.text.secondary
    },
    '& img': {
      zIndex: -1,
      ...isMobile ? {
        objectPosition: '70% 50%',
        objectFit: 'cover'
      } : {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: 'auto'
      }
    }
  }))

  return (
    <Stack sx={isMobile ? { 'alignItems': 'center' } : { 'position': 'relative', 'padding': '10%' }}>
      <Typography variant="h1" mt={'43px'} mb={isMobile ? 2 : 3}>
        We lost that page...
      </Typography>
      <ImageMessageContainer>
        <Image
          alt="sebastian svenson unsplash"
          src="/sebastian-svenson-LpbyDENbQQg-unsplash.png"
          quality={100}
          {...isMobile ? { fill: true } : { width: 4096, height: 2013, sizes: '100vw' }}
        />
        <Typography>The error occurred! Error message: {error.message}</Typography>
      </ImageMessageContainer>
      <GoBackAndHomeButtonsStack />
    </Stack>
  )
}