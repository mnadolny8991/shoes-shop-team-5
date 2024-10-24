import apiUrl from '@/data/apiUrl';
import fetchData from '@/lib/api/fetchData';

type UserInfo = {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phoneNumber: string;
  avatar?: { url: string } | null;
};

export const getUserData = async (id: number, token: string) => {
  return (await fetchData(`${apiUrl}/users/${id}?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as UserInfo;
};

export const getUserDataWithAvatar = async (token: string) => {
  return await fetchData(`${apiUrl}/users/me?populate=avatar`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserData = async (
  id: number,
  token: string,
  data: object
) => {
  return fetchData(`${apiUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
