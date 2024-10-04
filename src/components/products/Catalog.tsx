'use client';

import { useState } from 'react';
import { useSearch } from '@/context/SearchContext';
import ProductsGrid from '@/components/products/ProductsGrid';
import NothingFound from '@/components/products/NothingFound';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, CircularProgress, IconButton, Stack } from '@mui/material';
import useDebounce from '@/hooks/useDebounce';
import searchDebounceTime from '@/data/searchDebounceTime';
import { mapProductList } from '@/mappers/productMappers';
import useFilteredProducts from '@/hooks/useProductsFiltered';

const Catalog = () => {
  const [page, setPage] = useState<number>(1);
  const { searchText, filters } = useSearch();
  const filtersDebounced = useDebounce(filters, 500, filters);
  const searchTextDebounced = useDebounce(searchText, searchDebounceTime, '');
  const { data, status, error, isPlaceholderData } = useFilteredProducts(
    searchTextDebounced,
    filtersDebounced,
    page
  );

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

export default Catalog;
