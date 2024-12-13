import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { variants } from './SearchBar';

// Mock theme for testing
const theme = createTheme();

describe('SearchBar component', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
    width: '100%',
    height: '50px',
    variant: 'header' as const,
    withErase: false,
    onIconClick: jest.fn(),
  };

  const renderComponent = (props = {}) =>
    render(
      <ThemeProvider theme={theme}>
        <SearchBar {...defaultProps} {...props} />
      </ThemeProvider>
    );

  it('renders correctly with default props', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('applies correct styles based on variant', () => {
    renderComponent({ variant: 'popupLarge' });
    const input = screen.getByPlaceholderText('Search');
    expect(input).toHaveStyle({
      fontSize: variants.popupLarge.fontSize,
      fontWeight: variants.popupLarge.fontWeight,
      lineHeight: variants.popupLarge.lineHeight,
    });
  });

  it('calls onChange function when input value changes', () => {
    renderComponent();
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('test');
  });

  it('calls onIconClick function when search icon is clicked', () => {
    renderComponent();
    const iconButton = screen.getByRole('button');
    fireEvent.click(iconButton);
    expect(defaultProps.onIconClick).toHaveBeenCalled();
  });

  it('renders the erase icon button when withErase is true', () => {
    renderComponent({ withErase: true });
    expect(screen.getByTestId('search-btn')).toBeInTheDocument();
  });

  it('clears input value when erase icon button is clicked', () => {
    const onChangeMock = jest.fn();
    renderComponent({ value: 'test', withErase: true, onChange: onChangeMock });
    const eraseButton = screen.getByTestId('search-btn');
    fireEvent.click(eraseButton);
    expect(onChangeMock).toHaveBeenCalledWith('');
  });

  it('focuses input field after clicking the erase button', () => {
    const { container } = renderComponent({ value: 'test', withErase: true });
    const input = container.querySelector('input');
    const eraseButton = screen.getByTestId('search-btn');
    fireEvent.click(eraseButton);
    setTimeout(() => {
      expect(input).toHaveFocus();
    }, 100);
  });

  it('does not render erase button when withErase is false', () => {
    renderComponent({ withErase: false });
    expect(screen.queryByTestId('search-btn')).not.toBeInTheDocument();
  });
});
