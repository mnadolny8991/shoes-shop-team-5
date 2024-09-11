export type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
};

export type ImageAttributes = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: {
    [key: string]: ImageFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type Image = {
  id: number;
  attributes: ImageAttributes;
};

export type BrandAttributes = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Brand = {
  data: {
    id: number;
    attributes: BrandAttributes;
  };
};

export type CategoryAttributes = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Category = {
  id: number;
  attributes: CategoryAttributes;
};

export type ColorAttributes = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Color = {
  data: {
    id: number;
    attributes: ColorAttributes;
  };
};

export type GenderAttributes = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Gender = {
  data: {
    id: number;
    attributes: GenderAttributes;
  };
};

export type SizeAttributes = {
  value: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Size = {
  id: number;
  attributes: SizeAttributes;
};

export type UserAttributes = {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
};

export type User = {
  data: {
    id: number;
    attributes: UserAttributes;
  };
};

export type Product = {
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  teamName: string;
  images: {
    data: Image[];
  };
  brand: Brand;
  categories: {
    data: Category[];
  };
  color: Color;
  gender: Gender;
  sizes: {
    data: Size[];
  };
  userID: User;
};

export type ProductResponseDataObject = {
  id: number;
  attributes: Product;
};

export type ProductResponse = {
  data: ProductResponseDataObject;
  meta: Record<string, unknown>;
};
