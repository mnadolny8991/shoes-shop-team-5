import { useQuery } from '@tanstack/react-query';
import apiUrl from '@/data/apiUrl';
import { ApiError, ApiUserResponse } from '@/types/api/apiTypes';
import { mapApiUserResponseToAvatar } from '@/mappers/userMappers';
import { useSession } from 'next-auth/react';

export const useAvatarQuery = () => {
  const { data: session, status } = useSession();
  console.log('session data:', session);
  return useQuery({
    queryKey: ['userAvatar'],
    queryFn: () => {
      console.log('im about to fetch');
      return fetch(`${apiUrl}/users/me?populate=avatar`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
        .then((res) => {
          console.log('response:', res);
          return res.json();
        })
        .then((data: ApiUserResponse | ApiError) => {
          console.log('requested data:', data);
          if ('error' in data) {
            console.error(
              `server response: status: ${data.error.status}, message: ${data.error.message}`,
              { cause: data.error }
            );
            return null;
          }
          console.log('requested data:', data);
          return mapApiUserResponseToAvatar(data);
        })
        .catch((error) => console.error(error));
    },
    enabled: status === 'authenticated',
  });
};
