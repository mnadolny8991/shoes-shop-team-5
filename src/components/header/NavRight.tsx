import {
  Avatar,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/input/SearchBar';
import SearchPopup from '@/components/header/SearchPopup';
import CustomButton from '@/components/buttons/CustomButton';
import PopupMenu from '@/components/header/PopupMenu';
import { useRouter } from 'next/navigation';

export default function NavRight() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSearchPopup, setShowSearchPopup] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const signedIn = true; // auth context here

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        gap: { xs: '20px', md: '40px' },
      }}
    >
      {isMobile && (
        <IconButton onClick={() => setShowMenu(true)}>
          <Image
            src="/hamburger-icon.svg"
            width={20}
            height={20}
            alt="menu icon"
          />
        </IconButton>
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: { xs: 'row', md: 'row-reverse' },
          gap: '16px',
        }}
      >
        {signedIn && !isMobile && (
          <IconButton onClick={() => router.push('/settings')}>
            <Avatar
              alt="Remy Sharp"
              src="/avatar.svg"
              sx={{ width: 24, height: 24 }}
            />
          </IconButton>
        )}
        <IconButton onClick={() => router.push('/cart')}>
          <Image
            src="/bag.svg"
            width={isMobile ? 20 : 24}
            height={isMobile ? 20 : 24}
            alt="bag icon"
          />
        </IconButton>
      </Box>
      <Box onClick={() => setShowSearchPopup(true)}>
        {isMobile ? (
          <IconButton>
            <Image
              src="/search-normal.svg"
              width={20}
              height={20}
              alt="website logo"
            />
          </IconButton>
        ) : (
          <SearchBar
            value={searchText}
            onChange={(val: string) => setSearchText(val)}
            width={424}
            height={48}
            variant="header"
          />
        )}
      </Box>
      <SearchPopup
        show={showSearchPopup}
        close={() => setShowSearchPopup(false)}
        searchText={searchText}
        onTextChange={(val: string) => setSearchText(val)}
      />
      {!signedIn && !isMobile && (
        <CustomButton
          size="l"
          variant="outlined"
          fullWidth={false}
          sx={{
            width: '145px',
          }}
        >
          Sign In
        </CustomButton>
      )}
      {isMobile && showMenu && (
        <PopupMenu signedIn showMenu onMenuClose={() => setShowMenu(false)} />
      )}
    </Box>
  );
}
