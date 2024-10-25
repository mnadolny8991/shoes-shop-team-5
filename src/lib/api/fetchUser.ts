import apiUrl from '@/data/apiUrl';
import { ApiError } from '@/types/api/apiError';
import fetchData from '@/lib/api/fetchData';

export const updateUserData = async (
  id: number,
  token: string,
  data: { [key: string]: any }
) => {
  return await fetchData(`${apiUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
