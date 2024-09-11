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
  defaultChecked?: number[];
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
  defaultChecked,
}: CheckboxesGroupProps) {
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
                name={name}
                defaultChecked={defaultChecked?.includes(item.id)}
              />
            }
            label={item.name}
          />
        ))}
      </CheckboxesFormGroup>
    </Box>
  );
}
