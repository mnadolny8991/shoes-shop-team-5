'use-client';

import { FormControlLabel, Checkbox, Stack, Typography } from '@mui/material';
import { Color } from '@/types/product';

interface ColorFilterProps {
  colors: Color[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({
  colors,
  selected,
  onChange,
}) => {
  const handleToggle = (colorTitle: string) => {
    const updatedSelection = selected.includes(colorTitle)
      ? selected.filter((col) => col !== colorTitle)
      : [...selected, colorTitle];
    onChange(updatedSelection);
  };

  return (
    <Stack>
      {colors.map((color) => (
        <FormControlLabel
          key={color.id}
          control={
            <Checkbox
              size="small"
              checked={selected.includes(color.name)}
              onChange={() => handleToggle(color.name)}
            />
          }
          label={<Typography variant="subtitle2">{color.name}</Typography>}
        />
      ))}
    </Stack>
  );
};

export default ColorFilter;
