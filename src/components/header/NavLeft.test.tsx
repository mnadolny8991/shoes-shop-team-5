import { screen } from '@testing-library/react';
import { render } from '@/testing/testUtils';
import '@testing-library/jest-dom';
import { useMediaQuery } from '@mui/material';
import NavLeft from '@/components/header/NavLeft';
import { SearchContextProvider } from '@/context/SearchContext';

describe('left side of the header component', () => {
  const useMediaQueryMock = useMediaQuery as jest.Mock;

  const renderWithProvider = () => {
    render(
      <SearchContextProvider>
        <NavLeft />
      </SearchContextProvider>
    );
  };

  test('displays only one icon (mobile)', () => {
    useMediaQueryMock.mockReturnValue(true);
    renderWithProvider();

    const logo = screen.getByAltText('shoes shop logo');
    const products = screen.queryByText('Products');

    expect(logo).toBeInTheDocument();
    expect(products).not.toBeInTheDocument();
  });

  test('displays the icon and the text (desktop)', () => {
    useMediaQueryMock.mockReturnValue(false);
    renderWithProvider();

    const logo = screen.getByAltText('shoes shop logo');
    const products = screen.getByText('Products');

    expect(logo).toBeInTheDocument();
    expect(products).toBeInTheDocument();
  });
});
