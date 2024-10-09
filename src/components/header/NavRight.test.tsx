import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/testing/testUtils';
import NavRight from '@/components/header/NavRight';
import '@testing-library/jest-dom';
import { useAvatarQuery } from '@/hooks/useAvatarQuery';
import { useSession } from 'next-auth/react';
import { useMediaQuery } from '@mui/material';

jest.mock('../../hooks/useAvatarQuery');

describe('Right side of the header component', () => {
  const useAvatarQueryMock = useAvatarQuery as jest.Mock;
  const useSessionMock = useSession as jest.Mock;
  const useMediaQueryMock = useMediaQuery as jest.Mock;

  beforeEach(() => {
    useAvatarQueryMock.mockReturnValue({
      data: {
        name: 'Michal Nadolny',
        src: '/default-avatar.png',
        alt: 'user avatar',
      },
    });
    useSessionMock.mockReturnValue({
      data: {
        id: 679,
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njc5LCJpYXQiOjE3MjYwNDY3NTYsImV4cCI6MTcyODYzODc1Nn0.En7ZyMPzfDsSQuCffuraEgpj0LoO10Jt0K-HuOWRfVs',
        refreshToken: 'aaa',
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
      },
      status: 'authenticated',
    });
  });
  
  test('show avatar when signed in', async () => {
    render(<NavRight />);

    const avatarElement = await screen.findByAltText('user avatar');

    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute('src', '/default-avatar.png');
  });

  test("dont't show avatar when not signed in", async () => {
    useMediaQueryMock.mockReturnValue(false);
    useSessionMock.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });
    render(<NavRight />);

    const avatarElement = screen.queryByAltText('user avatar');

    expect(avatarElement).not.toBeInTheDocument();
  });

  test('shows appropriate icons in the mobile viewport (auth + notauth)', async () => {
    useMediaQueryMock.mockReturnValue(true);
    render(<NavRight />);

    const menu = screen.getByAltText('menu icon');
    const avatar = screen.queryByAltText('user avatar');
    const bag = screen.getByAltText('bag icon');
    const search = screen.getByAltText('search icon');

    expect(menu).toBeInTheDocument();
    expect(avatar).not.toBeInTheDocument();
    expect(bag).toBeInTheDocument();
    expect(search).toBeInTheDocument();
  });

  test('shows appropriate icons in the desktop viewport (auth)', async () => {
    useMediaQueryMock.mockReturnValue(false);
    render(<NavRight />);

    const menu = screen.queryByAltText('menu icon');
    const avatar = await screen.findByAltText('user avatar');
    const bag = screen.getByAltText('bag icon');
    const search = screen.getByPlaceholderText('Search');

    expect(menu).not.toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(bag).toBeInTheDocument();
    expect(search).toBeInTheDocument();
  });

  test('shows appropriate icons in the desktop viewport (not auth)', async () => {
    useMediaQueryMock.mockReturnValue(false);
    useSessionMock.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    })
    render(<NavRight />);

    const menu = screen.queryByAltText('menu icon');
    const avatar = screen.queryByAltText('user avatar');
    const bag = screen.getByAltText('bag icon');
    const search = screen.getByPlaceholderText('Search');
    const signIn = screen.getByText('Sign In');

    expect(menu).not.toBeInTheDocument();
    expect(avatar).not.toBeInTheDocument();
    expect(bag).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(signIn).toBeInTheDocument();
  });

  test('shows mobile menu on menu button click', async () => {
    useMediaQueryMock.mockReturnValue(true);
    render(<NavRight />);

    const mobileMenuButton = screen.getByAltText('menu icon').closest('button');
    expect(mobileMenuButton).toBeInTheDocument();

    fireEvent.click(mobileMenuButton as Element);

    const popup = await screen.findByTestId('menuPopup');
    expect(popup).toBeInTheDocument();
  });

  test('shows search popup on search click (desktop)', async () => {
    useMediaQueryMock.mockReturnValue(false);
    render(<NavRight />);

    const search = screen.getByPlaceholderText('Search');
    fireEvent.click(search);
    const pop = screen.getByText('Popular Search Terms');

    expect(pop).toBeInTheDocument();
  });

  test('shows search popup on search click (mobile)', async () => {
    useMediaQueryMock.mockReturnValue(true);
    render(<NavRight />);

    const search = screen.getByAltText('search icon');
    fireEvent.click(search);
    const input = screen.getByPlaceholderText('Search');

    expect(input).toBeInTheDocument();
  });
});
