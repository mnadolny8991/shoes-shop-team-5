import { render } from '@/testing/testUtils';
import ImageContainer from './ImageContainer';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Image container', () => {
  const onClick = jest.fn();

  test('renders all elements correctly', () => {
    const props = {
      src: '/source',
      alt: 'some alt text',
      width: 100,
      height: 100,
      onClick,
    };

    render(<ImageContainer {...props} />);

    const image = screen.getByAltText(props.alt);
    expect(image).toBeInTheDocument();

    const container = screen.getByTestId('image-container');
    expect(container).toBeInTheDocument();

    fireEvent.click(image);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
