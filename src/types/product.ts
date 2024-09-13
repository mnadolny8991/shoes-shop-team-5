export type ProductImage = {
  id: number;
  name: string;
  alternativeText: string;
  url: string;
};

export type TeamName = 'team-1' | 'team-2' | 'team-3' | 'team-4' | 'team-5';

export type Color = {
  id: number;
  name: string;
};

export type Size = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Brand = {
  id: number;
  name: string;
};

export type Gender = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  brand: Brand;
  color?: Color;
  sizes?: Array<Size>;
  categories?: Array<Category>;
  price: number;
  gender: Gender;
  images: Array<ProductImage>;
  userID?: number;
  teamName: TeamName;
};
