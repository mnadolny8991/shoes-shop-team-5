"use client";

import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack, Divider, useTheme, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GenderFilter from './GenderFilter';
import KidsFilter from './KidsFilter';
import BrandFilter from './BrandFilter';
import PriceFilter from './PriceFilter';
import ColorFilter from './ColorFilter';
import SearchBar from '../input/SearchBar';

export default function Filters() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [brandName, setBrandName] = useState('')

  return (
    <Stack>
      {!isMobile && (
        <>
          <Stack
            sx={{
              marginBottom: '15px',
            }}
          >
            <Typography variant='caption' sx={{ color: theme.palette.text.secondary }}>
              Shoes/Air Force 1
            </Typography>
            <Typography variant='body1'>
              Air Force 1 (137)
            </Typography>
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
          <Typography variant='caption'>Gender</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GenderFilter />
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
          <Typography variant='caption'>Kids</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <KidsFilter />
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
          <Typography variant='caption'>Brand</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <SearchBar variant='header' onChange={(val) => setBrandName(val)} width='100%' height='35px' value={brandName} />
          <BrandFilter />
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
          <Typography variant='caption'>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PriceFilter />
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
          <Typography variant='caption'>Color</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ColorFilter />
        </AccordionDetails>
      </Accordion>
      <Divider />
    </Stack>
  );
}
