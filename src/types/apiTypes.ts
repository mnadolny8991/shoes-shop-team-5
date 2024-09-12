export type ApiImageFormat = {
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

export type ApiImageAttributes = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: {
    [key: string]: ApiImageFormat;
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

export type ApiImage = {
  id: number;
  attributes: ApiImageAttributes;
};

export type ApiBrandAttributes = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type ApiBrand = {
  data: {
    id: number;
    attributes: ApiBrandAttributes;
  };
};

export type ApiCategoryAttributes = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type ApiCategory = {
  id: number;
  attributes: ApiCategoryAttributes;
};

export type ApiColorAttributes = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type ApiColor = {
  data: {
    id: number;
    attributes: ApiColorAttributes;
  };
};

export type ApiGenderAttributes = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type ApiGender = {
  data: {
    id: number;
    attributes: ApiGenderAttributes;
  };
};

export type ApiSizeAttributes = {
  value: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type ApiSize = {
  id: number;
  attributes: ApiSizeAttributes;
};

export type ApiUserAttributes = {
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

export type ApiUser = {
  data: {
    id: number;
    attributes: ApiUserAttributes;
  };
};

export type ApiProduct = {
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  teamName: string;
  images: {
    data: ApiImage[];
  };
  brand: ApiBrand;
  categories: {
    data: ApiCategory[];
  };
  color: ApiColor;
  gender: ApiGender;
  sizes: {
    data: ApiSize[];
  };
  userID: ApiUser;
};

export type ApiProductResponseDataObject = {
  id: number;
  attributes: ApiProduct;
};

export type ApiProductResponse = {
  data: ApiProductResponseDataObject;
  meta: Record<string, unknown>;
};
