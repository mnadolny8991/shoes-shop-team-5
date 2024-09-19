'use client';
import Header from '@/components/header/Header';
import { CartContextProvider } from '@/context/CartContext';
import LastViewedContextProvider from '@/context/LastViewedContext';
import { SearchContextProvider } from '@/context/SearchContext';

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LastViewedContextProvider>
        <CartContextProvider>
          <SearchContextProvider>
            <Header />
            {children}
          </SearchContextProvider>
        </CartContextProvider>
      </LastViewedContextProvider>
    </>
  );
}
