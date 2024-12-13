import { render } from '@/testing/testUtils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductOrderInvoice from '@/components/products/ProductOrderInvoice';

describe('product order invoice component', () => {
  test('displays everything correctly', () => {
    render(<ProductOrderInvoice discount={20} />);
    const pdfDownload = screen.getByRole('link', {
      name: /PDF invoice download/i,
    });
    expect(pdfDownload).toBeInTheDocument();
    const discountInfo = screen.getByText('20$');
    expect(discountInfo).toBeInTheDocument();
  });
});
