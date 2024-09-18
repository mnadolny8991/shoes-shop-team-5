'use client';
import { PropaneSharp } from '@mui/icons-material';
import { Button, ButtonProps, Typography } from '@mui/material';

const buttonSizes = {
  xs: { height: '30px', fontSize: '12.32px' },
  s: { height: '34px', fontSize: '11.15px' },
  m: { height: '40px', fontSize: '16px' },
  l: { height: '48px', fontSize: '16px' },
  xl: { height: '61px', fontSize: '16px' },
};

interface CustomButtonProps extends Omit<ButtonProps, 'size'> {
  size: keyof typeof buttonSizes;
}

export default function CustomButton({
  children,
  size,
  variant,
  sx,
  onClick,
  disabled,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      sx={{ ...sx, height: buttonSizes[size].height }}
      color="primary"
      fullWidth={true}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <Typography fontSize={buttonSizes[size].fontSize} variant="button">
        {children}
      </Typography>
    </Button>
  );
}
