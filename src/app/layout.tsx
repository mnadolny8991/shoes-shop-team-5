import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Shoes shop",
  description: "Shoes shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Typography variant="h1">Some Text</Typography>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
