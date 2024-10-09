import { screen } from '@testing-library/react';
import { render } from '@/testing/testUtils';
import '@testing-library/jest-dom';
import { useMediaQuery } from '@mui/material';
import NavLeft from '@/components/header/NavLeft';

describe('left side of the header component', () => {
  const useMediaQueryMock = useMediaQuery as jest.Mock;

  test('displays only one icon (mobile)', () => {
    useMediaQueryMock.mockReturnValue(true);
    render(<NavLeft />);

    const logo = screen.getByAltText('shoes shop logo');
    const products = screen.queryByText('Products');

    expect(logo).toBeInTheDocument();
    expect(products).not.toBeInTheDocument();
  });

  test('displays the icon and the text (desktop)', () => {
    useMediaQueryMock.mockReturnValue(false);
    render(<NavLeft />);

    const logo = screen.getByAltText('shoes shop logo');
    const products = screen.getByText('Products');

    expect(logo).toBeInTheDocument();
    expect(products).toBeInTheDocument();
  });
});
