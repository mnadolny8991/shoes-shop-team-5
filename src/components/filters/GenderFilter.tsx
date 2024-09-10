'use-client'

import { FormControlLabel, Checkbox, Stack, Typography, useTheme } from '@mui/material';

export default function GenderFilter() {
  const theme = useTheme()
  return (
    <Stack>
      <FormControlLabel
        control={<Checkbox size='small' />}
        label={<Typography variant='subtitle2'>Men</Typography>}
      />
      <FormControlLabel
        control={<Checkbox size='small' />}
        label={<Typography variant='subtitle2'>Women</Typography>}
      />
    </Stack>
  );
}
