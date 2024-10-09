import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/testing/testUtils';
import '@testing-library/jest-dom';
import SearchPopup from '@/components/header/SearchPopup';
import { useMediaQuery } from '@mui/material';

describe('Search popup', () => {
  let show = true;
  const useMediaQueryMock = useMediaQuery as jest.Mock;
  const close = jest.fn(() => show = false);
  const onSubmit = jest.fn((val: string) => console.log(val));

  beforeEach(() => {
    show = true;
    render(
      <SearchPopup 
        show={show}
        onSubmit={onSubmit}
        close={close}
      />
    );
  })

  test('closes when close button clicked', () => {
    const closeBtn = screen.getByTestId('close-btn');
    fireEvent.click(closeBtn);

    expect(close).toHaveBeenCalled();
    expect(show).toBe(false);
  });

  test('submits when submit clicked', () => {
    const search = screen.getByPlaceholderText('Search');
    expect(search).toBeInTheDocument();

    const searchBtn = screen.getByTestId('search-btn');
    expect(searchBtn).toBeInTheDocument(); 
    fireEvent.change(search, {
      target: {
        value: 'search text',
      }
    });
    fireEvent.click(searchBtn);
    expect(onSubmit).toHaveBeenCalled();
  });

  test('transfers popular search term to input on click', () => {
    useMediaQueryMock.mockReturnValue(false);

    const popular = screen.getByText('Popular Search Terms');
    expect(popular).toBeInTheDocument();
    const firstTerm = popular.nextElementSibling;
    expect(firstTerm!).toBeInTheDocument();
    fireEvent.click(firstTerm!);
    const search = screen.getByPlaceholderText('Search');
    expect(search).toHaveValue(firstTerm?.innerHTML);
  });

  test('to have the logo on the desktop', () => {
    useMediaQueryMock(false);

    const logo = screen.getByTestId('website-logo');
    expect(logo).toBeInTheDocument();
  });
});