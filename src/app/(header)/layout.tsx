'use client';
import Header from '@/components/header/Header';
import { CartContextProvider } from '@/context/CartContext';

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CartContextProvider>
        <Header />
        {children}
      </CartContextProvider>
    </>
  );
}
