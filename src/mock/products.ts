import type { Product } from '@/types/product';

export const products: Array<Product> = [
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
  {
    id: 3,
    name: 'Nike Air Zoom Pegasus',
    description: 'some description Nike Air Zoom Pegasus',
    price: 120,
    gender: {
      id: 4,
      name: 'Women',
    },
    color: {
      id: 12,
      name: 'red',
    },
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
    sizes: [
      {
        id: 0,
        name: 'EU-36',
      },
      {
        id: 1,
        name: 'EU-37',
      },
      {
        id: 2,
        name: 'EU-38',
      },
      {
        id: 4,
        name: 'EU-40',
      },
      {
        id: 6,
        name: 'EU-42',
      },
      {
        id: 7,
        name: 'EU-43',
      },
      {
        id: 8,
        name: 'EU-44',
      },
      {
        id: 9,
        name: 'EU-45',
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
