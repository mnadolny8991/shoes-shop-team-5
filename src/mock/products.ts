type ProductImage = {
  id: number;
  name: string;
  alternativeText: string;
  url: string;
};
type TeamName = 'team-1' | 'team-2' | 'team-3' | 'team-4' | 'team-5';
export type Product = {
  id: number;
  name: string;
  description: string;
  brand: string;
  color?: string;
  sizes?: Array<string>;
  categories?: Array<string>;
  price: number;
  gender: 'Male' | 'Female';
  images: Array<ProductImage>;
  userID: number;
  teamName: TeamName;
};

export const products: Array<Product> = [
  {
    id: 0,
    name: 'Nike Air Max 270',
    description: 'some description Nike Air Max 270',
    price: 160,
    gender: 'Female',
    images: [
      {
        id: 0,
        name: 'Nike Air Max 270',
        alternativeText: 'Nike Air Max 270',
        url: '/mock/irene-kredenets.png',
      },
    ],
    brand: 'Nike',
    userID: 0,
    teamName: 'team-5',
  },
  {
    id: 1,
    name: 'Nike Air Max 90',
    description: 'some description Nike Air Max 90',
    price: 140,
    gender: 'Male',
    images: [
      {
        id: 0,
        name: 'Nike Air Max 90',
        alternativeText: 'Nike Air Max 90',
        url: '/mock/imani-bahati.png',
      },
    ],
    brand: 'Nike',
    userID: 0,
    teamName: 'team-5',
  },
  {
    id: 2,
    name: "Nike Air Force 1 '07 SE",
    description: "some description about Nike Air Force 1 '07 SE",
    price: 110,
    gender: 'Female',
    images: [
      {
        id: 0,
        name: "Nike Air Force 1 '07 SE",
        alternativeText: "Nike Air Force 1 '07 SE",
        url: '/mock/luis-felipe-lins.png',
      },
    ],
    brand: 'Nike',
    userID: 0,
    teamName: 'team-5',
  },
  {
    id: 3,
    name: 'Nike Air Zoom Pegasus',
    description: 'some description Nike Air Zoom Pegasus',
    price: 120,
    gender: 'Male',
    images: [
      {
        id: 0,
        name: 'Nike Air Zoom Pegasus',
        alternativeText: 'Nike Air Zoom Pegasus',
        url: '/mock/pexels-ray-piedra.png',
      },
      {
        id: 1,
        name: 'Nike Air Zoom Pegasus',
        alternativeText: 'Nike Air Zoom Pegasus',
        url: 'https://placehold.co/300x300',
      },
      {
        id: 2,
        name: 'Nike Air Zoom Pegasus',
        alternativeText: 'Nike Air Zoom Pegasus',
        url: 'https://placehold.co/300x300',
      },
      {
        id: 3,
        name: 'Nike Air Zoom Pegasus',
        alternativeText: 'Nike Air Zoom Pegasus',
        url: 'https://placehold.co/300x300',
      },
      {
        id: 4,
        name: 'Nike Air Zoom Pegasus',
        alternativeText: 'Nike Air Zoom Pegasus',
        url: 'https://placehold.co/300x300',
      },
      {
        id: 5,
        name: 'Nike Air Zoom Pegasus',
        alternativeText: 'Nike Air Zoom Pegasus',
        url: 'https://placehold.co/300x300',
      },
      {
        id: 6,
        name: 'Nike Air Zoom Pegasus',
        alternativeText: 'Nike Air Zoom Pegasus',
        url: 'https://placehold.co/300x300',
      },
    ],
    brand: 'Nike',
    userID: 0,
    teamName: 'team-5',
  },
];
