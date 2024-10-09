import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/testing/testUtils';
import '@testing-library/jest-dom';
import PopupMenu from '@/components/header/PopupMenu';

describe('Mobile popup menu', () => {
  let showMenu = true;
  const onMenuClose = jest.fn(() => {
    showMenu = false;
  });

  beforeEach(() => {
    showMenu = true;
    render(<PopupMenu showMenu={showMenu} onMenuClose={onMenuClose} />);
  });

  test('is closing on close button click', () => {
    const closeBtn = screen.getByTestId('close-btn');
    fireEvent.click(closeBtn);

    expect(onMenuClose).toHaveBeenCalled();
    expect(showMenu).toBe(false);
  });
});
