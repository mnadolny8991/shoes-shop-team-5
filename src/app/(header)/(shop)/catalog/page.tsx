'use client';

import { useSearch } from '@/context/SearchContext';
import ProductsGrid from '@/components/products/ProductsGrid';
import NothingFound from '@/components/products/NothingFound';
import { products } from '@/mock/products';

export default function MyProducts() {
  const { searchText, filters } = useSearch();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesGender =
      filters.gender.length === 0 || filters.gender.includes(product.gender);

    const matchesBrand =
      filters.brand.length === 0 ||
      filters.brand.includes(product.brand.toLowerCase());

    const matchesPrice =
      filters.price.length === 2
        ? product.price >= filters.price[0] && product.price <= filters.price[1]
        : true;

    const matchesColor =
      filters.color.length === 0 ||
      (product.color &&
        product.color.some((color) => filters.color.includes(color.name)));

    const matchesKids =
      filters.kids.length === 0 ||
      (product.gender && filters.kids.includes(product.gender));

    return (
      matchesSearch &&
      matchesGender &&
      matchesBrand &&
      matchesPrice &&
      matchesColor &&
      matchesKids
    );
  });

  return (
    <>
      {filteredProducts.length > 0 ? (
        <>
          <ProductsGrid products={filteredProducts} />
        </>
      ) : (
        <NothingFound />
      )}
    </>
  );
}
