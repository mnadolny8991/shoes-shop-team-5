'use client';
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
  ...props
}: CustomButtonProps) {
  return (
    <Button
      sx={{ ...sx, height: buttonSizes[size].height }}
      color="primary"
      fullWidth={true}
      variant={variant}
      type={props.type}
      onClick={(e) => (props.onClick ? props.onClick(e) : null)}
      disabled={props.disabled}
    >
      <Typography fontSize={buttonSizes[size].fontSize} variant="button">
        {children}
      </Typography>
    </Button>
  );
}
