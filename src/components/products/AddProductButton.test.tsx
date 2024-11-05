import { render, screen } from '@testing-library/react';
import AddProductButton from '@/components/products/AddProductButton';
import '@testing-library/jest-dom';

describe('AddProductButton', () => {
  test('renders the button with the correct text and link', () => {
    render(<AddProductButton />);

    const button = screen.getByRole('link', { name: /Add product/i });

    // Check if button renders with the correct text
    expect(button).toBeInTheDocument();

    // Verify that the button has the correct href
    expect(button).toHaveAttribute('href', '/add-product');

    // Verify the button has the correct styling (optional)
    expect(button).toHaveStyle({ width: '152px' });
  });
});
