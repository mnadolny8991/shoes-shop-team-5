'use-client';

import { FormControlLabel, Checkbox, Stack, Typography } from '@mui/material';

interface BrandFilterProps {
  brands: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({
  brands,
  selected,
  onChange,
}) => {
  const handleToggle = (brand: string) => {
    const updatedSelected = selected.includes(brand)
      ? selected.filter((b) => b !== brand)
      : [...selected, brand];

    onChange(updatedSelected);
  };

  return (
    <Stack spacing={1}>
      {brands.map((brand) => (
        <FormControlLabel
          key={brand}
          control={
            <Checkbox
              size="small"
              checked={selected.includes(brand)}
              onChange={() => handleToggle(brand)}
            />
          }
          label={<Typography variant="subtitle2">{brand}</Typography>}
        />
      ))}
    </Stack>
  );
};

export default BrandFilter;
