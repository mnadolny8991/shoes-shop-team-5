'use client';
import {
  Box,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { ChangeEvent, ForwardedRef, forwardRef } from 'react';

type TextFieldInput = React.InputHTMLAttributes<HTMLInputElement> & {
  required: boolean;
  label: string;
  min?: number;
  password?: boolean;
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
    password,
    placeholder,
    value,
    ...props
  }: TextFieldInput,
  ref: ForwardedRef<HTMLInputElement>
) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: isMobile ? '320px' : '436px',
        gap: isMobile ? '4.92px' : '8px',
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
        type={password ? 'password' : 'text'}
        name={name}
        id={id}
        onChange={props.onChange}
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
              width: isMobile ? '12px' : '16px',
              height: isMobile ? '12px' : '16px',
              color: 'error.main',
            }}
          />
          <Typography
            component="small"
            sx={{
              fontSize: isMobile ? '10px' : '12px',
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