'use-client'

import { Slider, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

export default function PriceFilter() {
  const [value, setValue] = useState([0, 500]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Stack spacing={2}>
      <Typography variant='subtitle2'>Price Range: ${value[0]} - ${value[1]}</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={500}
      />
    </Stack>
  );
}
