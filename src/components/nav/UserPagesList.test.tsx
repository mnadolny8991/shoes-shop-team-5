import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/testing/testUtils';
import '@testing-library/jest-dom';
import getMenuItems from '@/data/menuItems';
import UserPagesList from '@/components/nav/UserPagesList';

describe('popup menu list', () => {
  beforeEach(() => {
    render(<UserPagesList />);
  });

  test('should have all list elements', () => {
    const menuItemsText = getMenuItems(true).map((item) => item.name);
    const menuItems = menuItemsText.map((item) => screen.getByText(item));

    menuItems.forEach((item) => expect(item).toBeInTheDocument());
  });
});
