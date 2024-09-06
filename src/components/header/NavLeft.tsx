import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function NavLeft() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '44px',
      }}
    >
      <IconButton>
        <Image
          src="/logo.svg"
          width={isMobile ? 35 : 40}
          height={isMobile ? 26.5 : 30}
          alt="website logo"
        />
      </IconButton>
      {!isMobile && (
        <Link
          href="/"
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
