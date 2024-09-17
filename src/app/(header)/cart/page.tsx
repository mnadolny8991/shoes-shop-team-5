'use client';

import Cart from '@/components/cart/Cart';
import { useCartContext } from '@/context/CartContext';
import { FC } from 'react';

type PageProps = {};

const Page: FC<PageProps> = () => {
  const { isLoading } = useCartContext();

  return (
    <>
      {!isLoading && <Cart />}
    </>
  );
};

export default Page;
