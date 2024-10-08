import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';
import LastViewedContextProvider from '@/context/LastViewedContext';
import { CartContextProvider } from '@/context/CartContext';
import { SearchContextProvider } from '@/context/SearchContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <LastViewedContextProvider>
      <CartContextProvider>
        <SearchContextProvider>
          <AppRouterCacheProvider>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </QueryClientProvider>
          </AppRouterCacheProvider>
        </SearchContextProvider>
      </CartContextProvider>
    </LastViewedContextProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}