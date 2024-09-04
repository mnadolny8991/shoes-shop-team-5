'use client';

import UserPagesList from '@/components/nav/UserPagesList';
import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
  Stack,
  Avatar,
  styled,
} from '@mui/material';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const WelcomeUser = styled(Typography)(() => ({
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '18px',
    color: '#98A2B3',
    marginBottom: 4,
  }));

  const UserName = styled(Typography)(() => ({
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '18.77px',
  }));

  return (
    <Stack
      {...(!isMobile && {
        direction: 'row',
        spacing: '40px',
        px: '40px',
        pt: '40px',
      })}
    >
      {!isMobile && (
        <Stack
          width="320px"
          spacing={4}
          position="sticky"
          top="40px"
          alignSelf="start"
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Avatar
              alt="Jane Meldrum"
              src="/jane-meldrum.png"
              sx={{ width: 64, height: 64 }}
            />
            <Box>
              <WelcomeUser>Welcome</WelcomeUser>
              <UserName>Jane Meldrum</UserName>
            </Box>
          </Box>
          <Divider />
          <UserPagesList />
        </Stack>
      )}
      <Box component={'main'} flex={'auto'}>
        {children}
      </Box>
    </Stack>
  );
}
