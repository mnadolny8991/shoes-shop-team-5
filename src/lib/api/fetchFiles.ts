import apiUrl from '@/data/apiUrl';
import fetchData from '@/lib/api/fetchData';

export const uploadFile = async (formData: FormData) =>
  await fetchData(`${apiUrl}/upload`, { method: 'POST', body: formData });

export const deleteFile = async (id: number, token: string) =>
  await fetchData(`${apiUrl}/upload/files/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

const idsToFilters = (ids: number[]) =>
  ids.map((id) => `filters[id]=${id}`).join('&');

export const fetchFilesByIds = async (ids: number[]) =>
  await fetchData(
    `${apiUrl}/upload/files?${idsToFilters(ids)}&populate[related][fields][0]=id&fields[0]=id`
  );
