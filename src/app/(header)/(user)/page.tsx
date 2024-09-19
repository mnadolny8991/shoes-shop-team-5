'use client';

import { Stack, Typography } from '@mui/material';

import { products } from '@/mock/products';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductsHeader from '@/components/products/ProductsHeader';
import lastViewedItems from '@/mock/lastViewedId';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useQueries } from '@tanstack/react-query';
import apiUrl from '@/data/apiUrl';
import mapProduct from '@/mappers/productMappers';
import { useLastViewed } from '@/context/LastViewedContext';

export default function DefaultProducts() {
  // const lastViewed = lastViewedItems.map(
  //   (id) => products.find((product) => product.id == id)!
  // );
  // const [lastViewedIds, ] = useLocalStorage<number[]>('lastViewed', []);
  // const lastViewed = useQueries({
  //   queries: lastViewedIds.map((id: number) => {
  //     return {
  //       queryKey: ['product', id],
  //       queryFn: () =>
  //         fetch(`${apiUrl}/products/${id}?populate=*`)
  //           .then((res) => {
  //             if (res.status === 404) {
  //               console.log('somethings wrong');
  //               throw new Error('There is no product with this id');
  //             }
  //             return res.json();
  //           })
  //           .then((data) => mapProduct(data)),
  //     };
  //   }),
  // });

  const { lastViewed } = useLastViewed();

  return (
    <>
      <ProductsHeader />
      <Stack
        direction={'row'}
        justifyContent="space-between"
        alignItems="center"
        mx={'20px'}
        mb={{ xs: '19px', md: '36px' }}
      >
        {lastViewed.length > 0 &&
          <Typography variant="h1">Last viewed products</Typography>
        }
      </Stack>
      {products && (
        <>
          <ProductsGrid products={lastViewed} isAdmin={false} />
        </>
      )}
    </>
  );
}
