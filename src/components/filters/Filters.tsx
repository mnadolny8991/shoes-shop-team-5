'use client';

import { useState } from 'react';
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
import GenderFilter from './GenderFilter';
import SizeFilter from './SizeFilter';
import BrandFilter from './BrandFilter';
import PriceFilter from './PriceFilter';
import ColorFilter from './ColorFilter';
import SearchBar from '../input/SearchBar';

import { useSearch } from '@/context/SearchContext';

import ALL_COLORS from '@/mock/ALL_COLORS';
import { BRANDS } from '@/mock/BRANDS';

export default function Filters() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [brandName, setBrandName] = useState('');

  const { filters, searchText, updateFilter } = useSearch();

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
            <Typography variant="body1">{searchText}</Typography>
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
        defaultExpanded
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
        defaultExpanded
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
        defaultExpanded
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
        defaultExpanded
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
}
