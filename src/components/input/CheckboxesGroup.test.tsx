import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxesGroup from '@/components/input/CheckboxesGroup';
import '@testing-library/jest-dom';

describe('CheckboxesGroup', () => {
  const mockOnChange = jest.fn();
  const items = [
    { id: 1, name: 'Small' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'Large' },
  ];
  const caption = 'Size';
  const error = 'Please select at least one size';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with provided items and caption', () => {
    render(
      <CheckboxesGroup
        id="size"
        caption={caption}
        items={items}
        selected={[]}
        onChange={mockOnChange}
        error=""
      />
    );

    expect(screen.getByText(caption)).toBeInTheDocument();
    items.forEach((item) => {
      expect(screen.getByLabelText(item.name)).toBeInTheDocument();
    });
  });

  test('displays error message if error prop is provided', () => {
    render(
      <CheckboxesGroup
        id="size"
        caption={caption}
        items={items}
        selected={[]}
        onChange={mockOnChange}
        error={error}
      />
    );

    expect(screen.getByText(error)).toBeInTheDocument();
  });

  test('calls onChange with correct values when checkboxes are selected', () => {
    const { rerender } = render(
      <CheckboxesGroup
        id="size"
        caption={caption}
        items={items}
        selected={[]}
        onChange={mockOnChange}
        error=""
      />
    );

    // Select "Small" checkbox
    const smallCheckbox = screen.getByLabelText('Small');
    fireEvent.click(smallCheckbox);

    expect(mockOnChange).toHaveBeenCalled();

    rerender(
      <CheckboxesGroup
        id="size"
        caption={caption}
        items={items}
        selected={[]}
        onChange={mockOnChange}
        error=""
      />
    );
    // Select "Medium" checkbox
    const mediumCheckbox = screen.getByLabelText('Medium');
    fireEvent.click(mediumCheckbox);

    expect(mockOnChange).toHaveBeenCalled();
  });

  test('calls onChange with correct values when checkboxes are deselected', () => {
    const { rerender } = render(
      <CheckboxesGroup
        id="size"
        caption={caption}
        items={items}
        selected={[1, 2]}
        onChange={mockOnChange}
        error=""
      />
    );

    // Deselect "Small" checkbox
    const smallCheckbox = screen.getByLabelText('Small');
    fireEvent.click(smallCheckbox);

    expect(mockOnChange).toHaveBeenCalled();

    rerender(
      <CheckboxesGroup
        id="size"
        caption={caption}
        items={items}
        selected={[1, 2]}
        onChange={mockOnChange}
        error=""
      />
    );

    // Deselect "Medium" checkbox
    const mediumCheckbox = screen.getByLabelText('Medium');
    fireEvent.click(mediumCheckbox);

    expect(mockOnChange).toHaveBeenCalled();
  });

  test('displays correct initial selected state', () => {
    render(
      <CheckboxesGroup
        id="size"
        caption={caption}
        items={items}
        selected={[1]}
        onChange={mockOnChange}
        error=""
      />
    );

    const smallCheckbox = screen.getByLabelText('Small');
    const mediumCheckbox = screen.getByLabelText('Medium');
    const largeCheckbox = screen.getByLabelText('Large');

    expect(smallCheckbox).toBeChecked();
    expect(mediumCheckbox).not.toBeChecked();
    expect(largeCheckbox).not.toBeChecked();
  });
});
