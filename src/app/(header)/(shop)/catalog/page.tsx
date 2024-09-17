'use client';

import { useEffect, useState } from 'react';
import { useSearch } from '@/context/SearchContext';
import { useQuery } from '@tanstack/react-query';
import apiUrl from '@/data/apiUrl';
import ProductsGrid from '@/components/products/ProductsGrid';
import NothingFound from '@/components/products/NothingFound';
import { ApiProductListResponse } from '@/types/apiTypes';
import { Product } from '@/types/product';
import { mapProductList } from '@/mappers/productMappers';

export default function MyProducts() {
  const { searchText, filters } = useSearch();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['myProducts'],
    queryFn: () =>
      fetch(`${apiUrl}/products?filters[teamName]=team-5&populate=*`)
        .then((res) => res.json())
        .then((data: ApiProductListResponse) => mapProductList(data))
        .catch(() => {
          // router.push('/error');
        }),
  });

  useEffect(() => {
    if (data && Array.isArray(data)) setProducts(data);
  }, [data]);

  // Handle product filtering
  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchText.toLowerCase());

        const matchesGender =
          filters.gender.length === 0 ||
          filters.gender.includes(product.gender.name);

        const matchesBrand =
          filters.brand.length === 0 ||
          filters.brand.includes(product.brand.name);

        const matchesPrice =
          filters.price.length === 2
            ? product.price >= filters.price[0] &&
              product.price <= filters.price[1]
            : true;

        const matchesColor =
          filters.color.length === 0 ||
          (product.color &&
            filters.color.includes(product.color.name.toLocaleLowerCase()));

        const matchesSizes =
          filters.size.length === 0 ||
          (product.sizes &&
            product.sizes.some((size) =>
              filters.size.includes(size.name.toLowerCase())
            ));

        return (
          matchesSearch &&
          matchesGender &&
          matchesBrand &&
          matchesPrice &&
          matchesColor &&
          matchesSizes
        );
      });

      setFilteredProducts(filtered);
    }
  }, [products, filters, searchText]);

  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'Data loading failed'
      ) : filteredProducts.length === 0 ? (
        <NothingFound />
      ) : (
        <ProductsGrid products={filteredProducts} isAdmin={false} />
      )}
    </>
  );
}
