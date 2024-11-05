import { render } from '@/testing/testUtils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductOrder, {
  ProductOrderProps,
} from '@/components/products/ProductOrder';
import { fetchProductById } from '@/lib/api/fetchProducts';
import apiResponses from '@/testing/mocks/mockProductsById';

jest.mock('../../lib/api/fetchProducts', () => ({
  fetchProductById: jest.fn((id: number) => {
    return apiResponses.find((productData) => productData.data.id === id);
  }),
}));

describe('product order tests', () => {
  beforeEach(() => {
    render(
      <ProductOrder
        orderNumber={0}
        date={new Date()}
        records={[
          {
            id: '123',
            productId: 2084,
            size: 35,
            quantity: 1,
          },
          {
            id: '345',
            productId: 1564,
            size: 40,
            quantity: 2,
          },
        ]}
        shipmentStatus="Recieved"
        data={{
          delivery: 'delivery',
          contacts: 'contacts',
          paymentStatus: 'After payment',
        }}
        discount={20}
      />
    );
  });

  test('render all product entries', () => {
    apiResponses.forEach(async (response) => {
      await waitFor(() => {
        expect(
          screen.getByText(response.data.attributes.name)
        ).toBeInTheDocument();
      });
    });
  });
});
