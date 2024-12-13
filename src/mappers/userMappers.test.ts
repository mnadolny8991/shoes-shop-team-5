import { apiUserResponse, userAvatar } from '@/testing/mocks/user';
import { mapApiUserResponseToAvatar } from './userMappers';
import { ApiUserResponse } from '@/types/api/apiTypes';

describe('user mapper', () => {
  test('mapApiUserResponseToAvatar', () => {
    expect(mapApiUserResponseToAvatar(apiUserResponse)).toEqual(userAvatar);
  });
  test('mapApiUserResponseToAvatar when apiUserResponse has alternativeText', () => {
    const alt = 'avatar alt';
    const responseWithAlt: ApiUserResponse = JSON.parse(
      JSON.stringify(apiUserResponse)
    );
    responseWithAlt.avatar!.alternativeText = alt;
    expect(mapApiUserResponseToAvatar(responseWithAlt)).toEqual({
      ...userAvatar,
      alt,
    });
  });
  test('mapApiUserResponseToAvatar name as userName when firstName, lastname are not provided', () => {
    const responseWithoutFirstNameLastName: ApiUserResponse = JSON.parse(
      JSON.stringify(apiUserResponse)
    );
    responseWithoutFirstNameLastName.firstName = null;
    responseWithoutFirstNameLastName.lastName = null;
    expect(
      mapApiUserResponseToAvatar(responseWithoutFirstNameLastName)
    ).toEqual({ ...userAvatar, name: 'Serhii' });
  });
});
