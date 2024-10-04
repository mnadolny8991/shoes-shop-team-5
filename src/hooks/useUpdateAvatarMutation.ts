'use client';
import { uploadFile } from '@/lib/api/fetchFiles';
import { updateUserData } from '@/lib/api/fetchUserData';
import { mapApiUserResponseToAvatar } from '@/mappers/userMappers';
import { UserAvatar } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateAvatarMutation = (id: number, token: string) => {
  const queryClient = useQueryClient();

  const deleteAvatarMutation = useMutation({
    mutationFn: async () =>
      await updateUserData(id, token, {
        avatar: null,
      }),
    onSuccess: (apiUserResponse) => {
      queryClient.setQueryData(
        ['userAvatar'],
        mapApiUserResponseToAvatar(apiUserResponse)
      );
    },
  });

  const updateAvatarMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const imageData = await uploadFile(formData);
      const imageId = imageData[0]?.id;
      await updateUserData(id, token, {
        avatar: imageId,
      });
      return imageData[0]?.url; // Return the avatar URL
    },

    onSuccess: (newAvatarUrl) => {
      queryClient.setQueryData(['userAvatar'], (old: UserAvatar) => ({
        ...old,
        src: newAvatarUrl,
      }));
    },
  });

  return {
    deleteAvatarMutation,
    updateAvatarMutation,
  };
};

export default useUpdateAvatarMutation;
