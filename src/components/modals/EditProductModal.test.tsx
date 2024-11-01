import { render } from '@/testing/testUtils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditProductModal from '@/components/modals/EditProductModal';

describe('edit product modal', () => {
  test('allows to pass children', () => {
    const onClose = jest.fn();
    const editProductModalProps = {
      isOpen: true,
      onClose,
      children: <h1>children</h1>,
    };
    render(<EditProductModal {...editProductModalProps} />);
    expect(screen.getByText('children')).toBeInTheDocument();
  });
});
