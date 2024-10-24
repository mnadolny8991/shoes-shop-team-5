import {
  ApiProductListResponse,
  ApiProductResponse,
} from '@/types/api/apiTypes';
import { Product } from '@/types/product';

export const apiProductResponse1564: ApiProductResponse = {
  data: {
    id: 1564,
    attributes: {
      name: 'Nike Air Max 270',
      description:
        'Boasting the first-ever Max Air unit created specifically for Nike Sportswear, the Nike Air Max 270 delivers an Air unit that absorbs and gives back energy with every springy step. Updated for modern comfort, it nods to the original, 1991 Air Max 180 with its exaggerated tongue top and heritage',
      price: 160,
      createdAt: '2024-09-23T18:48:09.378Z',
      updatedAt: '2024-10-03T17:56:28.021Z',
      publishedAt: '2024-09-23T18:48:09.369Z',
      teamName: 'team-5',
      images: {
        data: [
          {
            id: 4394,
            attributes: {
              name: 'irene-kredenets.png',
              alternativeText: null,
              caption: null,
              width: 320,
              height: 380,
              formats: {
                thumbnail: {
                  ext: '.png',
                  url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727117288/thumbnail_irene_kredenets_a910c8d96f.png',
                  hash: 'thumbnail_irene_kredenets_a910c8d96f',
                  mime: 'image/png',
                  name: 'thumbnail_irene-kredenets.png',
                  path: null,
                  size: 24.65,
                  width: 131,
                  height: 156,
                  provider_metadata: {
                    public_id: 'thumbnail_irene_kredenets_a910c8d96f',
                    resource_type: 'image',
                  },
                },
              },
              hash: 'irene_kredenets_a910c8d96f',
              ext: '.png',
              mime: 'image/png',
              size: 36.16,
              url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727117288/irene_kredenets_a910c8d96f.png',
              previewUrl: null,
              provider: 'cloudinary',
              provider_metadata: {
                public_id: 'irene_kredenets_a910c8d96f',
                resource_type: 'image',
              },
              createdAt: '2024-09-23T18:48:09.082Z',
              updatedAt: '2024-09-23T18:48:09.082Z',
            },
          },
          {
            id: 4581,
            attributes: {
              name: 'luis-felipe-lins.png',
              alternativeText: null,
              caption: null,
              width: 320,
              height: 380,
              formats: {
                thumbnail: {
                  ext: '.png',
                  url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727263245/thumbnail_luis_felipe_lins_1d7e68dca0.png',
                  hash: 'thumbnail_luis_felipe_lins_1d7e68dca0',
                  mime: 'image/png',
                  name: 'thumbnail_luis-felipe-lins.png',
                  path: null,
                  size: 23.79,
                  width: 131,
                  height: 156,
                  provider_metadata: {
                    public_id: 'thumbnail_luis_felipe_lins_1d7e68dca0',
                    resource_type: 'image',
                  },
                },
              },
              hash: 'luis_felipe_lins_1d7e68dca0',
              ext: '.png',
              mime: 'image/png',
              size: 48.51,
              url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727263245/luis_felipe_lins_1d7e68dca0.png',
              previewUrl: null,
              provider: 'cloudinary',
              provider_metadata: {
                public_id: 'luis_felipe_lins_1d7e68dca0',
                resource_type: 'image',
              },
              createdAt: '2024-09-25T11:20:45.862Z',
              updatedAt: '2024-09-25T11:20:45.862Z',
            },
          },
        ],
      },
      brand: {
        data: {
          id: 9,
          attributes: {
            name: 'Nike',
            createdAt: '2023-05-10T09:56:13.326Z',
            updatedAt: '2023-05-10T10:01:09.592Z',
            publishedAt: '2023-05-10T09:56:15.258Z',
          },
        },
      },
      categories: {
        data: [],
      },
      color: {
        data: {
          id: 9,
          attributes: {
            name: 'White',
            createdAt: '2023-05-10T09:57:16.342Z',
            updatedAt: '2023-05-10T09:57:17.525Z',
            publishedAt: '2023-05-10T09:57:17.522Z',
          },
        },
      },
      gender: {
        data: {
          id: 4,
          attributes: {
            name: 'Women',
            createdAt: '2023-05-10T10:01:00.195Z',
            updatedAt: '2023-05-10T10:01:01.109Z',
            publishedAt: '2023-05-10T10:01:01.106Z',
          },
        },
      },
      sizes: {
        data: [
          {
            id: 13,
            attributes: {
              value: 36,
              createdAt: '2023-05-10T09:59:15.816Z',
              updatedAt: '2023-05-10T09:59:16.774Z',
              publishedAt: '2023-05-10T09:59:16.771Z',
            },
          },
          {
            id: 14,
            attributes: {
              value: 37,
              createdAt: '2023-05-10T09:59:25.506Z',
              updatedAt: '2023-05-10T09:59:26.626Z',
              publishedAt: '2023-05-10T09:59:26.623Z',
            },
          },
          {
            id: 15,
            attributes: {
              value: 38,
              createdAt: '2023-05-10T09:59:31.262Z',
              updatedAt: '2023-05-10T09:59:32.072Z',
              publishedAt: '2023-05-10T09:59:32.070Z',
            },
          },
          {
            id: 17,
            attributes: {
              value: 40,
              createdAt: '2023-05-10T09:59:46.561Z',
              updatedAt: '2023-05-10T09:59:47.405Z',
              publishedAt: '2023-05-10T09:59:47.402Z',
            },
          },
        ],
      },
      userID: {
        data: {
          id: 764,
          attributes: {
            username: 'Serhii',
            email: 'slamanov.laba@solvd.com',
            provider: 'local',
            confirmed: true,
            blocked: false,
            createdAt: '2024-09-20T12:46:38.935Z',
            updatedAt: '2024-10-17T10:01:01.375Z',
            phoneNumber: '5684844848',
            firstName: 'wer',
            lastName: 'asd',
            customerId: null,
          },
        },
      },
    },
  },
  meta: {},
};

