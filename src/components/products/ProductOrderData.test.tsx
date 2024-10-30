import { render } from '@/testing/testUtils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductOrderData from '@/components/products/ProductOrderData';

describe('product order data component', () => {
  test('displays everything correctly', () => {
    render(
      <ProductOrderData
        data={{
          delivery: 'Pomorska 73, Krakow, 50000',
          contacts: 'example contacts',
          paymentStatus: 'After payment',
        }}
      />
    );
    const deliveryPrompt = screen.getByText(/Delivery:/i);
    const delivery = screen.getByText('Pomorska 73, Krakow, 50000');

    expect(deliveryPrompt).toBeInTheDocument();
    expect(delivery).toBeInTheDocument();

    const contactsPropmt = screen.getByText(/Contacts:/i);
    const contacts = screen.getByText('example contacts');

    expect(contactsPropmt).toBeInTheDocument();
    expect(contacts).toBeInTheDocument();

    const paymentStatusPrompt = screen.getByText(/Payment status:/i);
    const paymentStatus = screen.getByText('After payment');

    expect(paymentStatusPrompt).toBeInTheDocument();
    expect(paymentStatus).toBeInTheDocument();
  });
});
