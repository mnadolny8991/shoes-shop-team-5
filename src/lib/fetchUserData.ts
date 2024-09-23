import apiUrl from '@/data/apiUrl';

type UserInfo = {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phoneNumber: string;
  avatar?: { url: string } | null;
};

export const getUserData = async (id: number, token: string) => {
  const response = await fetch(`${apiUrl}/users/${id}?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok)
    throw new Error(`Couldn't fetch data for user with id = ${id}`);
  const data = await response.json();
  return data as UserInfo;
};

export const updateUserData = async (
  id: number,
  token: string,
  data: object
) => {
  return fetch(`${apiUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
