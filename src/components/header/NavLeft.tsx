'use client';

import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '../logo/Logo';

export default function NavLeft() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

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
