import { screen } from '@testing-library/react';
import { render } from '@/testing/testUtils';
import NavRight from '@/components/header/NavRight';
import '@testing-library/jest-dom';
import { useAvatarQuery } from '@/hooks/useAvatarQuery';

jest.mock('../../hooks/useAvatarQuery');

describe('Right side of the header component', () => {
  const useAvatarQueryMock = useAvatarQuery as jest.Mock;
  
  test('Show avatar when signed in', async () => {
    useAvatarQueryMock.mockReturnValue({
      data: {
        name: 'Michal Nadolny',
        src: '/default-avatar.png',
        alt: 'user avatar',
      },
    });
    render(<NavRight />);

    const avatarElement = await screen.findByAltText('user avatar');

    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute('src', '/default-avatar.png');
  });
});
