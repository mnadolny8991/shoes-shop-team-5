import { Select, SelectProps } from '@mui/material';
import InputFieldContainer, {
  InputProps,
} from '@/components/containers/InputFieldContainer';
import { ForwardedRef, forwardRef } from 'react';

const MultipleSelect = forwardRef(function (
  {
    children,
    required,
    id,
    label,
    error,
    width,
    ...props
  }: SelectProps & InputProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  return (
    <InputFieldContainer {...{ label, id, required, error, width }}>
      <Select
        {...props}
        ref={ref}
        id={id}
        error={!!error}
        multiple
        sx={{
          typography: 'body2',
          borderRadius: 2,
          '& .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline':
            { border: '1px solid #494949' },
        }}
        inputProps={{ sx: { padding: { xs: '11.76px 10.34px', md: '15px' } } }}
        MenuProps={{
          sx: {
            '& .MuiPaper-root': { border: '1px solid #5C5C5C' },
            '& .MuiMenuItem-root': { typography: 'body2', minHeight: 'auto' },
          },
        }}
      >
        {children}
      </Select>
    </InputFieldContainer>
  );
});

export default MultipleSelect;
