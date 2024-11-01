import { render } from '@/testing/testUtils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductOrderBasicInfo, {
  ProductOrderBasicInfoProps,
} from '@/components/products/ProductOrderBasicInfo';

describe('product order basic info component', () => {
  test('expands on click', () => {
    const onExpandClick = jest.fn();
    const productOrderBasicInfoProps = {
      orderNumber: 1,
      date: new Date(2024, 9, 10),
      shipmentStatus: 'Cancelled',
      summaryPrice: 200,
      amount: 2,
      expand: true,
      onExpandClick,
    } as ProductOrderBasicInfoProps;
    render(<ProductOrderBasicInfo {...productOrderBasicInfoProps} />);
    const expandButton = screen.getByTestId('expand-button');
    expect(expandButton).toBeInTheDocument();
    fireEvent.click(expandButton);
    expect(onExpandClick).toHaveBeenCalled();
  });

  test('renders all elements correctly', () => {
    const onExpandClick = jest.fn();
    const date = new Date(2024, 9, 10);
    const productOrderBasicInfoProps = {
      orderNumber: 1,
      date,
      shipmentStatus: 'Cancelled',
      summaryPrice: 200,
      amount: 2,
      expand: true,
      onExpandClick,
    } as ProductOrderBasicInfoProps;
    render(<ProductOrderBasicInfo {...productOrderBasicInfoProps} />);

    const orderNumber = screen.getByText(/1:/i);
    expect(orderNumber).toBeInTheDocument();

    const dateElement = screen.getByText(`${date.toLocaleDateString()}`);
    expect(dateElement).toBeInTheDocument();

    const productsHeader = screen.getByText(/Products:/);
    const productsAmount = screen.getByText(`${2}`);
    expect(productsHeader).toBeInTheDocument();
    expect(productsAmount).toBeInTheDocument();

    const summaryHeader = screen.getByText(/Summary:/i);
    const summaryPrice = screen.getByText('200$');

    expect(summaryHeader).toBeInTheDocument();
    expect(summaryPrice).toBeInTheDocument();

    const shipmentStatus = screen.getByText(/cancelled/i);
    expect(shipmentStatus).toBeInTheDocument();
  });
});
