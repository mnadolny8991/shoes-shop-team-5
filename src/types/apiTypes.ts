type ApiListMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};
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
  id: number;
  attributes: ApiBrandAttributes;
};

export type ApiBrandListResponse = {
  data: ApiBrand[];
  meta: ApiListMeta;
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

export type ApiCategoryListResponse = {
  data: ApiCategory[];
  meta: ApiListMeta;
};

export type ApiColorAttributes = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type ApiColor = {
  id: number;
  attributes: ApiColorAttributes;
};

export type ApiColorListResponse = {
  data: ApiColor[];
  meta: ApiListMeta;
};

export type ApiGenderAttributes = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type ApiGender = {
  id: number;
  attributes: ApiGenderAttributes;
};

export type ApiGenderListResponse = {
  data: ApiGender[];
  meta: ApiListMeta;
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

export type ApiSizeListResponse = {
  data: ApiSize[];
  meta: ApiListMeta;
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
  brand: {
    data: ApiBrand;
  };
  categories: {
    data: ApiCategory[];
  };
  color: {
    data: ApiColor;
  };
  gender: {
    data: ApiGender;
  };
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

export type ApiProductListResponseDataItem = {
  id: number;
  attributes: ApiProduct;
};

export type ApiProductListResponse = {
  data: ApiProductListResponseDataItem[];
  meta: ApiListMeta;
};
