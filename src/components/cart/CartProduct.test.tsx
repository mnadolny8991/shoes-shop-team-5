import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/testing/testUtils';
import '@testing-library/jest-dom';
import CartProduct from '@/components/cart/CartProduct';

describe('cart product', () => {
  const onDelete = jest.fn();

  beforeEach(() => {
    localStorage.setItem(
      'cart',
      JSON.stringify([
        {
          amount: 1,
          id: '1816da03-04c2-412e-b785-48ca3c7e3755',
          productId: 1476,
          size: 41,
        },
      ])
    );
  });

  test('has all required elements and triggers delete', async () => {
    expect(localStorage.getItem('cart')).not.toBe(null);

    render(
      <CartProduct
        id={'1816da03-04c2-412e-b785-48ca3c7e3755'}
        name="Nike Air Max"
        price={200}
        gender={'Men'}
        inStock={true}
        url="https://res.cloudinary.com/devc11z9p/image/upload/v1727117288/thumbnail_irene_kredenets_a910c8d96f.png"
        onDelete={onDelete}
      />
    );

    const image = screen.getByAltText('product image');
    expect(image).toBeInTheDocument();

    const name = screen.getByText('Nike Air Max');
    expect(name).toBeInTheDocument();
    const price = screen.getByText('$200');
    expect(price).toBeInTheDocument();
    const desc = screen.getByText("Men's shoes");
    expect(desc).toBeInTheDocument();
    const inStock = screen.getByText('In Stock');
    expect(inStock).toBeInTheDocument();

    const deleteBtn = screen.getByTestId('delete-btn');
    expect(deleteBtn).toBeInTheDocument();
    fireEvent.click(deleteBtn);
    const modalDeleteBtn = await screen.findByTestId('delete-btn-modal');
    fireEvent.click(modalDeleteBtn);

    expect(onDelete).toHaveBeenCalled();
  });
});
