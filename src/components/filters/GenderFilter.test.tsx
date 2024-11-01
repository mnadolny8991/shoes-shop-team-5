import { render, screen, fireEvent } from '@testing-library/react';
import GenderFilter from '@/components/filters/GenderFilter';
import '@testing-library/jest-dom';

describe('Gender filter tests', () => {
  test('toggles gender selection correctly on click', () => {
    const onChange = jest.fn();
    const filterProps = {
      selected: ['Men'],
    };

    render(
      <GenderFilter selected={filterProps.selected} onChange={onChange} />
    );

    const menCheckbox = screen.getByLabelText('Men');
    fireEvent.click(menCheckbox);
    expect(menCheckbox).toBeInTheDocument();
    expect(onChange).toHaveBeenNthCalledWith(1, []);
  });
});
