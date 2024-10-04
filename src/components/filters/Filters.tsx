'use client';

import { memo, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GenderFilter from '@/components/filters/GenderFilter';
import SizeFilter from '@/components/filters/SizeFilter';
import BrandFilter from '@/components/filters/BrandFilter';
import PriceFilter from '@/components/filters/PriceFilter';
import ColorFilter from '@/components/filters/ColorFilter';
import SearchBar from '@/components/input/SearchBar';

import { useSearch } from '@/context/SearchContext';

import ALL_COLORS from '@/mock/ALL_COLORS';
import { BRANDS } from '@/mock/BRANDS';
import useDebounce from '@/hooks/useDebounce';
import searchDebounceTime from '@/data/searchDebounceTime';

const Filters = memo(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [brandName, setBrandName] = useState('');

  const { filters, searchText, updateFilter } = useSearch();
  const searchTextDebounced = useDebounce(searchText, searchDebounceTime, '');

  const handleBrandChange = (selectedBrands: string[]) => {
    updateFilter('brand', selectedBrands);
  };

  const handlePriceChange = (priceRange: [number, number]) => {
    updateFilter('price', priceRange);
  };

  const handleColorChange = (selectedColors: string[]) => {
    updateFilter('color', selectedColors);
  };

  const handleGenderChange = (selectedGender: string[]) => {
    updateFilter('gender', selectedGender);
  };

  const handleSizeChange = (selectedSizes: string[]) => {
    updateFilter('size', selectedSizes);
  };

  return (
    <Stack>
      {!isMobile && (
        <>
          <Stack
            sx={{
              marginBottom: '15px',
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
            >
              Shoes
            </Typography>
            <Typography variant="body1">{searchTextDebounced}</Typography>
          </Stack>
          <Divider />
        </>
      )}
      <Accordion
        defaultExpanded
        sx={{
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="caption">Gender</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GenderFilter
            onChange={handleGenderChange}
            selected={filters.gender}
          />
        </AccordionDetails>
      </Accordion>
      <Divider />

      <Accordion
        sx={{
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="caption">Sizes (EU)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SizeFilter onChange={handleSizeChange} selected={filters.size} />
        </AccordionDetails>
      </Accordion>
      <Divider />

      <Accordion
        sx={{
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="caption">Brand</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <SearchBar
            variant="header"
            onChange={(val) => setBrandName(val)}
            width="100%"
            height="35px"
            value={brandName}
          />
          <BrandFilter
            brands={BRANDS.filter(
              (brand) =>
                brandName === '' ||
                brand.toLowerCase().includes(brandName.toLowerCase())
            )}
            onChange={handleBrandChange}
            selected={filters.brand}
          />
        </AccordionDetails>
      </Accordion>
      <Divider />

      <Accordion
        sx={{
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="caption">Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PriceFilter
            onChange={handlePriceChange}
            value={filters.price as [number, number]}
          />
        </AccordionDetails>
      </Accordion>
      <Divider />

      <Accordion
        sx={{
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="caption">Color</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ColorFilter
            colors={[...ALL_COLORS]}
            onChange={handleColorChange}
            selected={filters.color}
          />
        </AccordionDetails>
      </Accordion>
      <Divider />
    </Stack>
  );
});

Filters.displayName = 'Filters';

export default Filters;
