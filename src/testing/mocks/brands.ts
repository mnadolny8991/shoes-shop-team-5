import { ApiBrandListResponse } from '@/types/api/apiTypes';
import { Brand } from '@/types/product';

export const apiBrandListResponse: ApiBrandListResponse = {
  data: [
    {
      id: 9,
      attributes: {
        name: 'Nike',
        createdAt: '2023-05-10T09:56:13.326Z',
        updatedAt: '2023-05-10T10:01:09.592Z',
        publishedAt: '2023-05-10T09:56:15.258Z',
      },
    },
    {
      id: 10,
      attributes: {
        name: 'Adidas',
        createdAt: '2023-05-10T09:56:22.600Z',
        updatedAt: '2023-05-10T10:01:17.963Z',
        publishedAt: '2023-05-10T09:56:23.869Z',
      },
    },
    {
      id: 11,
      attributes: {
        name: 'Asics',
        createdAt: '2023-05-10T10:01:23.877Z',
        updatedAt: '2023-05-10T10:01:24.860Z',
        publishedAt: '2023-05-10T10:01:24.857Z',
      },
    },
    {
      id: 12,
      attributes: {
        name: 'Puma',
        createdAt: '2023-05-10T10:01:30.278Z',
        updatedAt: '2023-05-10T10:01:31.208Z',
        publishedAt: '2023-05-10T10:01:31.205Z',
      },
    },
    {
      id: 13,
      attributes: {
        name: 'New Balance',
        createdAt: '2023-05-10T10:01:37.323Z',
        updatedAt: '2023-05-10T10:01:38.289Z',
        publishedAt: '2023-05-10T10:01:38.286Z',
      },
    },
    {
      id: 14,
      attributes: {
        name: 'Skechers',
        createdAt: '2023-05-10T10:01:59.930Z',
        updatedAt: '2023-05-10T10:02:02.558Z',
        publishedAt: '2023-05-10T10:02:02.555Z',
      },
    },
    {
      id: 15,
      attributes: {
        name: 'Lowa',
        createdAt: '2023-05-10T10:02:14.419Z',
        updatedAt: '2023-05-10T10:02:15.450Z',
        publishedAt: '2023-05-10T10:02:15.447Z',
      },
    },
    {
      id: 16,
      attributes: {
        name: 'Salomon',
        createdAt: '2023-05-10T10:02:24.225Z',
        updatedAt: '2023-05-10T10:02:25.667Z',
        publishedAt: '2023-05-10T10:02:25.663Z',
      },
    },
    {
      id: 17,
      attributes: {
        name: 'Reebok',
        createdAt: '2023-05-10T10:02:36.245Z',
        updatedAt: '2023-05-10T10:02:37.226Z',
        publishedAt: '2023-05-10T10:02:37.224Z',
      },
    },
    {
      id: 18,
      attributes: {
        name: 'Under Armour',
        createdAt: '2023-05-10T10:02:43.861Z',
        updatedAt: '2023-05-10T10:02:44.712Z',
        publishedAt: '2023-05-10T10:02:44.707Z',
      },
    },
    {
      id: 19,
      attributes: {
        name: 'Meindl',
        createdAt: '2023-05-10T10:02:55.169Z',
        updatedAt: '2023-05-10T10:02:56.251Z',
        publishedAt: '2023-05-10T10:02:56.248Z',
      },
    },
    {
      id: 20,
      attributes: {
        name: 'Hugo Boss',
        createdAt: '2023-05-10T10:03:09.323Z',
        updatedAt: '2023-05-10T10:03:10.290Z',
        publishedAt: '2023-05-10T10:03:10.287Z',
      },
    },
    {
      id: 21,
      attributes: {
        name: 'Karrimor',
        createdAt: '2023-05-10T10:03:35.193Z',
        updatedAt: '2023-05-10T10:03:36.168Z',
        publishedAt: '2023-05-10T10:03:36.165Z',
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 13,
    },
  },
};

export const allBrands: Brand[] = [
  { id: 9, name: 'Nike' },
  { id: 10, name: 'Adidas' },
  { id: 11, name: 'Asics' },
  { id: 12, name: 'Puma' },
  { id: 13, name: 'New Balance' },
  { id: 14, name: 'Skechers' },
  { id: 15, name: 'Lowa' },
  { id: 16, name: 'Salomon' },
  { id: 17, name: 'Reebok' },
  { id: 18, name: 'Under Armour' },
  { id: 19, name: 'Meindl' },
  { id: 20, name: 'Hugo Boss' },
  { id: 21, name: 'Karrimor' },
];
