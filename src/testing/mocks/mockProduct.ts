import { Product } from '@/types/product';

const mockProduct = {
  id: 1564,
  name: 'Nike Air Max 270',
  description:
    'Boasting the first-ever Max Air unit created specifically for Nike Sportswear, the Nike Air Max 270 delivers an Air unit that absorbs and gives back energy with every springy step. Updated for modern comfort, it nods to the original, 1991 Air Max 180 with its exaggerated tongue top and heritage',
  brand: { id: 9, name: 'Nike' },
  color: { id: 9, name: 'White' },
  sizes: [
    { id: 13, name: '36' },
    { id: 14, name: '37' },
    { id: 15, name: '38' },
    { id: 17, name: '40' },
  ],
  price: 160,
  gender: { id: 4, name: 'Women' },
  images: [
    {
      id: 4394,
      name: 'irene-kredenets.png',
      alternativeText: '',
      url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727117288/thumbnail_irene_kredenets_a910c8d96f.png',
    },
    {
      id: 4581,
      name: 'luis-felipe-lins.png',
      alternativeText: '',
      url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727263245/thumbnail_luis_felipe_lins_1d7e68dca0.png',
    },
  ],
  userID: 764,
  teamName: 'team-5',
} as Product;

export default mockProduct;
