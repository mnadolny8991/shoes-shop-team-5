import { screen, fireEvent, waitFor } from '@testing-library/react';
import ProductCard from '@/components/products/ProductCard';
import '@testing-library/jest-dom';
import mockProduct from '@/testing/mocks/mockProduct';
import { render } from '@/testing/testUtils';
import AdminMenu from '@/components/products/AdminMenu';
import RemoveFromWishlistIconButton from '@/components/products/RemoveFromWishlistIconButton';
import { useRouter } from 'next/navigation';

jest.mock('../products/AdminMenu', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../products/RemoveFromWishlistIconButton', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('product card component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders everything correctly for nonadmin users', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.name}`)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
  });

  test('renders admin menu for admin users', () => {
    render(<ProductCard product={mockProduct} isAdmin={true} />);
    expect(AdminMenu).toHaveBeenCalledTimes(1);
  });

  test('not render admin menu if user is not an admin', () => {
    render(<ProductCard product={mockProduct} isAdmin={false} />);
    expect(AdminMenu).not.toHaveBeenCalledTimes(1);
  });

  test('renders remove from wishlist button if the item is in the wishlist', () => {
    render(<ProductCard product={mockProduct} isInWishlist={true} />);
    expect(RemoveFromWishlistIconButton).toHaveBeenCalledTimes(1);
  });

  test('makes a router push on product click', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    render(<ProductCard product={mockProduct} isAdmin={false} />);
    const card = screen.getByTestId('product-card');
    expect(card).toBeInTheDocument();
    fireEvent.click(card);
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith(`/products/${mockProduct.id}`)
    });
  });
});
