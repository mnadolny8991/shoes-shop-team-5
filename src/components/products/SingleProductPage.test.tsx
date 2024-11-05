import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SingleProductPage from '@/components/products/SingleProductPage';
import useProduct from '@/hooks/useProduct';
import mockProduct from '@/testing/mocks/mockProduct';
import { useWishlist } from '@/context/WishlistContext';
import { useLastViewed } from '@/context/LastViewedContext';
import { useCartContext } from '@/context/CartContext';
import { mapApiSizeToSize } from '@/mappers/productMappers';
import { fetchSize } from '@/lib/api/fetchCategories';

jest.mock('../../hooks/useProduct');
jest.mock('../../context/WishlistContext');
jest.mock('../../context/CartContext');
jest.mock('../../context/LastViewedContext');
jest.mock('../../mappers/productMappers', () => ({
  mapApiSizeToSize: jest.fn(),
}));
jest.mock('../../lib/api/fetchCategories', () => ({
  fetchSize: jest.fn(),
}));

describe('single product page component', () => {
  const onWishlistAdd = jest.fn();
  const onWishlistRemove = jest.fn();
  const onProductAddToCart = jest.fn();
  const onLastViewedAdd = jest.fn();

  beforeEach(() => {
    (useProduct as jest.Mock).mockReturnValue({
      data: mockProduct,
      status: 'success',
      error: null,
    });
    (useWishlist as jest.Mock).mockReturnValue({
      ids: [],
      onProductAdd: onWishlistAdd,
      onProductRemove: onWishlistRemove,
    });
    (useCartContext as jest.Mock).mockReturnValue({
      onProductAdd: onProductAddToCart,
    });
    (useLastViewed as jest.Mock).mockReturnValue({
      onProductAdd: onLastViewedAdd,
    });
    (mapApiSizeToSize as jest.Mock).mockReturnValue({ id: 15, name: '38' });
    (fetchSize as jest.Mock).mockReturnValue('');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('adds product to the last viewed', async () => {
    render(<SingleProductPage id={1564} />);

    await waitFor(() => {
      expect(onLastViewedAdd).toHaveBeenCalledWith(1564);
    });
  });

  test('triggers add to wishlist', async () => {
    render(<SingleProductPage id={1564} />);

    const addToWishlistButton = screen.getByRole('button', { name: /add to wishlist/i });
    expect(addToWishlistButton).toBeInTheDocument();
    fireEvent.click(addToWishlistButton);
    expect(onWishlistAdd).toHaveBeenCalledWith(1564);
  });

  test('triggers add to wishlist', async () => {
    (useWishlist as jest.Mock).mockReturnValue({
      ids: [1564],
      onProductAdd: onWishlistAdd,
      onProductRemove: onWishlistRemove,
    });

    render(<SingleProductPage id={1564} />);

    const removeFromWishlistButton = screen.getByRole('button', { name: /remove from wishlist/i });
    expect(removeFromWishlistButton).toBeInTheDocument();
    fireEvent.click(removeFromWishlistButton);
    expect(onWishlistRemove).toHaveBeenCalledWith(1564);
  });

  test('add to bag blocked when no size is choosen', async () => {
    render(<SingleProductPage id={1564} />);

    const addToCartButton = screen.getByRole('button', { name: /add to bag/i });
    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton).toBeDisabled();
  });

  test('add to bag works when size choosen', async () => {
    render(<SingleProductPage id={1564} />);

    const sizeChip = screen.getByText('EU-38');
    expect(sizeChip).toBeInTheDocument();
    fireEvent.click(sizeChip);
    const addToCartButton = screen.getByRole('button', { name: /add to bag/i });
    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton).not.toBeDisabled();
    fireEvent.click(addToCartButton);
    await waitFor(() => {
      expect(onProductAddToCart).toHaveBeenCalledWith(1564, 38);
    });
    const snackbarMessage = screen.getByText(/have been added to the cart/i);
    expect(snackbarMessage).toBeInTheDocument();
  });

  test('displays info about the product', () => {
    render(<SingleProductPage id={1564} />);

    expect(screen.getByText(`${mockProduct.name}`)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.gender.name}'s Shoes`)).toBeInTheDocument();
    expect(screen.getByText(/select size/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.description}`)).toBeInTheDocument();
  });

  // image slider tested in another set
});