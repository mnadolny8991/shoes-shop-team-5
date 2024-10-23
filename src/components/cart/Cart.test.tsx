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
import { v4 as uuidv4 } from 'uuid';

jest.mock('../../hooks/useCartProducts');

describe('Cart component', () => {
  const useCartProductsMock = useCartProducts as jest.Mock;

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      'cart',
      JSON.stringify([
        {
          id: uuidv4(),
          productId: 1564,
          amount: 2,
          size: 36
        },
      ])
    );
    useCartProductsMock.mockReturnValue({ products: [mockProduct], isLoading: false });
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
