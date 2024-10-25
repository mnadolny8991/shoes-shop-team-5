import { Color } from '@/mock/ALL_COLORS';

export type ProductImage = {
  id: number;
  name: string;
  alternativeText: string;
  url: string;
};

export type TeamName = 'team-1' | 'team-2' | 'team-3' | 'team-4' | 'team-5';

export type Size = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  brand: string;
  color?: Array<Color>;
  sizes?: Array<Size>;
  categories?: Array<string>;
  price: number;
  gender: 'Male' | 'Female';
  images: Array<ProductImage>;
  userID: number;
  teamName: TeamName;
};
