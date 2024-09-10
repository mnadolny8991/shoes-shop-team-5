'use-client'

import { TextField, FormControlLabel, Checkbox, Stack, useTheme, Typography } from '@mui/material';

export default function BrandFilter() {
  const theme = useTheme()

  return (
    <Stack spacing={1}>
      <FormControlLabel
        control={<Checkbox size='small' />}
        label={<Typography variant='subtitle2'>brand 1</Typography>}
      />
      <FormControlLabel
        control={<Checkbox size='small' />}
        label={<Typography variant='subtitle2'>brand 2</Typography>}
      />
      <FormControlLabel
        control={<Checkbox size='small' />}
        label={<Typography variant='subtitle2'>brand 3</Typography>}
      />
      <FormControlLabel
        control={<Checkbox size='small' />}
        label={<Typography variant='subtitle2'>brand 4</Typography>}
      />
    </Stack>
  );
}
