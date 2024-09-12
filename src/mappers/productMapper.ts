import {
  ApiColor,
  ApiImage,
  ApiProductResponse,
  ApiSize,
} from '@/types/apiTypes';
import { Color, Product, ProductImage, Size, TeamName } from '@/types/product';

const mapApiImageToProductImage = (apiImage: ApiImage): ProductImage => ({
  id: apiImage.id,
  name: apiImage.attributes.name,
  alternativeText: apiImage.attributes.alternativeText || '',
  url: apiImage.attributes.url,
});

const mapApiColorToColor = (apiColor: ApiColor | null): Color | undefined => {
  if (!apiColor || !apiColor.data) return undefined;
  return {
    id: apiColor.data.id,
    name: apiColor.data.attributes.name,
  };
};

const mapApiSizeToSize = (apiSize: ApiSize): Size => ({
  id: apiSize.id,
  name: apiSize.attributes.value.toString(),
});

const mapProduct = async (
  apiProductResponse: ApiProductResponse
): Promise<Product> => {
  const { id, attributes: apiProduct } = apiProductResponse.data;
  const product: Product = {
    id,
    name: apiProduct.name,
    description: apiProduct.description,
    brand: apiProduct.brand.data.attributes.name,
    color: mapApiColorToColor(apiProduct.color),
    sizes: apiProduct.sizes.data.map(mapApiSizeToSize),
    categories: apiProduct.categories.data.map(
      (category) => category.attributes.name
    ),
    price: apiProduct.price,
    gender: apiProduct.gender.data.attributes.name as 'Men' | 'Women',
    images: apiProduct.images.data.map(mapApiImageToProductImage),
    userID: apiProduct?.userID?.data?.id,
    teamName: apiProduct.teamName as TeamName,
  };
  return product;
};

export default mapProduct;
