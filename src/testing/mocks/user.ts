import { ApiUserResponse } from '@/types/api/apiTypes';
import { UserAvatar } from '@/types/user';

export const apiUserResponse: ApiUserResponse = {
  id: 764,
  username: 'Serhii',
  email: 'slamanov.laba@solvd.com',
  provider: 'local',
  confirmed: true,
  blocked: false,
  createdAt: '2024-09-20T12:46:38.935Z',
  updatedAt: '2024-10-17T10:01:01.375Z',
  phoneNumber: '5684844848',
  firstName: 'Serhii',
  lastName: 'Lamanov',
  customerId: null,
  avatar: {
    id: 4922,
    name: 'Фото Аватар.png',
    alternativeText: null,
    caption: null,
    width: 328,
    height: 310,
    formats: {
      thumbnail: {
        ext: '.png',
        url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727698566/thumbnail_Foto_Avatar_10f3034f2a.png',
        hash: 'thumbnail_Foto_Avatar_10f3034f2a',
        mime: 'image/png',
        name: 'thumbnail_Фото Аватар.png',
        path: null,
        size: 31.8,
        width: 165,
        height: 156,
        provider_metadata: {
          public_id: 'thumbnail_Foto_Avatar_10f3034f2a',
          resource_type: 'image',
        },
      },
    },
    hash: 'Foto_Avatar_10f3034f2a',
    ext: '.png',
    mime: 'image/png',
    size: 29.72,
    url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727698566/Foto_Avatar_10f3034f2a.png',
    previewUrl: null,
    provider: 'cloudinary',
    provider_metadata: {
      public_id: 'Foto_Avatar_10f3034f2a',
      resource_type: 'image',
    },
    createdAt: '2024-09-30T12:16:07.003Z',
    updatedAt: '2024-09-30T12:16:07.003Z',
  },
};

export const userAvatar: UserAvatar = {
  name: 'Serhii Lamanov',
  src: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727698566/Foto_Avatar_10f3034f2a.png',
  alt: 'your Avatar',
};
