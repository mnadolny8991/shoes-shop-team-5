"use client";
import { Button, ButtonProps, Typography } from "@mui/material";

const buttonSizes = {
  xs: "30px",
  s: "34px",
  m: "40px",
  l: "48px",
  xl: "61px",
};

interface CustomButtonProps extends Omit<ButtonProps, "size"> {
  size: keyof typeof buttonSizes;
}

export default function CustomButton({
  children,
  size,
  variant,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      sx={{ height: buttonSizes[size] }}
      color="primary"
      fullWidth={true}
      variant={variant}
      onClick={(e) => (props.onClick ? props.onClick(e) : null)}
    >
      <Typography variant="button">{children}</Typography>
    </Button>
  );
}
