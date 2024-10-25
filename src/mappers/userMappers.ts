import { ApiUserResponse } from '@/types/api/apiTypes';
import { UserAvatar } from '@/types/user';

export const mapApiUserResponseToAvatar = (
  apiUserResponse: ApiUserResponse
): UserAvatar => ({
  name:
    apiUserResponse.firstName && apiUserResponse.lastName
      ? `${apiUserResponse.firstName} ${apiUserResponse.lastName}`
      : apiUserResponse.firstName
        ? apiUserResponse.firstName
        : apiUserResponse.lastName
          ? apiUserResponse.lastName
          : apiUserResponse.username,
  src: apiUserResponse.avatar?.url,
  alt: apiUserResponse.avatar?.alternativeText || 'your Avatar',
});
