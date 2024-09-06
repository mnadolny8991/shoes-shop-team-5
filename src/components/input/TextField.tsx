'use client';
import {
  Box,
  styled,
  Typography,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { ForwardedRef, forwardRef } from 'react';

type TextFieldInput = React.InputHTMLAttributes<HTMLInputElement> & {
  required: boolean;
  label: string;
  min?: number;
  error?: string;
  width?: string | number;
};

interface CustomInputProps extends React.ComponentPropsWithoutRef<'input'> {
  error?: string;
}

const CustomInput = styled('input')<CustomInputProps>(({ theme, error }) => ({
  ...theme.typography.body2,
  padding: '15px',
  borderRadius: '8px',
  border: `1px solid ${error ? theme.palette.error.main : '#494949'}`,
  outline: 'none',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    ...theme.typography.body2,
    padding: '11.76px 10.34px',
  },

  '&:focus': {
    borderColor: theme.palette.secondary.main,
  },
}));

const TextField = forwardRef(function TextField(
  {
    required,
    name,
    id,
    label,
    min,
    error,
    placeholder,
    value,
    type,
    onChange,
    ...props
  }: TextFieldInput,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: { xs: '320px', md: '436px' },
        gap: { xs: '4.92px', md: '8px' },
      }}
    >
      <Typography variant="caption" component="label" htmlFor={id}>
        {label}
        {required && (
          <Typography
            variant="caption"
            component="span"
            sx={{ color: 'primary.main' }}
          >
            *
          </Typography>
        )}
      </Typography>
      <CustomInput
        {...props}
        ref={ref}
        value={value}
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        placeholder={placeholder ? placeholder : `at least ${min} characters`}
        error={error}
      ></CustomInput>
      {error && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <WarningAmberRoundedIcon
            sx={{
              width: { xs: '12px', md: '16px' },
              height: { xs: '12px', md: '16px' },
              color: 'error.main',
            }}
          />
          <Typography
            component="small"
            sx={{
              fontSize: { xs: '10px', md: '12px' },
              color: 'error.main',
              lineHeight: '14px',
              fontWeight: '400',
            }}
          >
            {error}
          </Typography>
        </Box>
      )}
    </Box>
  );
});

export default TextField;
