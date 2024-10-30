import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';
import LastViewedContextProvider from '@/context/LastViewedContext';
import { CartContextProvider } from '@/context/CartContext';
import { SearchContextProvider } from '@/context/SearchContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock AppRouterCacheProvider
const MockAppRouterCacheProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;

// Mock the entire @mui/material-nextjs/v13-appRouter module
jest.mock('@mui/material-nextjs/v13-appRouter', () => ({
  AppRouterCacheProvider: MockAppRouterCacheProvider,
}));

const queryClient = new QueryClient();

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SearchContextProvider>
      <LastViewedContextProvider>
        <CartContextProvider>
          <MockAppRouterCacheProvider>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </QueryClientProvider>
          </MockAppRouterCacheProvider>
        </CartContextProvider>
      </LastViewedContextProvider>
    </SearchContextProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
