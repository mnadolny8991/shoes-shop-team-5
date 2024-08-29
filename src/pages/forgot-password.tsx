import React from "react";
import { Container, Typography, Box, Grid, CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import Image from "next/image";
import theme from "@/theme";
import CustomTextField from "../components/InputField/TextField";
import CustomButton from "../components/Buttons/CustomButton";

const Logo = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50px",
        left: "40px",
        zIndex: 1000,
      }}
    >
      <Image
        src="/logo.svg"
        width={isMobile ? 35 : 40}
        height={isMobile ? 26.5 : 30}
        alt="website logo"
      />
    </Box>
  );
};

const ForgotPassword: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Logo />
          <Container maxWidth="xs">
            <Typography
              component="h1"
              variant="h1"
              sx={{
                mb: {
                  xs: 1.5,
                  sm: 2,
                },
                fontSize: {
                  xs: "30px",
                  sm: "45px",
                },
              }}
            >
              Forgot password?
            </Typography>

            <Typography
              component="p"
              variant="body2"
              sx={{
                mb: {
                  xs: 4,
                  sm: 6,
                },
                color: "text.secondary",
                fontSize: {
                  xs: "12px",
                  sm: "15px",
                },
              }}
            >
              Don’t worry, we’ll send you reset instructions.
            </Typography>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <CustomTextField
                required={false}
                name="email"
                id="email"
                label="Email"
                min={5}
                error={undefined}
                width="100%"
              />

              <CustomButton
                size="l"
                sx={{
                  mb: 2.5,
                  mt: 2.5,
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                Reset password
              </CustomButton>

              <Link href="/log-in" style={{ textDecoration: "none" }}>
                <Typography
                  component="p"
                  variant="caption"
                  sx={{
                    color: "#494949",
                    fontSize: {
                      xs: "10px",
                      sm: "15px",
                    },
                  }}
                >
                  Back to log in
                </Typography>
              </Link>
            </Box>
          </Container>
        </Grid>

        <Grid
          item
          xs={false}
          md={6}
          sx={{
            backgroundImage: "url(/pexels-melvin-buezo-2529146.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </>
  );
};

export default ForgotPassword;
