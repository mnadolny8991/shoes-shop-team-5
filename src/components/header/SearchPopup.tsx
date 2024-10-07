'use client';

import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import SearchBar from '@/components/input/SearchBar';
import { useEffect, useRef, useState } from 'react';
import popularSearchTerms from '@/mock/popularSearchTerms';
import { useRouter } from 'next/navigation';

type SearchPopupProps = {
  show: boolean;
  close: () => void;
  onSubmit: (val: string) => void;
};

export default function SearchPopup({
  show,
  close,
  onSubmit,
}: SearchPopupProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (show) {
      var i = setTimeout(() => searchRef.current?.focus(), 100);
    }
    return () => {
      clearTimeout(i);
    };
  }, [show]);

  const handleSearch = () => {
    close();
    onSubmit(searchText);
  };

  return (
    <Drawer
      anchor="top"
      open={show}
      sx={{
        '& .MuiDrawer-paper': {
          width: '100%',
          height: { xs: '196px', md: '419px' },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          padding: '40px',
          paddingTop: '45px',
          alignItems: { xs: 'center', md: 'start' },
        }}
      >
        {!isMobile && (
          <IconButton>
            <Image src="/logo.svg" width={40} height={30} alt="website logo" />
          </IconButton>
        )}
        <Stack gap="40px">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <SearchBar
              withErase
              ref={searchRef}
              value={searchText}
              onChange={(val: string) => setSearchText(val)}
              width={isMobile ? '290px' : '700px'}
              height={isMobile ? '25px' : '79px'}
              variant={isMobile ? 'popupMobile' : 'popupLarge'}
              onIconClick={handleSearch}
            />
          </form>
          {!isMobile && (
            <Stack gap="24px">
              <Typography
                sx={{
                  fontWeight: '500',
                  fontSize: '20px',
                  lineHeight: '23.5px',
                  color: 'text.secondary',
                }}
              >
                Popular Search Terms
              </Typography>
              {popularSearchTerms.map((term) => (
                <Typography
                  onClick={() => {
                    setSearchText(term.value);
                    searchRef.current?.focus();
                  }}
                  key={term.id}
                  sx={{
                    fontWeight: '500',
                    fontSize: '22px',
                    lineHeight: '25.81px',
                    color: 'text.primary',
                    cursor: 'pointer',
                  }}
                >
                  {term.value}
                </Typography>
              ))}
            </Stack>
          )}
        </Stack>
        <IconButton
          onClick={handleSearch}
          sx={{
            color: '#494949',
          }}
        >
          <CloseIcon
            sx={{
              width: { xs: '15px', md: '24px' },
              height: { xs: '15px', md: '24px' },
            }}
          />
        </IconButton>
      </Box>
    </Drawer>
  );
}
