import { ApiCategoryListResponse } from '@/types/api/apiTypes';
import { Category } from '@/types/product';

export const apiCategoriesResponse: ApiCategoryListResponse = {
  data: [
    {
      id: 5,
      attributes: {
        name: 'Casual',
        createdAt: '2023-05-10T10:03:48.852Z',
        updatedAt: '2023-05-10T10:03:49.899Z',
        publishedAt: '2023-05-10T10:03:49.896Z',
      },
    },
    {
      id: 6,
      attributes: {
        name: 'Running',
        createdAt: '2023-05-10T10:04:50.641Z',
        updatedAt: '2023-05-10T10:04:51.753Z',
        publishedAt: '2023-05-10T10:04:51.750Z',
      },
    },
    {
      id: 4,
      attributes: {
        name: 'Volleyball',
        createdAt: '2023-05-10T10:03:41.555Z',
        updatedAt: '2023-05-10T10:05:05.264Z',
        publishedAt: '2023-05-10T10:03:42.537Z',
      },
    },
    {
      id: 7,
      attributes: {
        name: 'Tennis',
        createdAt: '2023-05-10T10:05:11.680Z',
        updatedAt: '2023-05-10T10:05:12.511Z',
        publishedAt: '2023-05-10T10:05:12.508Z',
      },
    },
    {
      id: 8,
      attributes: {
        name: 'Athletic',
        createdAt: '2023-05-10T10:05:23.627Z',
        updatedAt: '2023-05-10T10:05:24.437Z',
        publishedAt: '2023-05-10T10:05:24.434Z',
      },
    },
    {
      id: 9,
      attributes: {
        name: 'Boots',
        createdAt: '2023-05-10T10:06:12.934Z',
        updatedAt: '2023-05-10T10:06:13.899Z',
        publishedAt: '2023-05-10T10:06:13.896Z',
      },
    },
    {
      id: 10,
      attributes: {
        name: 'Tracking',
        createdAt: '2023-05-10T10:06:18.556Z',
        updatedAt: '2023-05-10T10:06:19.466Z',
        publishedAt: '2023-05-10T10:06:19.463Z',
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 7,
    },
  },
};

export const allCategories: Category[] = [
  { id: 5, name: 'Casual' },
  { id: 6, name: 'Running' },
  { id: 4, name: 'Volleyball' },
  { id: 7, name: 'Tennis' },
  { id: 8, name: 'Athletic' },
  { id: 9, name: 'Boots' },
  { id: 10, name: 'Tracking' },
];
