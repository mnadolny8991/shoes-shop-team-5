'use client';


import ProductsGrid from '@/components/products/ProductsGrid';
import NothingFound from '@/components/products/NothingFound';
//import { products } from '@/mock/products';

const products = null

export default function MyProducts() {

  return (
    <>
      {products ? (
        <>
          <ProductsGrid products={products} />
        </>
      ) : (
        <NothingFound />
      )}
    </>
  );
}