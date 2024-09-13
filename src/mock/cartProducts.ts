import { Product } from '@/types/product';

const cartProducts: Array<Product> = [
  {
    id: 0,
    name: 'Nike Air Max 270',
    description: 'some description Nike Air Max 270',
    price: 160,
    gender: {
      id: 4,
      name: 'Women',
    },
    images: [
      {
        id: 0,
        name: 'Nike Air Max 270',
        alternativeText: 'Nike Air Max 270',
        url: '/mock/irene-kredenets.png',
      },
    ],
    brand: {
      id: 9,
      name: 'Nike',
    },
    userID: 0,
    teamName: 'team-5',
  },
  {
    id: 1,
    name: 'Nike Air Max 90',
    description: 'some description Nike Air Max 90',
    price: 140,
    gender: {
      id: 3,
      name: 'Men',
    },
    images: [
      {
        id: 0,
        name: 'Nike Air Max 90',
        alternativeText: 'Nike Air Max 90',
        url: '/mock/imani-bahati.png',
      },
    ],
    brand: {
      id: 9,
      name: 'Nike',
    },
    userID: 0,
    teamName: 'team-5',
  },
  {
    id: 2,
    name: "Nike Air Force 1 '07 SE",
    description: "some description about Nike Air Force 1 '07 SE",
    price: 110,
    gender: {
      id: 4,
      name: 'Women',
    },
    images: [
      {
        id: 0,
        name: "Nike Air Force 1 '07 SE",
        alternativeText: "Nike Air Force 1 '07 SE",
        url: '/mock/luis-felipe-lins.png',
      },
    ],
    brand: {
      id: 9,
      name: 'Nike',
    },
    userID: 0,
    teamName: 'team-5',
  },
];

export default cartProducts;
