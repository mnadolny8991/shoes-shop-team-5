import { render, screen, fireEvent } from '@testing-library/react';
import ColorFilter from '@/components/filters/ColorFilter';
import '@testing-library/jest-dom';

describe('Color filter tests', () => {
  test('changes colors correctly on click', () => {
    const onChange = jest.fn();
    const filterProps = {
      colors: [
        { id: 1, name: 'red' },
        { id: 2, name: 'blue' },
        { id: 3, name: 'green' },
      ],
      selected: ['red', 'green'],
    };

    render(
      <ColorFilter
        colors={filterProps.colors}
        selected={filterProps.selected}
        onChange={onChange}
      />
    );

    const redCheckbox = screen.getByLabelText('red');
    fireEvent.click(redCheckbox);
    expect(redCheckbox).toBeInTheDocument();
    expect(onChange).toHaveBeenNthCalledWith(1, ['green']);
  });
});