export const apiProductResponse1476: ApiProductResponse = {
  data: {
    id: 1476,
    attributes: {
      name: 'Nike air max 90',
      description:
        'Indulge in legendary comfort and style with the iconic Nike Air Max 90, featuring its revolutionary visible Air unit for unparalleled cushioning and a classic design that transcends time.',
      price: 50,
      createdAt: '2024-09-19T12:13:04.495Z',
      updatedAt: '2024-10-18T15:03:25.281Z',
      publishedAt: '2024-09-19T12:13:04.490Z',
      teamName: 'team-5',
      images: {
        data: [
          {
            id: 4073,
            attributes: {
              name: 'pexels-ray-piedra-1456737.png',
              alternativeText: null,
              caption: null,
              width: 320,
              height: 380,
              formats: {
                thumbnail: {
                  ext: '.png',
                  url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1726747983/thumbnail_pexels_ray_piedra_1456737_8a0b08f6ad.png',
                  hash: 'thumbnail_pexels_ray_piedra_1456737_8a0b08f6ad',
                  mime: 'image/png',
                  name: 'thumbnail_pexels-ray-piedra-1456737.png',
                  path: null,
                  size: 27.58,
                  width: 131,
                  height: 156,
                  provider_metadata: {
                    public_id: 'thumbnail_pexels_ray_piedra_1456737_8a0b08f6ad',
                    resource_type: 'image',
                  },
                },
              },
              hash: 'pexels_ray_piedra_1456737_8a0b08f6ad',
              ext: '.png',
              mime: 'image/png',
              size: 34.62,
              url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1726747983/pexels_ray_piedra_1456737_8a0b08f6ad.png',
              previewUrl: null,
              provider: 'cloudinary',
              provider_metadata: {
                public_id: 'pexels_ray_piedra_1456737_8a0b08f6ad',
                resource_type: 'image',
              },
              createdAt: '2024-09-19T12:13:04.342Z',
              updatedAt: '2024-09-19T12:13:04.342Z',
            },
          },
          {
            id: 4072,
            attributes: {
              name: 'imani-bahati-LxVxPA1LOVM-unsplash 1.png',
              alternativeText: null,
              caption: null,
              width: 320,
              height: 380,
              formats: {
                thumbnail: {
                  ext: '.png',
                  url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1726747983/thumbnail_imani_bahati_Lx_Vx_PA_1_LOVM_unsplash_1_e619448fa1.png',
                  hash: 'thumbnail_imani_bahati_Lx_Vx_PA_1_LOVM_unsplash_1_e619448fa1',
                  mime: 'image/png',
                  name: 'thumbnail_imani-bahati-LxVxPA1LOVM-unsplash 1.png',
                  path: null,
                  size: 28.71,
                  width: 131,
                  height: 156,
                  provider_metadata: {
                    public_id:
                      'thumbnail_imani_bahati_Lx_Vx_PA_1_LOVM_unsplash_1_e619448fa1',
                    resource_type: 'image',
                  },
                },
              },
              hash: 'imani_bahati_Lx_Vx_PA_1_LOVM_unsplash_1_e619448fa1',
              ext: '.png',
              mime: 'image/png',
              size: 42.21,
              url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1726747983/imani_bahati_Lx_Vx_PA_1_LOVM_unsplash_1_e619448fa1.png',
              previewUrl: null,
              provider: 'cloudinary',
              provider_metadata: {
                public_id: 'imani_bahati_Lx_Vx_PA_1_LOVM_unsplash_1_e619448fa1',
                resource_type: 'image',
              },
              createdAt: '2024-09-19T12:13:04.141Z',
              updatedAt: '2024-09-19T12:13:04.141Z',
            },
          },
          {
            id: 5794,
            attributes: {
              name: 'shoes-photo.png',
              alternativeText: null,
              caption: null,
              width: 936,
              height: 1170,
              formats: {
                thumbnail: {
                  ext: '.png',
                  url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1729253782/thumbnail_shoes_photo_0b78b5e43b.webp',
                  hash: 'thumbnail_shoes_photo_0b78b5e43b',
                  mime: 'image/png',
                  name: 'thumbnail_shoes-photo.png',
                  path: null,
                  size: 0.99,
                  width: 125,
                  height: 156,
                  provider_metadata: {
                    public_id: 'thumbnail_shoes_photo_0b78b5e43b',
                    resource_type: 'image',
                  },
                },
              },
              hash: 'shoes_photo_0b78b5e43b',
              ext: '.png',
              mime: 'image/png',
              size: 24.36,
              url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1729253782/shoes_photo_0b78b5e43b.webp',
              previewUrl: null,
              provider: 'cloudinary',
              provider_metadata: {
                public_id: 'shoes_photo_0b78b5e43b',
                resource_type: 'image',
              },
              createdAt: '2024-10-18T12:16:22.765Z',
              updatedAt: '2024-10-18T12:16:22.765Z',
            },
          },
        ],
      },
      brand: {
        data: {
          id: 9,
          attributes: {
            name: 'Nike',
            createdAt: '2023-05-10T09:56:13.326Z',
            updatedAt: '2023-05-10T10:01:09.592Z',
            publishedAt: '2023-05-10T09:56:15.258Z',
          },
        },
      },
      categories: {
        data: [],
      },
      color: {
        data: {
          id: 8,
          attributes: {
            name: 'Black',
            createdAt: '2023-05-10T09:57:09.847Z',
            updatedAt: '2023-05-10T09:57:11.037Z',
            publishedAt: '2023-05-10T09:57:11.034Z',
          },
        },
      },
      gender: {
        data: {
          id: 3,
          attributes: {
            name: 'Men',
            createdAt: '2023-05-10T10:00:54.425Z',
            updatedAt: '2023-05-10T10:00:55.441Z',
            publishedAt: '2023-05-10T10:00:55.438Z',
          },
        },
      },
      sizes: {
        data: [
          {
            id: 17,
            attributes: {
              value: 40,
              createdAt: '2023-05-10T09:59:46.561Z',
              updatedAt: '2023-05-10T09:59:47.405Z',
              publishedAt: '2023-05-10T09:59:47.402Z',
            },
          },
          {
            id: 19,
            attributes: {
              value: 42,
              createdAt: '2023-05-10T09:59:57.267Z',
              updatedAt: '2023-05-10T09:59:58.216Z',
              publishedAt: '2023-05-10T09:59:58.213Z',
            },
          },
          {
            id: 18,
            attributes: {
              value: 41,
              createdAt: '2023-05-10T09:59:50.967Z',
              updatedAt: '2023-05-10T09:59:51.740Z',
              publishedAt: '2023-05-10T09:59:51.737Z',
            },
          },
          {
            id: 20,
            attributes: {
              value: 43,
              createdAt: '2023-05-10T10:00:02.179Z',
              updatedAt: '2023-05-10T10:00:03.001Z',
              publishedAt: '2023-05-10T10:00:02.998Z',
            },
          },
          {
            id: 21,
            attributes: {
              value: 44,
              createdAt: '2023-05-10T10:00:07.874Z',
              updatedAt: '2023-05-10T10:00:08.643Z',
              publishedAt: '2023-05-10T10:00:08.640Z',
            },
          },
          {
            id: 22,
            attributes: {
              value: 45,
              createdAt: '2023-05-10T10:00:12.279Z',
              updatedAt: '2023-05-10T10:00:13.125Z',
              publishedAt: '2023-05-10T10:00:13.122Z',
            },
          },
        ],
      },
      userID: {
        data: {
          id: 679,
          attributes: {
            username: 'mnadolny',
            email: 'mnadolny.laba@solvd.com',
            provider: 'local',
            confirmed: true,
            blocked: false,
            createdAt: '2024-09-05T12:12:38.036Z',
            updatedAt: '2024-10-15T08:25:01.769Z',
            phoneNumber: '7257277772',
            firstName: 'Michal',
            lastName: 'Nadolny',
            customerId: null,
          },
        },
      },
    },
  },
  meta: {},
};

