import { render } from '@/testing/testUtils';
import BrandFilter from '@/components/filters/BrandFilter';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Brand filter tests', () => {
  test('changes brands correctly on click', () => {
    const onChange = jest.fn();
    const filterProps = {
      brands: ['nike', 'adidas', 'puma'],
      selected: ['nike', 'puma'],
    };
    render(
      <BrandFilter 
        brands={filterProps.brands}
        selected={filterProps.selected}
        onChange={onChange}
      />
    );

    const nikeCheckbox = screen.getByLabelText('nike');
    fireEvent.click(nikeCheckbox);
    expect(nikeCheckbox).toBeInTheDocument();
    expect(onChange).toHaveBeenNthCalledWith(1, ['puma']);
  });
});