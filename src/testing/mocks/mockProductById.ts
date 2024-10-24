import { ApiProductResponse } from '@/types/api/apiTypes';

const apiResponse: ApiProductResponse = {
  data: {
    id: 2084,
    attributes: {
      name: 'Nike Kyrie 23',
      description: 'The Nike Kyrie 2 is a basketball shoe...',
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
                  size: 27.58,
                  width: 131,
                  height: 156,
                  provider_metadata: {
                    public_id: 'thumbnail_pexels_ray_piedra_1456737_1781498332',
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
    },
  },
  meta: {},
};

export default apiResponse;
