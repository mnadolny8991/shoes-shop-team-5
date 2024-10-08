import { screen } from '@testing-library/react';
import { render } from '@/testing/testUtils';
import NavRight from '@/components/header/NavRight';
import '@testing-library/jest-dom';
import { useAvatarQuery } from '@/hooks/useAvatarQuery';
import { Session } from 'next-auth';

jest.mock('next-auth/react', () => {
  const mockSession: Session = {
    id: 679,
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njc5LCJpYXQiOjE3MjYwNDY3NTYsImV4cCI6MTcyODYzODc1Nn0.En7ZyMPzfDsSQuCffuraEgpj0LoO10Jt0K-HuOWRfVs',
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
jest.mock('../../hooks/useAvatarQuery', () => ({
  useAvatarQuery: jest.fn(),
}));

describe('Right side of the header component', () => {
  beforeEach(() => {
    (useAvatarQuery as jest.Mock).mockImplementation(() => ({
      data: {
        name: 'Michal Nadolny',
        src: '/default-avatar.png',
        alt: 'user avatar',
      },
    }))
  });

  test('Show avatar when signed in', async () => {
    render(<NavRight />);

    const avatarElement = await screen.findByAltText('user avatar');

    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute('src', '/default-avatar.png');
  });
});