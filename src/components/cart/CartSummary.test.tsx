import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartSummary from '@/components/cart/CartSummary';
import { CartContextProvider, useCartContext } from '@/context/CartContext';
import { CartContextType } from '@/types/cart';

// Custom test props
const cartProps = {
  subtotal: 100,
  shipping: 10,
  tax: 5,
  sx: {},
};

const renderCartSummary = () => {
  render(
    <CartContextProvider>
      <CartSummary {...cartProps} />
    </CartContextProvider>
  );
};

describe('CartSummary Component', () => {
  test('should render correctly with provided props', () => {
    renderCartSummary();
    // Check that Subtotal, Shipping, and Tax are displayed correctly
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Shipping')).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByText('Tax')).toBeInTheDocument();
    expect(screen.getByText('$5')).toBeInTheDocument();

    // Check that the total is calculated and displayed
    const total = 100 + 10 + 5;
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText(`$${total}`)).toBeInTheDocument();
  });

  test('should toggle promocode input visibility when icon is clicked', async () => {
    renderCartSummary();
    // Before clicking the promocode icon, the input should not be visible
    expect(screen.queryByTestId('promocode-input')).not.toBeInTheDocument();

    // Click the icon to show the promocode input
    const promocodeButton = screen.queryByTestId('promocode-toggle');
    fireEvent.click(promocodeButton as Element);

    // After clicking, the input should be visible
    expect(screen.queryByTestId('promocode-input')).toBeInTheDocument();
  });

  test('should allow entering a promocode when visible', () => {
    renderCartSummary();
    // Show promocode input by clicking the icon
    const promocodeButton = screen.queryByTestId('promocode-toggle');
    fireEvent.click(promocodeButton as Element);

    // Ensure the input displays the promocode value from context
    const input = screen.queryByTestId('promocode-input');
    // expect(input).toHaveValue(undefined);

    // Simulate entering a new promocode
    fireEvent.change(input as Element, { target: { value: 'NEWCODE' } });

    // Ensure the mock onPromocodeChange function is called with the new value
    expect(input).toHaveValue('NEWCODE');
  });

  test('should render the checkout button and handle clicks', () => {
    renderCartSummary();
    // Check if the checkout button is present
    const checkoutButton = screen.getByRole('button', { name: /checkout/i });
    expect(checkoutButton).toBeInTheDocument();

    // Simulate a button click (for future testing)
    fireEvent.click(checkoutButton);
  });
});
