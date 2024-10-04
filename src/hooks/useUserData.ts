import { getUserData } from '@/lib/api/fetchUserData';
import { useQuery } from '@tanstack/react-query';

const useUserData = (id: number, token: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserData(id, token),
  });
};

export default useUserData;
