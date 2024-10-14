'use client';
import Header from '@/components/header/Header';
import { CartContextProvider } from '@/context/CartContext';
import LastViewedContextProvider from '@/context/LastViewedContext';
import { SearchContextProvider } from '@/context/SearchContext';
import WishlistContextProvider from '@/context/WishlistContext';
import { Suspense } from 'react';

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WishlistContextProvider>
      <LastViewedContextProvider>
        <CartContextProvider>
          <Suspense>
            <SearchContextProvider>
              <Header />
              {children}
            </SearchContextProvider>
          </Suspense>
        </CartContextProvider>
      </LastViewedContextProvider>
    </WishlistContextProvider>
  );
}
