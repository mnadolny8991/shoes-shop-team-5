import { useQuery } from '@tanstack/react-query';
import { mapApiUserResponseToAvatar } from '@/mappers/userMappers';
import { useSession } from 'next-auth/react';
import { getUserDataWithAvatar } from '@/lib/api/fetchUserData';

export const useAvatarQuery = () => {
  const { data: session, status } = useSession();
  return useQuery({
    queryKey: ['userAvatar'],
    queryFn: async () =>
      mapApiUserResponseToAvatar(
        await getUserDataWithAvatar(session?.accessToken!)
      ),
    enabled: status === 'authenticated',
  });
};
