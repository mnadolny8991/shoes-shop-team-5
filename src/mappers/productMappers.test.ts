import { ApiSize } from '@/types/api/apiTypes';
import mapProduct, {
  mapAllCategories,
  mapAllColors,
  mapAllSizes,
  mapApiSizeToSize,
  mapBrands,
  mapProductList,
} from './productMappers';
import { Size } from '@/types/product';
import { allSizes, apiSizesResponse } from '@/testing/mocks/sizes';
import { allColors, apiColorsResponse } from '@/testing/mocks/colors';
import {
  allCategories,
  apiCategoriesResponse,
} from '@/testing/mocks/categories';
import { allBrands, apiBrandListResponse } from '@/testing/mocks/brands';
import {
  apiProductListResponse,
  apiProductResponse1476,
  apiProductResponse1564,
  product1476,
  products,
} from '@/testing/mocks/products';
import mockProduct from '@/testing/mocks/mockProduct';

describe('product mappers', () => {
  test('mapApiSizeToSize', () => {
    const apiSize: ApiSize = {
      id: 135,
      attributes: {
        value: 45,
        createdAt: 'created',
        updatedAt: 'updated',
        publishedAt: 'published',
      },
    };
    const size: Size = { id: 135, name: '45' };
    expect(mapApiSizeToSize(apiSize)).toEqual(size);
  });
  test('mapAllSizes', () => {
    expect(mapAllSizes(apiSizesResponse)).toEqual(allSizes);
  });
  test('mapAllColors', () => {
    expect(mapAllColors(apiColorsResponse)).toEqual(allColors);
  });
  test('mapAllCategories', () => {
    expect(mapAllCategories(apiCategoriesResponse)).toEqual(allCategories);
  });
  test('mapAllBrands', () => {
    expect(mapBrands(apiBrandListResponse)).toEqual(allBrands);
  });
  test('mapProduct', () =>
    //  expect(mapProduct(apiProductResponse1564)).resolves.toEqual(mockProduct)
    expect(mapProduct(apiProductResponse1476)).resolves.toEqual(product1476));
  test('mapProductList', () => {
    expect(mapProductList(apiProductListResponse)).toEqual(products);
  });
});
