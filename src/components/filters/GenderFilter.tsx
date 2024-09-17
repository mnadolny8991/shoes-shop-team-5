'use-client';

import { FormControlLabel, Checkbox, Stack, Typography } from '@mui/material';

type GenderFilterProps = {
  selected: string[];
  onChange: (selected: string[]) => void;
};

const GenderFilter: React.FC<GenderFilterProps> = ({ selected, onChange }) => {
  const handleToggle = (gender: string) => {
    const updatedSelection = selected.includes(gender)
      ? selected.filter((gen) => gen !== gender)
      : [...selected, gender];
    onChange(updatedSelection);
  };
  return (
    <Stack>
      {['Men', 'Women'].map((gender) => (
        <FormControlLabel
          key={gender}
          control={
            <Checkbox
              size="small"
              checked={selected.includes(gender)}
              onChange={() => handleToggle(gender)}
            />
          }
          label={<Typography variant="subtitle2">{gender}</Typography>}
        />
      ))}
    </Stack>
  );
};

export default GenderFilter;
