import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '@/testing/testUtils';
import MyProductsEmptyState from '@/components/products/MyProductsEmptyState';

describe('nothing found component', () => {
  test('renders everything correctly', () => {
    render(<MyProductsEmptyState />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByAltText(/bag icon/i)).toBeInTheDocument();
    expect(
      screen.getByText(/You don't have any products yet/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Post can contain video, images and text./i)
    ).toBeInTheDocument();
  });
});
