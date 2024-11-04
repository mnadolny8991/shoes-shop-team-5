import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '@/testing/testUtils';
import NothingFound from '@/components/products/NothingFound';

describe('nothing found component', () => {
  test('renders everything correctly', () => {
    render(<NothingFound />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByAltText(/bag icon/i)).toBeInTheDocument();
    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
    expect(screen.getByText(/We couldn't find what you searched for./i)).toBeInTheDocument();
  });
});