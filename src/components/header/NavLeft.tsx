'use client';

import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { Logo } from '../logo/Logo';

export default function NavLeft() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '44px',
      }}
    >
      <Logo />
      {!isMobile && (
        <Link
          href="/catalog"
          style={{ textDecoration: 'none', color: theme.palette.text.primary }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: '500',
              lineHeight: '18.77px',
            }}
          >
            Products
          </Typography>
        </Link>
      )}
    </Box>
  );
}
