'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserUpdateFormData } from '@/types/userUpdateFormData';
import { updateUserData } from '@/lib/api/fetchUser';

const useUpdateUserDataMutation = (id: number, token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: UserUpdateFormData) => {
      await updateUserData(id, token, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export default useUpdateUserDataMutation;
