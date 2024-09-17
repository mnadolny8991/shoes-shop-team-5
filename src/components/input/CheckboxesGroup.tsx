'use client';

import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  styled,
  Typography,
} from '@mui/material';

type CheckboxesGroupProps = {
  name: string;
  caption: string;
  items: Array<{ id: number; name: string }>;
  selected: number[]; // Pass the current selected sizes from the parent
  onChange: (selected: number[]) => void; // Call this to update sizes in the parent form
  error?: string;
};

const CheckboxesFormGroup = styled(FormGroup)(({ theme }) => ({
  gap: 15,
  mt: 8,
  '& .MuiFormControlLabel-root': {
    width: 74,
    height: 48,
    backgroundColor: '#F0F0F0',
    border: '1px solid #494949',
    borderRadius: 8,
    margin: 0,
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: 52,
      height: 34,
      borderRadius: 5.58,
    },
  },
  '& .MuiFormControlLabel-root:has(.Mui-checked)': {
    backgroundColor: 'transparent',
  },
  '& .MuiFormControlLabel-label': {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
  },
  '& .MuiCheckbox-root': {
    display: 'none',
  },
}));

export default function CheckboxesGroup({
  name,
  caption,
  items,
  selected,
  onChange,
  error,
}: CheckboxesGroupProps) {
  const handleCheckboxChange = (id: number) => {
    const updatedSizes = selected.includes(id)
      ? selected.filter((sizeId) => sizeId !== id)
      : [...selected, id];

    onChange(updatedSizes); // Call onChange to update the parent form
  };

  return (
    <Box>
      <Typography variant="caption">{caption}</Typography>
      <CheckboxesFormGroup row>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                value={item.id}
                checked={selected.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
            }
            label={item.name}
          />
        ))}
      </CheckboxesFormGroup>
      {error && (
        <Typography color="error" variant="caption">
          {error}
        </Typography>
      )}
    </Box>
  );
}
