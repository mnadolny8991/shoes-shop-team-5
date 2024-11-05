import { render, screen, fireEvent } from '@testing-library/react';
import CountryAutocomplete from '@/components/input/CountryAutocomplete';
import { countries } from '@/data/countries';
import '@testing-library/jest-dom';

describe('CountryAutocomplete', () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with initial props', () => {
    render(
      <CountryAutocomplete
        error=""
        value={null}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('displays error message if error prop is passed', () => {
    render(
      <CountryAutocomplete
        error="Country is required"
        value={null}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    expect(screen.getByText(/Country is required/i)).toBeInTheDocument();
  });

  test('calls onChange with selected country on selection', () => {
    render(
      <CountryAutocomplete
        error=""
        value={null}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'United States' } });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Andorra',
        code: 'AD',
        phone: '376',
      })
    );
  });

  test('calls onBlur when input loses focus', () => {
    render(
      <CountryAutocomplete
        error=""
        value={null}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const input = screen.getByRole('combobox');
    fireEvent.blur(input);

    expect(mockOnBlur).toHaveBeenCalled();
  });

  test('renders country options correctly', () => {
    render(
      <CountryAutocomplete
        error=""
        value={null}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const input = screen.getByRole('combobox');
    fireEvent.mouseDown(input);

    countries.forEach((country) => {
      expect(
        screen.getByText((content) => {
          const hasText = content.includes(
            `${country.label} (${country.code}) +${country.phone}`
          );
          return hasText;
        })
      ).toBeInTheDocument();
    });
  });
});
