import apiUrl from '@/data/apiUrl';

export const updateUserData = async (
  id: number,
  token: string,
  data: { [key: string]: any }
) => {
  const response = await fetch(`${apiUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Couldn't update user with id=${id}`);
  return response;
};
