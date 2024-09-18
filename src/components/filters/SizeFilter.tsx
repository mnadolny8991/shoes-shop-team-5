'use-client';

import { FormControlLabel, Checkbox, Stack, Typography } from '@mui/material';
import allSizes from '@/data/allSizes';

type SizeFilterProps = {
  selected: string[];
  onChange: (selected: string[]) => void;
};

const SizeFilter: React.FC<SizeFilterProps> = ({ selected, onChange }) => {
  const handleToggle = (size: string) => {
    const updatedSelection = selected.includes(size)
      ? selected.filter((s) => s !== size)
      : [...selected, size];
    onChange(updatedSelection);
  };

  return (
    <Stack>
      {allSizes.map((size) => (
        <FormControlLabel
          key={size.id}
          control={
            <Checkbox
              size="small"
              checked={selected.includes(size.name.slice(-2))}
              onChange={() => handleToggle(size.name.slice(-2))}
            />
          }
          label={
            <Typography variant="subtitle2">{size.name.slice(-2)}</Typography>
          }
        />
      ))}
    </Stack>
  );
};

export default SizeFilter;
