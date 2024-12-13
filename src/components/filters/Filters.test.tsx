import { screen, fireEvent, waitFor } from '@testing-library/react';
import ColorFilter from '@/components/filters/ColorFilter';
import { render } from '@/testing/testUtils';
import '@testing-library/jest-dom';
import Filters from '@/components/filters/Filters';
import allSizes from '@/data/allSizes';
import { BRANDS } from '@/mock/BRANDS';

describe('filters component', () => {
  test('displays all default elements (expanded by default)', () => {
    render(<Filters />);

    const genderExpandBtn = screen.getByRole('button', { name: /Gender/i });
    expect(genderExpandBtn).toBeInTheDocument();
    const sizesExpandBtn = screen.getByRole('button', {
      name: /Sizes \(EU\)/i,
    });
    expect(sizesExpandBtn).toBeInTheDocument();
    const brandsExpandBtn = screen.getByRole('button', { name: /Brand/i });
    expect(brandsExpandBtn).toBeInTheDocument();
    const priceExpandBtn = screen.getByRole('button', { name: /Price/i });
    expect(priceExpandBtn).toBeInTheDocument();
    const colorExpandBtn = screen.getByRole('button', { name: /Color/i });
    expect(colorExpandBtn).toBeInTheDocument();

    const captionElement = screen.getByText('Shoes');
    expect(captionElement).toBeInTheDocument();
    const genderCaptionElement = screen.getByText('Gender');
    expect(genderCaptionElement).toBeInTheDocument();
    const genderInputElements = screen.getAllByRole('checkbox');
    const expectedLabels = ['Men', 'Women'];
    genderInputElements.forEach((inputEl, index) => {
      expect(inputEl).toHaveAccessibleName(expectedLabels[index]);
    });
  });

  // test('displays all elements with sizes filter expanded', async () => {
  //   render(<Filters />);

  //   const genderExpandBtn = screen.getByRole('button', { name: /Gender/i });
  //   fireEvent.click(genderExpandBtn);
  //   const sizesExpandBtn = screen.getByRole('button', {
  //     name: /Sizes \(EU\)/i,
  //   });
  //   fireEvent.click(sizesExpandBtn);

  //   await waitFor(() => {
  //     const sizeInputElements = screen.getAllByRole('checkbox');
  //     const expectedSizes = allSizes;
  //     sizeInputElements.forEach((inputEl, index) => {
  //       expect(inputEl).toHaveAccessibleName(
  //         expectedSizes[index].name.slice(-2)
  //       );
  //     });
  //   });
  // });
});