export const product1476: Product = {
  id: 1476,
  name: 'Nike air max 90',
  description:
    'Indulge in legendary comfort and style with the iconic Nike Air Max 90, featuring its revolutionary visible Air unit for unparalleled cushioning and a classic design that transcends time.',
  brand: { id: 9, name: 'Nike' },
  color: { id: 8, name: 'Black' },
  sizes: [
    { id: 17, name: '40' },
    { id: 19, name: '42' },
    { id: 18, name: '41' },
    { id: 20, name: '43' },
    { id: 21, name: '44' },
    { id: 22, name: '45' },
  ],
  categories: [],
  price: 50,
  gender: { id: 3, name: 'Men' },
  images: [
    {
      id: 4073,
      name: 'pexels-ray-piedra-1456737.png',
      alternativeText: '',
      url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1726747983/pexels_ray_piedra_1456737_8a0b08f6ad.png',
    },
    {
      id: 4072,
      name: 'imani-bahati-LxVxPA1LOVM-unsplash 1.png',
      alternativeText: '',
      url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1726747983/imani_bahati_Lx_Vx_PA_1_LOVM_unsplash_1_e619448fa1.png',
    },
    {
      id: 5794,
      name: 'shoes-photo.png',
      alternativeText: '',
      url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1729253782/shoes_photo_0b78b5e43b.webp',
    },
  ],
  userID: 679,
  teamName: 'team-5',
};

