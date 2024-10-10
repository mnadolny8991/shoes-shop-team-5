import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/testing/testUtils';
import '@testing-library/jest-dom';
import SearchPopup from '@/components/header/SearchPopup';
import { useMediaQuery } from '@mui/material';
import CartProductBar from '@/components/cart/CartProductBar';
import { useState } from 'react';

describe('cart product bar', () => {
  const useMediaQueryMock = useMediaQuery as jest.Mock;
  const amount = 3;

  const onAddClick = jest.fn(() => setAmount((prev) => prev + 1));
  const onSubtractClick = jest.fn(() => setAmount((prev) => prev - 1));
  const onDeleteClick = jest.fn();
  const onAmountChange = jest.fn((am: number) => setAmount(am));

  let setAmount: React.Dispatch<React.SetStateAction<number>>;

  const TestComponent = () => {
    const [localAmount, setLocalAmount] = useState(amount);
    setAmount = setLocalAmount;

    return (
      <CartProductBar
        amount={localAmount}
        onAddClick={onAddClick}
        onSubtractClick={onSubtractClick}
        onDeleteClick={onDeleteClick}
        onAmountChange={onAmountChange}
      />
    );
  };

  beforeEach(() => {
    useMediaQueryMock.mockReturnValue(false);
  });

  test('should change quantity on add and subtract (desktop)', () => {
    render(<TestComponent />);
    const addBtn = screen.getByTestId('add-btn');
    expect(addBtn).toBeInTheDocument();

    fireEvent.click(addBtn);
    expect(onAddClick).toHaveBeenCalled();

    const quantity = addBtn.previousSibling;
    expect(quantity?.textContent).toBe('4');

    const subtractBtn = screen.getByTestId('subtract-btn');
    fireEvent.click(subtractBtn);
    expect(onSubtractClick).toHaveBeenCalled();

    expect(quantity?.textContent).toBe('3');
  });

  test('fires even on delete click', () => {
    render(<TestComponent />);
    const deleteButton = screen.getByTestId('delete-btn');
    fireEvent.click(deleteButton);
    expect(onDeleteClick).toHaveBeenCalled();
  });

  test('updates quantity on mobile', () => {
    useMediaQueryMock.mockReturnValue(true);
    render(<TestComponent />);

    const downBtn = screen.getByTestId('down-btn');
    expect(downBtn).toBeInTheDocument();

    fireEvent.click(downBtn);
    const qtyInput = screen.getByPlaceholderText('Quantity');
    expect(qtyInput).toBeInTheDocument();

    fireEvent.change(qtyInput, {
      target: {
        value: '4',
      },
    });
    fireEvent.click(downBtn);
    expect(onAmountChange).toHaveBeenCalled();
  });
});
