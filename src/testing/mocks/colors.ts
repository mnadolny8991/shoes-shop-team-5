import { ApiColorListResponse } from '@/types/api/apiTypes';
import { Color } from '@/types/product';

export const apiColorsResponse: ApiColorListResponse = {
  data: [
    {
      id: 8,
      attributes: {
        name: 'Black',
        createdAt: '2023-05-10T09:57:09.847Z',
        updatedAt: '2023-05-10T09:57:11.037Z',
        publishedAt: '2023-05-10T09:57:11.034Z',
      },
    },
    {
      id: 9,
      attributes: {
        name: 'White',
        createdAt: '2023-05-10T09:57:16.342Z',
        updatedAt: '2023-05-10T09:57:17.525Z',
        publishedAt: '2023-05-10T09:57:17.522Z',
      },
    },
    {
      id: 10,
      attributes: {
        name: 'Green',
        createdAt: '2023-05-10T09:57:25.983Z',
        updatedAt: '2023-05-10T09:57:26.939Z',
        publishedAt: '2023-05-10T09:57:26.936Z',
      },
    },
    {
      id: 11,
      attributes: {
        name: 'Blue',
        createdAt: '2023-05-10T09:57:36.521Z',
        updatedAt: '2023-05-10T09:57:37.516Z',
        publishedAt: '2023-05-10T09:57:37.512Z',
      },
    },
    {
      id: 12,
      attributes: {
        name: 'Red',
        createdAt: '2023-05-10T09:57:41.728Z',
        updatedAt: '2023-05-10T09:57:42.786Z',
        publishedAt: '2023-05-10T09:57:42.783Z',
      },
    },
    {
      id: 13,
      attributes: {
        name: 'Yellow',
        createdAt: '2023-05-10T09:57:57.611Z',
        updatedAt: '2023-05-10T09:57:58.624Z',
        publishedAt: '2023-05-10T09:57:58.621Z',
      },
    },
    {
      id: 14,
      attributes: {
        name: 'Pink',
        createdAt: '2023-05-10T09:58:03.967Z',
        updatedAt: '2023-05-10T09:58:05.004Z',
        publishedAt: '2023-05-10T09:58:05.001Z',
      },
    },
    {
      id: 15,
      attributes: {
        name: 'Orange',
        createdAt: '2023-05-10T09:58:34.906Z',
        updatedAt: '2023-05-10T09:58:35.935Z',
        publishedAt: '2023-05-10T09:58:35.932Z',
      },
    },
    {
      id: 16,
      attributes: {
        name: 'Purple',
        createdAt: '2023-05-10T09:58:47.378Z',
        updatedAt: '2023-05-10T09:58:48.402Z',
        publishedAt: '2023-05-10T09:58:48.400Z',
      },
    },
    {
      id: 17,
      attributes: {
        name: 'Brown',
        createdAt: '2023-05-10T09:59:07.394Z',
        updatedAt: '2023-05-10T09:59:08.387Z',
        publishedAt: '2023-05-10T09:59:08.384Z',
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 10,
    },
  },
};

export const allColors: Color[] = [
  { id: 8, name: 'Black' },
  { id: 9, name: 'White' },
  { id: 10, name: 'Green' },
  { id: 11, name: 'Blue' },
  { id: 12, name: 'Red' },
  { id: 13, name: 'Yellow' },
  { id: 14, name: 'Pink' },
  { id: 15, name: 'Orange' },
  { id: 16, name: 'Purple' },
  { id: 17, name: 'Brown' },
];
