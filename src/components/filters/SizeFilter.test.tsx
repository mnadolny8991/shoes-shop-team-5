import { render, screen, fireEvent } from '@testing-library/react';
import SizeFilter from '@/components/filters/SizeFilter';
import allSizes from '@/data/allSizes';
import '@testing-library/jest-dom';

describe('Size filter tests', () => {
  test('toggles size selection correctly on click', () => {
    const onChange = jest.fn();
    const initialProps = {
      selected: ['42', '36'],
    };

    render(<SizeFilter selected={initialProps.selected} onChange={onChange} />);

    const sizeCheckbox = screen.getByLabelText('42');
    expect(sizeCheckbox).toBeInTheDocument();
    fireEvent.click(sizeCheckbox);
    expect(onChange).toHaveBeenCalledWith(['36']);
  });
});
