import { render } from '@/testing/testUtils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductOrderDetails from '@/components/products/ProductOrderDetails';
import mockProduct from '@/testing/mocks/mockProduct';

describe('product order details test', () => {
  test('displays everything correctly', () => {
    render(
      <ProductOrderDetails
        productInfo={{
          product: mockProduct,
          size: 40,
          quantity: 3,
        }}
      />
    );

    const image = screen.getByAltText(mockProduct.images[0].alternativeText);
    expect(image).toBeInTheDocument();

    const productName = screen.getByText(mockProduct.name);
    expect(productName).toBeInTheDocument();

    const genderInfo = screen.getByText(`${mockProduct.gender.name}'s shoes`);
    expect(genderInfo).toBeInTheDocument();

    const sizeInfo = screen.getByText('Size: 40 EU');
    expect(sizeInfo).toBeInTheDocument();

    const quantityPrompt = screen.getByText(/quantity/i);
    const quantityInfo = screen.getByText('3');
    expect(quantityInfo).toBeInTheDocument();
    expect(quantityPrompt).toBeInTheDocument();

    const pricePromps = screen.getByText(/price:/i);
    const priceInfo = screen.getByText(`${mockProduct.price}$`);
    expect(pricePromps).toBeInTheDocument();
    expect(priceInfo).toBeInTheDocument();
  });
});
