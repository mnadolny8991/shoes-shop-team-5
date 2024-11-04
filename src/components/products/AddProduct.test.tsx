import { screen, fireEvent, waitFor } from '@testing-library/react';
import AddProduct from '@/components/products/AddProduct';
import { render } from '@/testing/testUtils';
import { useAddProductMutation } from '@/hooks/useAddProductMutation';
import { Product } from '@/types/product';
import { useSession } from 'next-auth/react';
import '@testing-library/jest-dom';
import mockProduct from '@/testing/mocks/mockProduct';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));
jest.mock('../../hooks/useAddProductMutation');

// Mock data for session and product
const mockSession = { data: { id: 'user123', accessToken: 'fake-token' } };

describe('AddProduct', () => {
  const mockOnSuccessClose = jest.fn();
  const mockAddProduct = jest.fn();
  const mockUploadImagesThenAddProduct = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue(mockSession);

    // Mock useAddProductMutation hook with default state
    (useAddProductMutation as jest.Mock).mockReturnValue({
      addProduct: mockAddProduct,
      uploadImagesThenAddProduct: mockUploadImagesThenAddProduct,
      isPending: false,
      isPendingProduct: false,
      isSuccess: false,
      error: null,
    });
  });

  test('renders ProductForm with title and description', () => {
    render(
      <AddProduct
        title="Add New Product"
        description="Please fill out the form"
        onSuccessClose={mockOnSuccessClose}
      />
    );

    expect(screen.getByText(/Add New Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Please fill out the form/i)).toBeInTheDocument();
  });

  test('calls submitForm and addProduct when form is submitted without files', async () => {
    render(
      <AddProduct
        title="Add New Product"
        description="Description"
        initialProduct={mockProduct}
        onSuccessClose={mockOnSuccessClose}
      />
    );

    // Fill out form and submit
    fireEvent.submit(screen.getByText('Save'));

    await waitFor(() => {
      expect(mockAddProduct).toHaveBeenCalledWith(expect.objectContaining({
        teamName: 'team-5',
        userID: 'user123',
        // Check other properties if necessary
      }));
    });
  });

  test('displays loading backdrop when isPending or isPendingProduct is true', () => {
    (useAddProductMutation as jest.Mock).mockReturnValue({
      addProduct: mockAddProduct,
      uploadImagesThenAddProduct: mockUploadImagesThenAddProduct,
      isPending: true,
      isPendingProduct: false,
      isSuccess: false,
      error: null,
    });

    render(<AddProduct title="Test" description="Description" onSuccessClose={mockOnSuccessClose} />);

    waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/uploading files/i);
    });
  });

  test('displays success message when isSuccess is true', () => {
    (useAddProductMutation as jest.Mock).mockReturnValue({
      addProduct: mockAddProduct,
      uploadImagesThenAddProduct: mockUploadImagesThenAddProduct,
      isPending: false,
      isPendingProduct: false,
      isSuccess: true,
      error: null,
    });

    render(<AddProduct title="Test" description="Description" onSuccessClose={mockOnSuccessClose} />);

    expect(screen.getByText(/The Product/i)).toBeInTheDocument();
    waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('has been successfully added');
    });
  });

  test('displays error alert when error is present', () => {
    const mockError = { message: 'Server error' };
    (useAddProductMutation as jest.Mock).mockReturnValue({
      addProduct: mockAddProduct,
      uploadImagesThenAddProduct: mockUploadImagesThenAddProduct,
      isPending: false,
      isPendingProduct: false,
      isSuccess: false,
      error: mockError,
    });

    render(<AddProduct title="Test" description="Description" onSuccessClose={mockOnSuccessClose} />);

    expect(screen.getByRole('alert')).toHaveTextContent(/Server error/i);
  });
});
