"use client";
import { Container, styled, Typography } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

type TextFieldInput = {
  required: boolean;
  name: string;
  id: string;
  label: string;
  min: number;
  error?: string;
};

interface CustomInputProps extends React.ComponentPropsWithoutRef<"input"> {
  error?: string;
}

const CustomInput = styled("input")<CustomInputProps>(({ theme, error }) => ({
  ...theme.typography.body2,
  padding: "15px",
  borderRadius: "8px",
  border: `1px solid ${error ? theme.palette.error.main : "#494949"}`,
  outline: "none",
  width: "100%",

  "&:focus": {
    borderColor: theme.palette.secondary.main,
  },
}));

export default function TextField({
  required,
  name,
  id,
  label,
  min,
  error,
}: TextFieldInput) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
      disableGutters={true}
      fixed
    >
      <Typography variant="caption" component="label" htmlFor={id}>
        {label}{" "}
        {required && (
          <Typography
            variant="caption"
            component="span"
            sx={{ color: "primary.main" }}
          >
            *
          </Typography>
        )}
      </Typography>
      <CustomInput
        name={name}
        id={id}
        placeholder={`at least ${min} characters`}
        error={error}
      ></CustomInput>
      {error && (
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "4px",
          }}
          disableGutters={true}
        >
          <WarningAmberRoundedIcon
            sx={{ width: "16px", height: "16px", color: "error.main" }}
          />
          <Typography
            component="small"
            sx={{
              fontSize: "12px",
              color: "error.main",
              lineHeight: "16px",
              fontWeight: "400",
            }}
          >
            {error}
          </Typography>
        </Container>
      )}
    </Container>
  );
}
