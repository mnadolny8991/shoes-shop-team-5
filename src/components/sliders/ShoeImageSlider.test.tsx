import '@testing-library/jest-dom';
import { ProductImage } from '@/types/product';
import ShoeImageSlider from './ShoeImageSlider';
import { fireEvent, render, screen } from '@testing-library/react';
import { useMediaQuery } from '@mui/material';

jest.mock(
  '../containers/ImageContainer',
  () => (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />
);

const mockImages: ProductImage[] = [
  { id: 1, name: 'image1', url: '/image1.jpg', alternativeText: 'Image 1' },
  { id: 2, name: 'image2', url: '/image2.jpg', alternativeText: 'Image 2' },
  { id: 3, name: 'image3', url: '/image3.jpg', alternativeText: 'Image 3' },
];
describe('ShoeImageSlider', () => {
  test('render ', () => {
    render(<ShoeImageSlider images={mockImages} />);

    mockImages.forEach((image) => {
      const imgElement = screen.getByRole('img', {
        name: image.alternativeText,
      });
      expect(imgElement).toHaveAttribute('src', image.url);
      expect(imgElement).toHaveAttribute('width', '76');
      expect(imgElement).toHaveAttribute('height', '76');
    });

    const bigImageElement = screen.getByRole('img', { name: 'shoe image' });
    expect(bigImageElement).toHaveAttribute('src', mockImages[0].url);
    expect(bigImageElement).toHaveAttribute('width', '588');
    expect(bigImageElement).toHaveAttribute('height', '628');

    expect(screen.getByTestId('ChevronLeftOutlinedIcon')).toBeInTheDocument();
    expect(screen.getByTestId('ChevronRightOutlinedIcon')).toBeInTheDocument();
  });
  test('render  in mobile resolution', () => {
    const useMediaQueryMock = useMediaQuery as jest.Mock;
    useMediaQueryMock.mockReturnValue(true);
    render(<ShoeImageSlider images={mockImages} />);

    mockImages.forEach((image) => {
      const imgElement = screen.getByRole('img', {
        name: image.alternativeText,
      });
      expect(imgElement).toHaveAttribute('src', image.url);
      expect(imgElement).toHaveAttribute('width', '40');
      expect(imgElement).toHaveAttribute('height', '40');
    });

    const bigImageElement = screen.getByRole('img', { name: 'shoe image' });
    expect(bigImageElement).toHaveAttribute('src', mockImages[0].url);
    expect(bigImageElement).toHaveAttribute('width', '275');
    expect(bigImageElement).toHaveAttribute('height', '320');

    expect(screen.getByTestId('ChevronLeftOutlinedIcon')).toBeInTheDocument();
    expect(screen.getByTestId('ChevronRightOutlinedIcon')).toBeInTheDocument();

    useMediaQueryMock.mockRestore();
  });
  test('image click', () => {
    render(<ShoeImageSlider images={mockImages} />);

    const bigImageElement = screen.getByRole('img', { name: 'shoe image' });

    mockImages.reverse().forEach((image) => {
      const imgElement = screen.getByRole('img', {
        name: image.alternativeText,
      });
      fireEvent.click(imgElement);
      expect(bigImageElement).toHaveAttribute('src', image.url);
    });
  });
  test('slider buttons', () => {
    render(<ShoeImageSlider images={mockImages} />);

    const iconLeft = screen.getByTestId('ChevronLeftOutlinedIcon');
    const iconRight = screen.getByTestId('ChevronRightOutlinedIcon');
    const bigImageElement = screen.getByRole('img', { name: 'shoe image' });

    fireEvent.click(iconRight);
    expect(bigImageElement).toHaveAttribute('src', mockImages[1].url);
    fireEvent.click(iconRight);
    expect(bigImageElement).toHaveAttribute('src', mockImages[2].url);
    fireEvent.click(iconRight);
    expect(bigImageElement).toHaveAttribute('src', mockImages[0].url);

    fireEvent.click(iconLeft);
    expect(bigImageElement).toHaveAttribute('src', mockImages[2].url);
    fireEvent.click(iconLeft);
    expect(bigImageElement).toHaveAttribute('src', mockImages[1].url);
    fireEvent.click(iconLeft);
    expect(bigImageElement).toHaveAttribute('src', mockImages[0].url);
  });
});
