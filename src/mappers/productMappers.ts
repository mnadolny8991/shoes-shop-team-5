import {
  ApiBrand,
  ApiBrandListResponse,
  ApiCategory,
  ApiCategoryListResponse,
  ApiColor,
  ApiColorListResponse,
  ApiGender,
  ApiGenderListResponse,
  ApiImage,
  ApiProductListResponse,
  ApiProductResponse,
  ApiProductResponseDataObject,
  ApiSize,
  ApiSizeListResponse,
} from '@/types/api/apiTypes';
import {
  Brand,
  Category,
  Color,
  Gender,
  Product,
  ProductImage,
  Size,
  TeamName,
} from '@/types/product';

const mapApiImageToProductImage = (apiImage: ApiImage): ProductImage => ({
  id: apiImage.id,
  name: apiImage.attributes.name,
  alternativeText: apiImage.attributes.alternativeText || '',
  url: apiImage.attributes.url,
});

const mapApiColorToColor = (apiColor: ApiColor): Color => ({
  id: apiColor.id,
  name: apiColor.attributes.name,
});

const mapApiBrandToBrand = (apiBrand: ApiBrand): Brand => ({
  id: apiBrand.id,
  name: apiBrand.attributes.name,
});

const mapApiCategoryToCategory = (apiCategory: ApiCategory): Category => ({
  id: apiCategory.id,
  name: apiCategory.attributes.name,
});

const mapApiGenderToGender = (apiGender: ApiGender): Gender => ({
  id: apiGender.id,
  name: apiGender.attributes.name,
});

const mapApiSizeToSize = (apiSize: ApiSize): Size => ({
  id: apiSize.id,
  name: apiSize.attributes.value.toString(),
});

const mapApiProductResponseDataObjectToProduct = (
  apiProductResponseDataObject: ApiProductResponseDataObject
): Product => {
  const { id, attributes: apiProduct } = apiProductResponseDataObject;
  const product: Product = {
    id,
    name: apiProduct.name,
    description: apiProduct.description,
    brand: apiProduct?.brand && mapApiBrandToBrand(apiProduct.brand.data),
    color: apiProduct?.color && mapApiColorToColor(apiProduct.color.data),
    sizes: apiProduct.sizes.data.map(mapApiSizeToSize),
    categories: apiProduct?.categories.data.map((category) =>
      mapApiCategoryToCategory(category)
    ),
    price: apiProduct.price,
    gender:
      apiProduct?.gender.data && mapApiGenderToGender(apiProduct.gender.data),
    images: apiProduct.images.data.map(mapApiImageToProductImage),
    userID: apiProduct?.userID?.data?.id,
    teamName: apiProduct.teamName as TeamName,
  };
  return product;
};

const mapProduct = async (
  apiProductResponse: ApiProductResponse
): Promise<Product> =>
  mapApiProductResponseDataObjectToProduct(apiProductResponse.data);

export default mapProduct;

export const mapProductList = (
  apiProductListResponse: ApiProductListResponse
): Product[] =>
  apiProductListResponse.data.map((product) =>
    mapApiProductResponseDataObjectToProduct(product)
  );

export const mapAllColors = (
  apiColorListResponse: ApiColorListResponse
): Color[] =>
  apiColorListResponse.data.map((apiColor) => mapApiColorToColor(apiColor));

export const mapAllSizes = (apiSizeListResponse: ApiSizeListResponse): Size[] =>
  apiSizeListResponse.data.map((apiSize) => mapApiSizeToSize(apiSize));

export const mapAllCategories = (
  apiCategoryListResponse: ApiCategoryListResponse
): Category[] =>
  apiCategoryListResponse.data.map((apiCategory) =>
    mapApiCategoryToCategory(apiCategory)
  );

export const mapBrands = (
  apiBrandListResponse: ApiBrandListResponse
): Brand[] =>
  apiBrandListResponse.data.map((apiBrand) => mapApiBrandToBrand(apiBrand));

export const mapGenders = (
  apiGenderListResponse: ApiGenderListResponse
): Gender[] =>
  apiGenderListResponse.data.map((apiGender) =>
    mapApiGenderToGender(apiGender)
  );
