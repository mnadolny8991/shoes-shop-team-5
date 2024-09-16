'use-client';

import { FormControlLabel, Checkbox, Stack, Typography } from '@mui/material';

type KidsFilterProps = {
  selected: string[];
  onChange: (selected: string[]) => void;
};

const KidsFilter: React.FC<KidsFilterProps> = ({ selected, onChange }) => {
  const handleToggle = (kids: string) => {
    const updatedSelection = selected.includes(kids)
      ? selected.filter((k) => k !== kids)
      : [...selected, kids];
    onChange(updatedSelection);
  };

  return (
    <Stack>
      {['Boys', 'Girls'].map((kid) => (
        <FormControlLabel
          key={kid}
          control={
            <Checkbox
              size="small"
              checked={selected.includes(kid)}
              onChange={() => handleToggle(kid)}
            />
          }
          label={<Typography variant="subtitle2">{kid}</Typography>}
        />
      ))}
    </Stack>
  );
};

export default KidsFilter;
