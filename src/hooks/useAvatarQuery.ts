import { useQuery } from '@tanstack/react-query';
import apiUrl from '@/data/apiUrl';
import { ApiError, ApiUserResponse } from '@/types/apiTypes';
import token from '@/data/token';
import { mapApiUserResponseToAvatar } from '@/mappers/userMappers';

const useAvatarQuery = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () =>
      fetch(`${apiUrl}/users/me?populate=avatar`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
  });

export default useAvatarQuery;
