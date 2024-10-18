'use client';
import Header from '@/components/header/Header';
import { CartContextProvider } from '@/context/CartContext';
import LastViewedContextProvider from '@/context/LastViewedContext';
import { PaymentContextProvider } from '@/context/PaymentContext';
import { SearchContextProvider } from '@/context/SearchContext';
import WishlistContextProvider from '@/context/WishlistContext';

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PaymentContextProvider>
      <WishlistContextProvider>
        <LastViewedContextProvider>
          <CartContextProvider>
            <SearchContextProvider>
              <Header />
              {children}
            </SearchContextProvider>
          </CartContextProvider>
        </LastViewedContextProvider>
      </WishlistContextProvider>
    </PaymentContextProvider>
  );
}
