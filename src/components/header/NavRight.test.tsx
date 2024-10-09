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

  test('shows appropriate icons in mobile viewport', async () => {
    useMediaQueryMock.mockReturnValue(true);
    render(<NavRight />);

    const menu = await screen.findByAltText('menu icon');
    const avatar = screen.queryByAltText('user avatar');
    const bag = await screen.findByAltText('bag icon');
    const search = await screen.findByAltText('search icon');

    expect(menu).toBeInTheDocument();
    expect(avatar).not.toBeInTheDocument();
    expect(bag).toBeInTheDocument();
    expect(search).toBeInTheDocument();
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
});
