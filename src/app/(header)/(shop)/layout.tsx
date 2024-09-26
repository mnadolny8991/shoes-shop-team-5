'use client';

import { useState } from 'react';
import Filters from '@/components/filters/Filters';
import {
  Box,
  Stack,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterDrawer from '@/components/nav/FilterDrawer';

import { useSearch } from '@/context/SearchContext';

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { searchText } = useSearch();

  console.log(isMobile);

  // visibility of filters at desktop and mobile drawer
  const [showFilters, setShowFilters] = useState(isMobile);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <>
      {/* Drawer for Mobile Filters */}
      {isMobile && (
        <FilterDrawer
          showFilterDrawer={showFilters}
          onDrawerClose={toggleFilters}
        />
      )}

      <Stack
        {...(!isMobile && {
          direction: 'row',
          spacing: '40px',
          px: '40px',
          pt: '40px',
        })}
      >
        {/* Filters Section */}
        {!isMobile && !showFilters && (
          <Stack
            width="320px"
            spacing={4}
            position={{ xs: 'static', md: 'sticky' }}
            top="40px"
            alignSelf="start"
          >
            <Filters />
          </Stack>
        )}

        <Box component={'main'} flex={'auto'}>
          {/*Heading section */}
          {isMobile && (
            <>
              <Box
                sx={{
                  marginTop: '12px',
                  ml: '16px',
                }}
              >
                <Typography variant="h1">Search Results</Typography>
              </Box>
              <Divider sx={{ marginTop: '12px' }} />
            </>
          )}
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              my: '20px',
              mx: { xs: '16px', md: 0 },
            }}
          >
            <Stack>
              {isMobile && (
                <>
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Shoes
                  </Typography>
                  <Typography variant="body1">{searchText}</Typography>
                </>
              )}
              {!isMobile && (
                <>
                  <Typography variant="h1">Search Results</Typography>
                </>
              )}
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              onClick={toggleFilters}
              sx={{ cursor: 'pointer' }}
            >
              {!showFilters && !isMobile ? (
                <>
                  <Typography
                    variant={isMobile ? 'subtitle2' : 'body1'}
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Hide Filters
                  </Typography>
                  <IconButton>
                    <FilterAltOffOutlinedIcon
                      fontSize={isMobile ? 'small' : 'medium'}
                    />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography
                    variant={isMobile ? 'subtitle2' : 'body1'}
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Filters
                  </Typography>
                  <IconButton>
                    <FilterAltOutlinedIcon
                      fontSize={isMobile ? 'small' : 'medium'}
                    />
                  </IconButton>
                </>
              )}
            </Stack>
          </Stack>

          {children}
        </Box>
      </Stack>
    </>
  );
}
