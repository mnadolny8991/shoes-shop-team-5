'use client';

import {
  Avatar,
  Badge,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/input/SearchBar';
import SearchPopup from '@/components/header/SearchPopup';
import CustomButton from '@/components/buttons/CustomButton';
import PopupMenu from '@/components/header/PopupMenu';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/context/SearchContext';
import { signIn, useSession } from 'next-auth/react';
import { useAvatarQuery } from '@/hooks/useAvatarQuery';
import { useCartContext } from '@/context/CartContext';

export default function NavRight() {
  const [showMenu, setShowMenu] = useState(false);
  //const [searchText, setSearchText] = useState('');
  const [showSearchPopup, setShowSearchPopup] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const { data: session, status } = useSession();
  const {
    searchText,
    setSearchText,
    getSearchParams,
    getSearchParamsWithEmptyFilters,
  } = useSearch();
  const { data: avatar } = useAvatarQuery();

  const { amount } = useCartContext();
  const itemsInCart = amount.reduce((acc, curr) => acc + curr.amount, 0);

  const onSearchPopupSubmit = (query: string) => {
    setSearchSubmitted(true);
    setSearchText(query);
  };

  useEffect(() => {
    if (searchSubmitted) {
      router.push('/catalog?' + getSearchParamsWithEmptyFilters());
      setSearchSubmitted(false); // Reset submission state after navigating
    }
  }, [searchSubmitted, getSearchParamsWithEmptyFilters, router]);

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
        {status === 'authenticated' && !isMobile && (
          <IconButton onClick={() => router.push('/settings')}>
            <Avatar
              alt={avatar?.alt}
              src={avatar?.src}
              sx={{ width: 24, height: 24 }}
            />
          </IconButton>
        )}
        <IconButton onClick={() => router.push('/cart')}>
          <Badge badgeContent={itemsInCart} color="primary">
            <Image
              src="/bag.svg"
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
              alt="bag icon"
            />
          </Badge>
        </IconButton>
      </Box>
      <Box onClick={() => setShowSearchPopup(true)}>
        {isMobile ? (
          <IconButton>
            <Image
              src="/search-normal.svg"
              width={20}
              height={20}
              alt="search icon"
            />
          </IconButton>
        ) : (
          <SearchBar
            value={searchText}
            onChange={() => null}
            width={424}
            height={48}
            variant="header"
          />
        )}
      </Box>
      <SearchPopup
        show={showSearchPopup}
        close={() => setShowSearchPopup(false)}
        onSubmit={onSearchPopupSubmit}
      />
      {status === 'unauthenticated' && !isMobile && (
        <CustomButton
          size="l"
          variant="outlined"
          fullWidth={false}
          sx={{
            width: '145px',
          }}
          onClick={() => signIn()}
        >
          Sign In
        </CustomButton>
      )}
      {(isMobile && showMenu) && (
        <PopupMenu showMenu onMenuClose={() => setShowMenu(false)} />
      )}
    </Box>
  );
}
