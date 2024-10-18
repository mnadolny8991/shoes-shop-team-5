import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/testing/testUtils';
import '@testing-library/jest-dom';
import { useMediaQuery } from '@mui/material';
import Cart from '@/components/cart/Cart';
import useCartProducts from '@/hooks/useCartProducts';
import { Product } from '@/types/product';
import { useCartContext } from '@/context/CartContext';
import { CartProduct } from '@/types/cartProduct';
import mockProduct from '@/testing/mocks/mockProduct';

jest.mock('../../hooks/useCartProducts');

describe('Cart component', () => {
  const useCartProductsMock = useCartProducts as jest.Mock;

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      'cart',
      JSON.stringify([
        {
          id: 1564,
          amount: 2,
        },
      ])
    );
    useCartProductsMock.mockReturnValue([mockProduct]);
  });

  test('summary values are changed on product quantity change', () => {
    render(<Cart />);

    const title = screen.getByText(mockProduct.name);
    expect(title).toBeInTheDocument();

    const amount = screen.getByTestId('amount');
    expect(amount).toBeInTheDocument();
    expect(amount.innerHTML).toBe('2');

    const subtotal = screen.getByTestId('subtotal');
    expect(subtotal).toBeInTheDocument();
    expect(subtotal.innerHTML).toBe('$' + (mockProduct.price * 2).toString());

    const addBtn = screen.getByTestId('add-btn');
    const subtractBtn = screen.getByTestId('subtract-btn');
    expect(addBtn).toBeInTheDocument();
    expect(subtractBtn).toBeInTheDocument();

    for (let i = 0; i < 2; i++) {
      fireEvent.click(addBtn);
    }
    expect(subtotal.innerHTML).toBe('$' + (mockProduct.price * 4).toString());
    for (let i = 0; i < 2; i++) {
      fireEvent.click(subtractBtn);
    }
    expect(subtotal.innerHTML).toBe('$' + (mockProduct.price * 2).toString());
  });
});
