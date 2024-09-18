'use client';

import type { Metadata } from 'next';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// export const metadata: Metadata = {
//   title: 'Shoes shop',
//   description: 'Shoes shop',
// };

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
