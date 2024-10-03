import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartSummary from '@/components/cart/CartSummary';
import { useCartContext } from '@/context/CartContext';

// Mock useCartContext to control its return values
jest.mock(('../../context/CartContext.tsx'), () => ({
  useCartContext: jest.fn(),
}));

const mockUseCartContext = useCartContext as jest.Mock;

// Custom test props
const cartProps = {
  subtotal: 100,
  shipping: 10,
  tax: 5,
  sx: {},
};

describe('CartSummary Component', () => {
  beforeEach(() => {
    mockUseCartContext.mockReturnValue({
      promocode: '',
      onPromocodeChange: jest.fn(),
    });
  });

  it('should render correctly with provided props', () => {
    render(<CartSummary {...cartProps} />);

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

  it('should toggle promocode input visibility when icon is clicked', () => {
    render(<CartSummary {...cartProps} />);

    // Before clicking the promocode icon, the input should not be visible
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    // Click the icon to show the promocode input
    const promocodeButton = screen.getByRole('button');
    fireEvent.click(promocodeButton);

    // After clicking, the input should be visible
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should allow entering a promocode when visible', () => {
    const onPromocodeChangeMock = jest.fn();

    mockUseCartContext.mockReturnValue({
      promocode: 'TESTCODE',
      onPromocodeChange: onPromocodeChangeMock,
    });

    render(<CartSummary {...cartProps} />);

    // Show promocode input by clicking the icon
    const promocodeButton = screen.getByRole('button');
    fireEvent.click(promocodeButton);

    // Ensure the input displays the promocode value from context
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('TESTCODE');

    // Simulate entering a new promocode
    fireEvent.change(input, { target: { value: 'NEWCODE' } });

    // Ensure the mock onPromocodeChange function is called with the new value
    expect(onPromocodeChangeMock).toHaveBeenCalledWith('NEWCODE');
  });

  it('should render the checkout button and handle clicks', () => {
    render(<CartSummary {...cartProps} />);

    // Check if the checkout button is present
    const checkoutButton = screen.getByRole('button', { name: /checkout/i });
    expect(checkoutButton).toBeInTheDocument();

    // Simulate a button click (for future testing)
    fireEvent.click(checkoutButton);
  });
});