export const apiProductListResponse: ApiProductListResponse = {
  data: [
    {
      id: 2084,
      attributes: {
        name: 'Nike Kyrie 23',
        description:
          'The Nike Kyrie 2 is a basketball shoe designed for Kyrie Irving, featuring a breathable mesh upper, a responsive Zoom Air unit, and a flexible outsole for quick movements and superior court feel.',
        price: 132,
        createdAt: '2024-10-18T15:03:45.813Z',
        updatedAt: '2024-10-18T15:03:45.813Z',
        publishedAt: '2024-10-18T15:03:45.808Z',
        teamName: 'team-5',
        images: {
          data: [
            {
              id: 4126,
              attributes: {
                name: 'pexels-ray-piedra-1456737.png',
                alternativeText: null,
                caption: null,
                width: 320,
                height: 380,
                formats: {
                  thumbnail: {
                    ext: '.png',
                    url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1726762533/thumbnail_pexels_ray_piedra_1456737_1781498332.png',
                    hash: 'thumbnail_pexels_ray_piedra_1456737_1781498332',
                    mime: 'image/png',
                    name: 'thumbnail_pexels-ray-piedra-1456737.png',
                    path: null,
                    size: 27.58,
                    width: 131,
                    height: 156,
                    provider_metadata: {
                      public_id:
                        'thumbnail_pexels_ray_piedra_1456737_1781498332',
                      resource_type: 'image',
                    },
                  },
                },
                hash: 'pexels_ray_piedra_1456737_1781498332',
                ext: '.png',
                mime: 'image/png',
                size: 34.62,
                url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1726762533/pexels_ray_piedra_1456737_1781498332.png',
                previewUrl: null,
                provider: 'cloudinary',
                provider_metadata: {
                  public_id: 'pexels_ray_piedra_1456737_1781498332',
                  resource_type: 'image',
                },
                createdAt: '2024-09-19T16:15:33.610Z',
                updatedAt: '2024-09-19T16:15:33.610Z',
              },
            },
          ],
        },
        brand: {
          data: {
            id: 9,
            attributes: {
              name: 'Nike',
              createdAt: '2023-05-10T09:56:13.326Z',
              updatedAt: '2023-05-10T10:01:09.592Z',
              publishedAt: '2023-05-10T09:56:15.258Z',
            },
          },
        },
        categories: {
          data: [],
        },
        color: {
          data: {
            id: 8,
            attributes: {
              name: 'Black',
              createdAt: '2023-05-10T09:57:09.847Z',
              updatedAt: '2023-05-10T09:57:11.037Z',
              publishedAt: '2023-05-10T09:57:11.034Z',
            },
          },
        },
        gender: {
          data: {
            id: 3,
            attributes: {
              name: 'Men',
              createdAt: '2023-05-10T10:00:54.425Z',
              updatedAt: '2023-05-10T10:00:55.441Z',
              publishedAt: '2023-05-10T10:00:55.438Z',
            },
          },
        },
        sizes: {
          data: [
            {
              id: 14,
              attributes: {
                value: 37,
                createdAt: '2023-05-10T09:59:25.506Z',
                updatedAt: '2023-05-10T09:59:26.626Z',
                publishedAt: '2023-05-10T09:59:26.623Z',
              },
            },
            {
              id: 19,
              attributes: {
                value: 42,
                createdAt: '2023-05-10T09:59:57.267Z',
                updatedAt: '2023-05-10T09:59:58.216Z',
                publishedAt: '2023-05-10T09:59:58.213Z',
              },
            },
            {
              id: 24,
              attributes: {
                value: 47,
                createdAt: '2023-05-10T10:00:26.580Z',
                updatedAt: '2023-05-10T10:00:27.504Z',
                publishedAt: '2023-05-10T10:00:27.501Z',
              },
            },
            {
              id: 20,
              attributes: {
                value: 43,
                createdAt: '2023-05-10T10:00:02.179Z',
                updatedAt: '2023-05-10T10:00:03.001Z',
                publishedAt: '2023-05-10T10:00:02.998Z',
              },
            },
          ],
        },
        userID: {
          data: {
            id: 679,
            attributes: {
              username: 'mnadolny',
              email: 'mnadolny.laba@solvd.com',
              provider: 'local',
              confirmed: true,
              blocked: false,
              createdAt: '2024-09-05T12:12:38.036Z',
              updatedAt: '2024-10-15T08:25:01.769Z',
              phoneNumber: '7257277772',
              firstName: 'Michal',
              lastName: 'Nadolny',
              customerId: null,
            },
          },
        },
      },
    },
    {
      id: 1564,
      attributes: {
        name: 'Nike Air Max 270',
        description:
          'Boasting the first-ever Max Air unit created specifically for Nike Sportswear, the Nike Air Max 270 delivers an Air unit that absorbs and gives back energy with every springy step. Updated for modern comfort, it nods to the original, 1991 Air Max 180 with its exaggerated tongue top and heritage',
        price: 160,
        createdAt: '2024-09-23T18:48:09.378Z',
        updatedAt: '2024-10-03T17:56:28.021Z',
        publishedAt: '2024-09-23T18:48:09.369Z',
        teamName: 'team-5',
        images: {
          data: [
            {
              id: 4394,
              attributes: {
                name: 'irene-kredenets.png',
                alternativeText: null,
                caption: null,
                width: 320,
                height: 380,
                formats: {
                  thumbnail: {
                    ext: '.png',
                    url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727117288/thumbnail_irene_kredenets_a910c8d96f.png',
                    hash: 'thumbnail_irene_kredenets_a910c8d96f',
                    mime: 'image/png',
                    name: 'thumbnail_irene-kredenets.png',
                    path: null,
                    size: 24.65,
                    width: 131,
                    height: 156,
                    provider_metadata: {
                      public_id: 'thumbnail_irene_kredenets_a910c8d96f',
                      resource_type: 'image',
                    },
                  },
                },
                hash: 'irene_kredenets_a910c8d96f',
                ext: '.png',
                mime: 'image/png',
                size: 36.16,
                url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727117288/irene_kredenets_a910c8d96f.png',
                previewUrl: null,
                provider: 'cloudinary',
                provider_metadata: {
                  public_id: 'irene_kredenets_a910c8d96f',
                  resource_type: 'image',
                },
                createdAt: '2024-09-23T18:48:09.082Z',
                updatedAt: '2024-09-23T18:48:09.082Z',
              },
            },
            {
              id: 4581,
              attributes: {
                name: 'luis-felipe-lins.png',
                alternativeText: null,
                caption: null,
                width: 320,
                height: 380,
                formats: {
                  thumbnail: {
                    ext: '.png',
                    url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727263245/thumbnail_luis_felipe_lins_1d7e68dca0.png',
                    hash: 'thumbnail_luis_felipe_lins_1d7e68dca0',
                    mime: 'image/png',
                    name: 'thumbnail_luis-felipe-lins.png',
                    path: null,
                    size: 23.79,
                    width: 131,
                    height: 156,
                    provider_metadata: {
                      public_id: 'thumbnail_luis_felipe_lins_1d7e68dca0',
                      resource_type: 'image',
                    },
                  },
                },
                hash: 'luis_felipe_lins_1d7e68dca0',
                ext: '.png',
                mime: 'image/png',
                size: 48.51,
                url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727263245/luis_felipe_lins_1d7e68dca0.png',
                previewUrl: null,
                provider: 'cloudinary',
                provider_metadata: {
                  public_id: 'luis_felipe_lins_1d7e68dca0',
                  resource_type: 'image',
                },
                createdAt: '2024-09-25T11:20:45.862Z',
                updatedAt: '2024-09-25T11:20:45.862Z',
              },
            },
          ],
        },
        brand: {
          data: {
            id: 9,
            attributes: {
              name: 'Nike',
              createdAt: '2023-05-10T09:56:13.326Z',
              updatedAt: '2023-05-10T10:01:09.592Z',
              publishedAt: '2023-05-10T09:56:15.258Z',
            },
          },
        },
        categories: {
          data: [],
        },
        color: {
          data: {
            id: 9,
            attributes: {
              name: 'White',
              createdAt: '2023-05-10T09:57:16.342Z',
              updatedAt: '2023-05-10T09:57:17.525Z',
              publishedAt: '2023-05-10T09:57:17.522Z',
            },
          },
        },
        gender: {
          data: {
            id: 4,
            attributes: {
              name: 'Women',
              createdAt: '2023-05-10T10:01:00.195Z',
              updatedAt: '2023-05-10T10:01:01.109Z',
              publishedAt: '2023-05-10T10:01:01.106Z',
            },
          },
        },
        sizes: {
          data: [
            {
              id: 13,
              attributes: {
                value: 36,
                createdAt: '2023-05-10T09:59:15.816Z',
                updatedAt: '2023-05-10T09:59:16.774Z',
                publishedAt: '2023-05-10T09:59:16.771Z',
              },
            },
            {
              id: 14,
              attributes: {
                value: 37,
                createdAt: '2023-05-10T09:59:25.506Z',
                updatedAt: '2023-05-10T09:59:26.626Z',
                publishedAt: '2023-05-10T09:59:26.623Z',
              },
            },
            {
              id: 15,
              attributes: {
                value: 38,
                createdAt: '2023-05-10T09:59:31.262Z',
                updatedAt: '2023-05-10T09:59:32.072Z',
                publishedAt: '2023-05-10T09:59:32.070Z',
              },
            },
            {
              id: 17,
              attributes: {
                value: 40,
                createdAt: '2023-05-10T09:59:46.561Z',
                updatedAt: '2023-05-10T09:59:47.405Z',
                publishedAt: '2023-05-10T09:59:47.402Z',
              },
            },
          ],
        },
        userID: {
          data: {
            id: 764,
            attributes: {
              username: 'Serhii',
              email: 'slamanov.laba@solvd.com',
              provider: 'local',
              confirmed: true,
              blocked: false,
              createdAt: '2024-09-20T12:46:38.935Z',
              updatedAt: '2024-10-17T10:01:01.375Z',
              phoneNumber: '5684844848',
              firstName: 'wer',
              lastName: 'asd',
              customerId: null,
            },
          },
        },
      },
    },
    {
      id: 1476,
      attributes: {
        name: 'Nike air max 90',
        description:
          'Indulge in legendary comfort and style with the iconic Nike Air Max 90, featuring its revolutionary visible Air unit for unparalleled cushioning and a classic design that transcends time.',
        price: 50,
        createdAt: '2024-09-19T12:13:04.495Z',
        updatedAt: '2024-10-18T15:03:25.281Z',
        publishedAt: '2024-09-19T12:13:04.490Z',
        teamName: 'team-5',
        images: {
          data: [
            {
              id: 4073,
              attributes: {
                name: 'pexels-ray-piedra-1456737.png',
                alternativeText: null,
                caption: null,
                width: 320,
                height: 380,
                formats: {
                  thumbnail: {
                    ext: '.png',
                    url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1726747983/thumbnail_pexels_ray_piedra_1456737_8a0b08f6ad.png',
                    hash: 'thumbnail_pexels_ray_piedra_1456737_8a0b08f6ad',
                    mime: 'image/png',
                    name: 'thumbnail_pexels-ray-piedra-1456737.png',
                    path: null,
                    size: 27.58,
                    width: 131,
                    height: 156,
                    provider_metadata: {
                      public_id:
                        'thumbnail_pexels_ray_piedra_1456737_8a0b08f6ad',
                      resource_type: 'image',
                    },
                  },
                },
                hash: 'pexels_ray_piedra_1456737_8a0b08f6ad',
                ext: '.png',
                mime: 'image/png',
                size: 34.62,
                url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1726747983/pexels_ray_piedra_1456737_8a0b08f6ad.png',
                previewUrl: null,
                provider: 'cloudinary',
                provider_metadata: {
                  public_id: 'pexels_ray_piedra_1456737_8a0b08f6ad',
                  resource_type: 'image',
                },
                createdAt: '2024-09-19T12:13:04.342Z',
                updatedAt: '2024-09-19T12:13:04.342Z',
              },
            },
            {
              id: 4072,
              attributes: {
                name: 'imani-bahati-LxVxPA1LOVM-unsplash 1.png',
                alternativeText: null,
                caption: null,
                width: 320,
                height: 380,
                formats: {
                  thumbnail: {
                    ext: '.png',
                    url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1726747983/thumbnail_imani_bahati_Lx_Vx_PA_1_LOVM_unsplash_1_e619448fa1.png',
                    hash: 'thumbnail_imani_bahati_Lx_Vx_PA_1_LOVM_unsplash_1_e619448fa1',
                    mime: 'image/png',
                    name: 'thumbnail_imani-bahati-LxVxPA1LOVM-unsplash 1.png',
                    path: null,
                    size: 28.71,
                    width: 131,
                    height: 156,
                    provider_metadata: {
                      public_id:
                        'thumbnail_imani_bahati_Lx_Vx_PA_1_LOVM_unsplash_1_e619448fa1',
                      resource_type: 'image',
                    },
                  },
                },
                hash: 'imani_bahati_Lx_Vx_PA_1_LOVM_unsplash_1_e619448fa1',
                ext: '.png',
                mime: 'image/png',
                size: 42.21,
                url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1726747983/imani_bahati_Lx_Vx_PA_1_LOVM_unsplash_1_e619448fa1.png',
                previewUrl: null,
                provider: 'cloudinary',
                provider_metadata: {
                  public_id:
                    'imani_bahati_Lx_Vx_PA_1_LOVM_unsplash_1_e619448fa1',
                  resource_type: 'image',
                },
                createdAt: '2024-09-19T12:13:04.141Z',
                updatedAt: '2024-09-19T12:13:04.141Z',
              },
            },
            {
              id: 5794,
              attributes: {
                name: 'shoes-photo.png',
                alternativeText: null,
                caption: null,
                width: 936,
                height: 1170,
                formats: {
                  thumbnail: {
                    ext: '.png',
                    url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1729253782/thumbnail_shoes_photo_0b78b5e43b.webp',
                    hash: 'thumbnail_shoes_photo_0b78b5e43b',
                    mime: 'image/png',
                    name: 'thumbnail_shoes-photo.png',
                    path: null,
                    size: 0.99,
                    width: 125,
                    height: 156,
                    provider_metadata: {
                      public_id: 'thumbnail_shoes_photo_0b78b5e43b',
                      resource_type: 'image',
                    },
                  },
                },
                hash: 'shoes_photo_0b78b5e43b',
                ext: '.png',
                mime: 'image/png',
                size: 24.36,
                url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1729253782/shoes_photo_0b78b5e43b.webp',
                previewUrl: null,
                provider: 'cloudinary',
                provider_metadata: {
                  public_id: 'shoes_photo_0b78b5e43b',
                  resource_type: 'image',
                },
                createdAt: '2024-10-18T12:16:22.765Z',
                updatedAt: '2024-10-18T12:16:22.765Z',
              },
            },
          ],
        },
        brand: {
          data: {
            id: 9,
            attributes: {
              name: 'Nike',
              createdAt: '2023-05-10T09:56:13.326Z',
              updatedAt: '2023-05-10T10:01:09.592Z',
              publishedAt: '2023-05-10T09:56:15.258Z',
            },
          },
        },
        categories: {
          data: [],
        },
        color: {
          data: {
            id: 8,
            attributes: {
              name: 'Black',
              createdAt: '2023-05-10T09:57:09.847Z',
              updatedAt: '2023-05-10T09:57:11.037Z',
              publishedAt: '2023-05-10T09:57:11.034Z',
            },
          },
        },
        gender: {
          data: {
            id: 3,
            attributes: {
              name: 'Men',
              createdAt: '2023-05-10T10:00:54.425Z',
              updatedAt: '2023-05-10T10:00:55.441Z',
              publishedAt: '2023-05-10T10:00:55.438Z',
            },
          },
        },
        sizes: {
          data: [
            {
              id: 17,
              attributes: {
                value: 40,
                createdAt: '2023-05-10T09:59:46.561Z',
                updatedAt: '2023-05-10T09:59:47.405Z',
                publishedAt: '2023-05-10T09:59:47.402Z',
              },
            },
            {
              id: 19,
              attributes: {
                value: 42,
                createdAt: '2023-05-10T09:59:57.267Z',
                updatedAt: '2023-05-10T09:59:58.216Z',
                publishedAt: '2023-05-10T09:59:58.213Z',
              },
            },
            {
              id: 18,
              attributes: {
                value: 41,
                createdAt: '2023-05-10T09:59:50.967Z',
                updatedAt: '2023-05-10T09:59:51.740Z',
                publishedAt: '2023-05-10T09:59:51.737Z',
              },
            },
            {
              id: 20,
              attributes: {
                value: 43,
                createdAt: '2023-05-10T10:00:02.179Z',
                updatedAt: '2023-05-10T10:00:03.001Z',
                publishedAt: '2023-05-10T10:00:02.998Z',
              },
            },
            {
              id: 21,
              attributes: {
                value: 44,
                createdAt: '2023-05-10T10:00:07.874Z',
                updatedAt: '2023-05-10T10:00:08.643Z',
                publishedAt: '2023-05-10T10:00:08.640Z',
              },
            },
            {
              id: 22,
              attributes: {
                value: 45,
                createdAt: '2023-05-10T10:00:12.279Z',
                updatedAt: '2023-05-10T10:00:13.125Z',
                publishedAt: '2023-05-10T10:00:13.122Z',
              },
            },
          ],
        },
        userID: {
          data: {
            id: 679,
            attributes: {
              username: 'mnadolny',
              email: 'mnadolny.laba@solvd.com',
              provider: 'local',
              confirmed: true,
              blocked: false,
              createdAt: '2024-09-05T12:12:38.036Z',
              updatedAt: '2024-10-15T08:25:01.769Z',
              phoneNumber: '7257277772',
              firstName: 'Michal',
              lastName: 'Nadolny',
              customerId: null,
            },
          },
        },
      },
    },
    {
      id: 1881,
      attributes: {
        name: 'nike air moxaaa',
        description:
          'Elevate your style and comfort with the Nike Air Moxaaa. These sneakers combine the iconic Air cushioning with a sleek upper for a modern and sporty look. Experience unmatched support and cushioning with every step, making the Air Moxaaa your perfect go-to for everyday adventures.',
        price: 20,
        createdAt: '2024-10-04T08:18:38.766Z',
        updatedAt: '2024-10-18T10:38:37.540Z',
        publishedAt: '2024-10-04T08:18:38.759Z',
        teamName: 'team-5',
        images: {
          data: [
            {
              id: 5788,
              attributes: {
                name: 'shoes-photo.png',
                alternativeText: null,
                caption: null,
                width: 936,
                height: 1170,
                formats: {
                  thumbnail: {
                    ext: '.png',
                    url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1729247891/thumbnail_shoes_photo_b101b1d726.webp',
                    hash: 'thumbnail_shoes_photo_b101b1d726',
                    mime: 'image/png',
                    name: 'thumbnail_shoes-photo.png',
                    path: null,
                    size: 0.99,
                    width: 125,
                    height: 156,
                    provider_metadata: {
                      public_id: 'thumbnail_shoes_photo_b101b1d726',
                      resource_type: 'image',
                    },
                  },
                },
                hash: 'shoes_photo_b101b1d726',
                ext: '.png',
                mime: 'image/png',
                size: 24.36,
                url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1729247891/shoes_photo_b101b1d726.webp',
                previewUrl: null,
                provider: 'cloudinary',
                provider_metadata: {
                  public_id: 'shoes_photo_b101b1d726',
                  resource_type: 'image',
                },
                createdAt: '2024-10-18T10:38:11.581Z',
                updatedAt: '2024-10-18T10:38:11.581Z',
              },
            },
          ],
        },
        brand: {
          data: {
            id: 9,
            attributes: {
              name: 'Nike',
              createdAt: '2023-05-10T09:56:13.326Z',
              updatedAt: '2023-05-10T10:01:09.592Z',
              publishedAt: '2023-05-10T09:56:15.258Z',
            },
          },
        },
        categories: {
          data: [],
        },
        color: {
          data: {
            id: 8,
            attributes: {
              name: 'Black',
              createdAt: '2023-05-10T09:57:09.847Z',
              updatedAt: '2023-05-10T09:57:11.037Z',
              publishedAt: '2023-05-10T09:57:11.034Z',
            },
          },
        },
        gender: {
          data: {
            id: 4,
            attributes: {
              name: 'Women',
              createdAt: '2023-05-10T10:01:00.195Z',
              updatedAt: '2023-05-10T10:01:01.109Z',
              publishedAt: '2023-05-10T10:01:01.106Z',
            },
          },
        },
        sizes: {
          data: [
            {
              id: 13,
              attributes: {
                value: 36,
                createdAt: '2023-05-10T09:59:15.816Z',
                updatedAt: '2023-05-10T09:59:16.774Z',
                publishedAt: '2023-05-10T09:59:16.771Z',
              },
            },
            {
              id: 14,
              attributes: {
                value: 37,
                createdAt: '2023-05-10T09:59:25.506Z',
                updatedAt: '2023-05-10T09:59:26.626Z',
                publishedAt: '2023-05-10T09:59:26.623Z',
              },
            },
            {
              id: 15,
              attributes: {
                value: 38,
                createdAt: '2023-05-10T09:59:31.262Z',
                updatedAt: '2023-05-10T09:59:32.072Z',
                publishedAt: '2023-05-10T09:59:32.070Z',
              },
            },
            {
              id: 16,
              attributes: {
                value: 39,
                createdAt: '2023-05-10T09:59:40.166Z',
                updatedAt: '2023-05-10T09:59:41.029Z',
                publishedAt: '2023-05-10T09:59:41.026Z',
              },
            },
            {
              id: 17,
              attributes: {
                value: 40,
                createdAt: '2023-05-10T09:59:46.561Z',
                updatedAt: '2023-05-10T09:59:47.405Z',
                publishedAt: '2023-05-10T09:59:47.402Z',
              },
            },
          ],
        },
        userID: {
          data: {
            id: 679,
            attributes: {
              username: 'mnadolny',
              email: 'mnadolny.laba@solvd.com',
              provider: 'local',
              confirmed: true,
              blocked: false,
              createdAt: '2024-09-05T12:12:38.036Z',
              updatedAt: '2024-10-15T08:25:01.769Z',
              phoneNumber: '7257277772',
              firstName: 'Michal',
              lastName: 'Nadolny',
              customerId: null,
            },
          },
        },
      },
    },
    {
      id: 1880,
      attributes: {
        name: 'puma',
        description: 'asd',
        price: 50,
        createdAt: '2024-10-04T08:05:36.885Z',
        updatedAt: '2024-10-04T08:05:36.885Z',
        publishedAt: '2024-10-04T08:05:36.878Z',
        teamName: 'team-5',
        images: {
          data: [
            {
              id: 5406,
              attributes: {
                name: 'shoes-photo.png',
                alternativeText: null,
                caption: null,
                width: 936,
                height: 1170,
                formats: {
                  thumbnail: {
                    ext: '.png',
                    url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1728029136/thumbnail_shoes_photo_97e1e0f7ea.webp',
                    hash: 'thumbnail_shoes_photo_97e1e0f7ea',
                    mime: 'image/png',
                    name: 'thumbnail_shoes-photo.png',
                    path: null,
                    size: 0.99,
                    width: 125,
                    height: 156,
                    provider_metadata: {
                      public_id: 'thumbnail_shoes_photo_97e1e0f7ea',
                      resource_type: 'image',
                    },
                  },
                },
                hash: 'shoes_photo_97e1e0f7ea',
                ext: '.png',
                mime: 'image/png',
                size: 24.36,
                url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1728029135/shoes_photo_97e1e0f7ea.webp',
                previewUrl: null,
                provider: 'cloudinary',
                provider_metadata: {
                  public_id: 'shoes_photo_97e1e0f7ea',
                  resource_type: 'image',
                },
                createdAt: '2024-10-04T08:05:36.600Z',
                updatedAt: '2024-10-04T08:05:36.600Z',
              },
            },
          ],
        },
        brand: {
          data: {
            id: 12,
            attributes: {
              name: 'Puma',
              createdAt: '2023-05-10T10:01:30.278Z',
              updatedAt: '2023-05-10T10:01:31.208Z',
              publishedAt: '2023-05-10T10:01:31.205Z',
            },
          },
        },
        categories: {
          data: [],
        },
        color: {
          data: {
            id: 9,
            attributes: {
              name: 'White',
              createdAt: '2023-05-10T09:57:16.342Z',
              updatedAt: '2023-05-10T09:57:17.525Z',
              publishedAt: '2023-05-10T09:57:17.522Z',
            },
          },
        },
        gender: {
          data: {
            id: 3,
            attributes: {
              name: 'Men',
              createdAt: '2023-05-10T10:00:54.425Z',
              updatedAt: '2023-05-10T10:00:55.441Z',
              publishedAt: '2023-05-10T10:00:55.438Z',
            },
          },
        },
        sizes: {
          data: [
            {
              id: 13,
              attributes: {
                value: 36,
                createdAt: '2023-05-10T09:59:15.816Z',
                updatedAt: '2023-05-10T09:59:16.774Z',
                publishedAt: '2023-05-10T09:59:16.771Z',
              },
            },
            {
              id: 14,
              attributes: {
                value: 37,
                createdAt: '2023-05-10T09:59:25.506Z',
                updatedAt: '2023-05-10T09:59:26.626Z',
                publishedAt: '2023-05-10T09:59:26.623Z',
              },
            },
            {
              id: 15,
              attributes: {
                value: 38,
                createdAt: '2023-05-10T09:59:31.262Z',
                updatedAt: '2023-05-10T09:59:32.072Z',
                publishedAt: '2023-05-10T09:59:32.070Z',
              },
            },
            {
              id: 16,
              attributes: {
                value: 39,
                createdAt: '2023-05-10T09:59:40.166Z',
                updatedAt: '2023-05-10T09:59:41.029Z',
                publishedAt: '2023-05-10T09:59:41.026Z',
              },
            },
            {
              id: 17,
              attributes: {
                value: 40,
                createdAt: '2023-05-10T09:59:46.561Z',
                updatedAt: '2023-05-10T09:59:47.405Z',
                publishedAt: '2023-05-10T09:59:47.402Z',
              },
            },
          ],
        },
        userID: {
          data: {
            id: 679,
            attributes: {
              username: 'mnadolny',
              email: 'mnadolny.laba@solvd.com',
              provider: 'local',
              confirmed: true,
              blocked: false,
              createdAt: '2024-09-05T12:12:38.036Z',
              updatedAt: '2024-10-15T08:25:01.769Z',
              phoneNumber: '7257277772',
              firstName: 'Michal',
              lastName: 'Nadolny',
              customerId: null,
            },
          },
        },
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 5,
      pageCount: 4,
      total: 17,
    },
  },
};

export const products: Product[] = [
  {
    id: 2084,
    name: 'Nike Kyrie 23',
    description:
      'The Nike Kyrie 2 is a basketball shoe designed for Kyrie Irving, featuring a breathable mesh upper, a responsive Zoom Air unit, and a flexible outsole for quick movements and superior court feel.',
    brand: { id: 9, name: 'Nike' },
    color: { id: 8, name: 'Black' },
    sizes: [
      { id: 14, name: '37' },
      { id: 19, name: '42' },
      { id: 24, name: '47' },
      { id: 20, name: '43' },
    ],
    categories: [],
    price: 132,
    gender: { id: 3, name: 'Men' },
    images: [
      {
        id: 4126,
        name: 'pexels-ray-piedra-1456737.png',
        alternativeText: '',
        url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1726762533/pexels_ray_piedra_1456737_1781498332.png',
      },
    ],
    userID: 679,
    teamName: 'team-5',
  },
  {
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
    categories: [],
    price: 160,
    gender: { id: 4, name: 'Women' },
    images: [
      {
        id: 4394,
        name: 'irene-kredenets.png',
        alternativeText: '',
        url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727117288/irene_kredenets_a910c8d96f.png',
      },
      {
        id: 4581,
        name: 'luis-felipe-lins.png',
        alternativeText: '',
        url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727263245/luis_felipe_lins_1d7e68dca0.png',
      },
    ],
    userID: 764,
    teamName: 'team-5',
  },
  {
    id: 1476,
    name: 'Nike air max 90',
    description:
      'Indulge in legendary comfort and style with the iconic Nike Air Max 90, featuring its revolutionary visible Air unit for unparalleled cushioning and a classic design that transcends time.',
    brand: { id: 9, name: 'Nike' },
    color: { id: 8, name: 'Black' },
    sizes: [
      { id: 17, name: '40' },
      { id: 19, name: '42' },
      { id: 18, name: '41' },
      { id: 20, name: '43' },
      { id: 21, name: '44' },
      { id: 22, name: '45' },
    ],
    categories: [],
    price: 50,
    gender: { id: 3, name: 'Men' },
    images: [
      {
        id: 4073,
        name: 'pexels-ray-piedra-1456737.png',
        alternativeText: '',
        url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1726747983/pexels_ray_piedra_1456737_8a0b08f6ad.png',
      },
      {
        id: 4072,
        name: 'imani-bahati-LxVxPA1LOVM-unsplash 1.png',
        alternativeText: '',
        url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1726747983/imani_bahati_Lx_Vx_PA_1_LOVM_unsplash_1_e619448fa1.png',
      },
      {
        id: 5794,
        name: 'shoes-photo.png',
        alternativeText: '',
        url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1729253782/shoes_photo_0b78b5e43b.webp',
      },
    ],
    userID: 679,
    teamName: 'team-5',
  },
  {
    id: 1881,
    name: 'nike air moxaaa',
    description:
      'Elevate your style and comfort with the Nike Air Moxaaa. These sneakers combine the iconic Air cushioning with a sleek upper for a modern and sporty look. Experience unmatched support and cushioning with every step, making the Air Moxaaa your perfect go-to for everyday adventures.',
    brand: { id: 9, name: 'Nike' },
    color: { id: 8, name: 'Black' },
    sizes: [
      { id: 13, name: '36' },
      { id: 14, name: '37' },
      { id: 15, name: '38' },
      { id: 16, name: '39' },
      { id: 17, name: '40' },
    ],
    categories: [],
    price: 20,
    gender: { id: 4, name: 'Women' },
    images: [
      {
        id: 5788,
        name: 'shoes-photo.png',
        alternativeText: '',
        url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1729247891/shoes_photo_b101b1d726.webp',
      },
    ],
    userID: 679,
    teamName: 'team-5',
  },
  {
    id: 1880,
    name: 'puma',
    description: 'asd',
    brand: { id: 12, name: 'Puma' },
    color: { id: 9, name: 'White' },
    sizes: [
      { id: 13, name: '36' },
      { id: 14, name: '37' },
      { id: 15, name: '38' },
      { id: 16, name: '39' },
      { id: 17, name: '40' },
    ],
    categories: [],
    price: 50,
    gender: { id: 3, name: 'Men' },
    images: [
      {
        id: 5406,
        name: 'shoes-photo.png',
        alternativeText: '',
        url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1728029135/shoes_photo_97e1e0f7ea.webp',
      },
    ],
    userID: 679,
    teamName: 'team-5',
  },
];
