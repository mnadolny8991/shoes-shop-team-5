'use client';
import Header from '@/components/header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
import { CartContextProvider } from '@/context/CartContext';
import { SearchContextProvider } from '@/context/SearchContext';

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <SearchContextProvider>
            <Header />
            {children}
          </SearchContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </>
  );
}
