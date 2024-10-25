'use client';

import { Slider, Stack, Typography } from '@mui/material';

interface PriceFilterProps {
  value: [number, number];
  onChange: (newValue: [number, number]) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ value, onChange }) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue as [number, number]);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2">
        Price Range: ${value[0]} - ${value[1]}
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={999}
      />
    </Stack>
  );
};

export default PriceFilter;
