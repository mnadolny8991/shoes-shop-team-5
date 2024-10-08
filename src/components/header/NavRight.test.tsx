import { screen } from '@testing-library/react';
import { render } from '@/testing/testUtils';
import NavRight from '@/components/header/NavRight';
import '@testing-library/jest-dom';
import { useSession } from 'next-auth/react';
import useAvatarQuery from '@/hooks/useAvatarQuery';
import { Session } from 'next-auth';
import { UserAvatar } from '@/types/user';
import nock from 'nock';
import apiUrl from '@/data/apiUrl';
import { userAvatarResponseMock } from '@/testing/mocks/userAvatarResponse';

jest.mock("next-auth/react", () => {
  const mockSession: Session = {
    id: 679,
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njc5LCJpYXQiOjE3MjgzNzYwMTgsImV4cCI6MTczMDk2ODAxOH0.BRXVE7-M2uKiQjES9lKSo-zl0NNEUlERzDGY_Mk70lA',
    refreshToken: 'aaa',
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
  };
  const originalModule = jest.requireActual('next-auth/react');
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
    }),
  };
});
jest.mock('next/navigation');

describe('Right side of the header component', () => {
  beforeEach(() => {
    nock(`${apiUrl}`)
      .get('/users/me?populate=avatar')
      .reply(200, userAvatarResponseMock);
  })

  test('Show avatar when signed in', async () => {
    const avatarElement = screen.getByAltText('user avatar');

    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute('src', '/default-avatar.png');
  });
  render(<NavRight />);

});