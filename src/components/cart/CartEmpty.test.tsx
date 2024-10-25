import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/testing/testUtils';
import '@testing-library/jest-dom';
import { useMediaQuery } from '@mui/material';
import CartEmpty from '@/components/cart/CartEmpty';
import { useRouter } from 'next/navigation';

describe('cart empty screen', () => {
  const useRouterMock = useRouter as jest.Mock;

  test('triggers catalog on add product click', () => {
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({
      push: pushMock,
    });
    render(<CartEmpty />);

    const addProductBtn = screen.getByText('Add Product');
    expect(addProductBtn).toBeInTheDocument();
    fireEvent.click(addProductBtn);

    expect(pushMock).toHaveBeenCalledWith('catalog');
  });

  test('displays rest of elements', () => {
    render(<CartEmpty />);

    const title = screen.getByText("You don't have any products yet");
    const icon = screen.getByAltText('bag icon');

    expect(title).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
