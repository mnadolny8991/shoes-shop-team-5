import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SignupSlider from './SignupSlider';

describe('SignupSlider', () => {
  test('render', () => {
    render(<SignupSlider />);

    expect(
      screen.getByText(
        /Shoes store is a really great company because the team is passionate about the projects they produce/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText('John Stone')).toBeInTheDocument();
    expect(screen.getByText('Ukraine, Chernivtsi')).toBeInTheDocument();

    expect(screen.getByRole('img', { name: '5 Stars' })).toBeInTheDocument();
    expect(screen.getAllByTestId('StarIcon')).toHaveLength(5);
  });
});
