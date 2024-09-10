'use-client'

import { FormControlLabel, Checkbox, Stack, Typography, useTheme } from '@mui/material';

export default function ColorFilter() {
  const theme = useTheme()
  return (
    <Stack>
      <FormControlLabel
        control={<Checkbox size='small' />}
        label={<Typography variant='subtitle2'>red</Typography>}
      />
      <FormControlLabel
        control={<Checkbox size='small' />}
        label={<Typography variant='subtitle2'>green</Typography>}
      />
      <FormControlLabel
        control={<Checkbox size='small' />}
        label={<Typography variant='subtitle2'>yellow</Typography>}
      />
    </Stack>
  );
}
