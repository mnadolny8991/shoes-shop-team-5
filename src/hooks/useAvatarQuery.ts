import { useQuery } from '@tanstack/react-query';
import apiUrl from '@/data/apiUrl';
import { ApiError, ApiUserResponse } from '@/types/api/apiTypes';
import { mapApiUserResponseToAvatar } from '@/mappers/userMappers';
import { useSession } from 'next-auth/react';

const useAvatarQuery = () => {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: ['user'],
    queryFn: () =>
      fetch(`${apiUrl}/users/me?populate=avatar`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data: ApiUserResponse | ApiError) => {
          if ('error' in data) {
            console.error(
              `server response: status: ${data.error.status}, message: ${data.error.message}`,
              { cause: data.error }
            );
            return null;
          }
          return mapApiUserResponseToAvatar(data);
        })
        .catch((error) => console.error(error)),
    enabled: status === 'authenticated',
  });
};

export default useAvatarQuery;
