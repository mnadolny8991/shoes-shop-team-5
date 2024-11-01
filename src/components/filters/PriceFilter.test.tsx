import { render, screen, fireEvent } from '@testing-library/react';
import PriceFilter from '@/components/filters/PriceFilter';
import '@testing-library/jest-dom';

describe('Price filter tests', () => {
  test('displays price range and calls onChange with new values', () => {
    const onChange = jest.fn();
    const initialProps = {
      value: [100, 500],
    };

    render(<PriceFilter value={[initialProps.value[0], initialProps.value[1]]} onChange={onChange} />);

    // Check initial render
    expect(screen.getByText('Price Range: $100 - $500')).toBeInTheDocument();

    // Simulate changing the slider values
    const sliders = screen.getAllByRole('slider');
    const sliderLeft = sliders[0];
    const sliderRight = sliders[1];
    expect(sliderLeft).toBeInTheDocument();
    expect(sliderRight).toBeInTheDocument();
    fireEvent.change(sliderLeft, { target: { value: 150 } });
    expect(onChange).toHaveBeenCalledWith([150, 500]);
  });
});