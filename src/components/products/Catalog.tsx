'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Filters, useSearch } from '@/context/SearchContext';
import ProductsGrid from '@/components/products/ProductsGrid';
import NothingFound from '@/components/products/NothingFound';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, CircularProgress, IconButton, Stack } from '@mui/material';
import useDebounce from '@/hooks/useDebounce';
import searchDebounceTime from '@/data/searchDebounceTime';
import { mapProductList } from '@/mappers/productMappers';
import useFilteredProducts from '@/hooks/useProductsFiltered';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Catalog = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(() => parseInt(searchParams.get('page') ?? '1'));
  const { searchText, filters } = useSearch();
  const filtersDebounced = useDebounce(filters, 300, filters);
  const { data, status, error, isPlaceholderData } = useFilteredProducts(
    searchText,
    filtersDebounced,
    page
  );

  useEffect(() => {
    router.push(pathname + '?' + getSearchParams(searchText, filtersDebounced, page));
  }, [searchText, filtersDebounced, page, pathname, router]);

  // useEffect(() => {
  //   // init filters and search text from the searchParams
  //   setSearchText(searchParams.get('search') ?? '');
  //   setFilters({
  //     brand: JSON.parse(searchParams.get('brand') ?? 'null') ?? [],
  //     color: JSON.parse(searchParams.get('color') ?? 'null') ?? [],
  //     gender: JSON.parse(searchParams.get('gender') ?? 'null') ?? [],
  //     price: JSON.parse(searchParams.get('price') ?? 'null') ?? [0, 999],
  //     size: JSON.parse(searchParams.get('size') ?? 'null') ?? [],
  //   });
  //   setPage(JSON.parse(searchParams.get('page') ?? 'null') ?? 1);
  // }, [searchParams, setFilters, setSearchText]);

  // useEffect(() => {
  //   router.push(pathname + '?' + getSearchParams() + `&page=${page}`);
  // }, [
  //   searchTextDebounced,
  //   filtersDebounced,
  //   pathname,
  //   router,
  //   getSearchParams,
  //   page,
  // ]);

  const products = status === 'success' ? mapProductList(data) : [];
  const hasNextPage =
    status === 'success'
      ? data.meta.pagination.page < data.meta.pagination.pageCount
      : false;

  return (
    <>
      {status === 'pending' ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : status === 'error' ? (
        { error }
      ) : products!.length === 0 ? (
        <NothingFound />
      ) : (
        <>
          <ProductsGrid products={products!} isAdmin={false} />
          <Stack direction="row" justifyContent="center" marginBottom="20px">
            <IconButton
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 1}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                if (!isPlaceholderData && hasNextPage) {
                  setPage((old) => old + 1);
                }
              }}
              // Disable the Next Page button until we know a next page is available
              disabled={isPlaceholderData || !hasNextPage}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Stack>
        </>
      )}
    </>
  );
};

function getSearchParams(search: string, filters: Filters, page: number) {
  const params = new URLSearchParams();
  params.set('search', search);
  params.set('brand', JSON.stringify(filters.brand));
  params.set('color', JSON.stringify(filters.color));
  params.set('gender', JSON.stringify(filters.gender));
  params.set('price', JSON.stringify(filters.price));
  params.set('size', JSON.stringify(filters.size));
  params.set('page', page.toString());
  return params.toString();
}

export default Catalog;
