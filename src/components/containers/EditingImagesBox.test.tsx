import {
  screen,
  render,
  getByAltText,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import EditingImagesBox from './EditingImagesBox';
import mockProduct from '@/testing/mocks/mockProduct';
import { jpegFile, pngFile } from '@/testing/mocks/files';
import { useMediaQuery } from '@mui/material';

describe('EditingImagesBox', () => {
  test('render', () => {
    render(
      <EditingImagesBox
        error="test error"
        initialImages={mockProduct.images}
        onChange={() => {}}
      />
    );

    mockProduct.images.forEach((image) => {
      const imageBox = screen.getByTestId(`imageBox${image.id}`);
      expect(imageBox).toBeInTheDocument();

      const imageElement = getByAltText(imageBox, image.alternativeText);
      expect(imageElement).toBeInTheDocument();

      const deleteButton = getByAltText(imageBox, 'delete product image');
      expect(deleteButton).toBeInTheDocument();
    });

    const dropBox = screen.getByTestId('dropBox');
    expect(dropBox).toBeInTheDocument();

    const errorMessage = screen.getByText('test error');
    expect(errorMessage).toBeInTheDocument();

    expect(
      screen.queryByText('Are you sure to delete product image')
    ).toBeNull();
  });
  test('upload image', async () => {
    const onChange = jest.fn();
    render(<EditingImagesBox onChange={onChange} />);
    expect(onChange).not.toHaveBeenCalled();

    const dropBox = screen.getByTestId('dropBox');
    fireEvent.drop(dropBox, { dataTransfer: { files: [jpegFile] } });
    await waitFor(() => expect(onChange).toHaveBeenCalled());
    expect(onChange).toHaveBeenCalledWith({
      images: [],
      uploadedImages: [jpegFile],
    });
    const imageBox = screen.getByTestId('imageBox-1');
    expect(imageBox).toBeInTheDocument();

    const imageElement = getByAltText(imageBox, 'mock-jpg-image-name');
    expect(imageElement).toBeInTheDocument();

    const deleteButton = getByAltText(imageBox, 'delete product image');
    expect(deleteButton).toBeInTheDocument();
  });
  test('upload multiple images', async () => {
    const onChange = jest.fn();
    render(
      <EditingImagesBox
        onChange={onChange}
        initialImages={mockProduct.images}
      />
    );
    const initialIds = mockProduct.images.map(({ id }) => id);

    const dropBox = screen.getByTestId('dropBox');
    fireEvent.drop(dropBox, { dataTransfer: { files: [jpegFile, pngFile] } });

    await waitFor(() => expect(onChange).toHaveBeenCalled());
    expect(onChange).toHaveBeenCalledWith({
      images: initialIds,
      uploadedImages: [jpegFile, pngFile],
    });
    const imageBox1 = screen.getByTestId('imageBox-1');
    expect(imageBox1).toBeInTheDocument();
    const imageElement1 = getByAltText(imageBox1, 'mock-jpg-image-name');
    expect(imageElement1).toBeInTheDocument();
    const deleteButton1 = getByAltText(imageBox1, 'delete product image');
    expect(deleteButton1).toBeInTheDocument();

    const imageBox2 = screen.getByTestId('imageBox-2');
    expect(imageBox2).toBeInTheDocument();
    const imageElement2 = getByAltText(imageBox2, 'mock-png-image-name');
    expect(imageElement2).toBeInTheDocument();
    const deleteButton2 = getByAltText(imageBox2, 'delete product image');
    expect(deleteButton2).toBeInTheDocument();
  });
  test('delete dialog', async () => {
    const onChange = jest.fn();
    render(
      <EditingImagesBox
        onChange={onChange}
        initialImages={mockProduct.images}
      />
    );

    const deleteButton = screen.getAllByAltText('delete product image')[0];
    fireEvent.click(deleteButton);

    const deleteModalTitle = screen.queryByText(
      'Are you sure to delete product image'
    );
    expect(deleteModalTitle).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));
    await waitFor(() => expect(deleteModalTitle).not.toBeInTheDocument());

    expect(onChange).not.toHaveBeenCalled();
  });
  test('delete dialog in mobile resolution', async () => {
    const useMediaQueryMock = useMediaQuery as jest.Mock;
    useMediaQueryMock.mockReturnValue(true);

    const onChange = jest.fn();
    render(
      <EditingImagesBox
        onChange={onChange}
        initialImages={mockProduct.images}
      />
    );

    const imageBox = screen.getByTestId(`imageBox${mockProduct.images[0].id}`);
    fireEvent.click(imageBox);

    const deleteModalTitle = screen.queryByText(
      'Are you sure to delete product image'
    );
    expect(deleteModalTitle).toBeInTheDocument();

    fireEvent.click(imageBox);
    fireEvent.click(screen.getByText('Cancel'));
    await waitFor(() => expect(deleteModalTitle).not.toBeInTheDocument());

    expect(onChange).not.toHaveBeenCalled();

    useMediaQueryMock.mockRestore();
  });
  test('delete image', async () => {
    const onChange = jest.fn();
    render(
      <EditingImagesBox
        onChange={onChange}
        initialImages={mockProduct.images}
      />
    );
    const initialIds = mockProduct.images.map(({ id }) => id);

    const imageBox = screen.getByTestId(`imageBox${initialIds[1]}`);
    const deleteButton = getByAltText(imageBox, 'delete product image');
    fireEvent.click(deleteButton);

    fireEvent.click(screen.getByTestId('delete-btn-modal'));
    await waitFor(() =>
      expect(
        screen.queryByText('Are you sure to delete product image')
      ).not.toBeInTheDocument()
    );

    expect(onChange).toHaveBeenCalledWith({
      images: [initialIds[0]],
      uploadedImages: [],
    });
    expect(imageBox).not.toBeInTheDocument();
  });
  test('delete uploaded image', async () => {
    const onChange = jest.fn();
    render(
      <EditingImagesBox
        onChange={onChange}
        initialImages={mockProduct.images}
      />
    );
    const initialIds = mockProduct.images.map(({ id }) => id);

    const dropBox = screen.getByTestId('dropBox');
    fireEvent.drop(dropBox, { dataTransfer: { files: [jpegFile, pngFile] } });

    await waitFor(() => expect(onChange).toHaveBeenCalled());

    const imageBox = screen.getByTestId('imageBox-1');
    const deleteButton = getByAltText(imageBox, 'delete product image');
    fireEvent.click(deleteButton);

    fireEvent.click(screen.getByTestId('delete-btn-modal'));

    expect(onChange).toHaveBeenCalledWith({
      images: initialIds,
      uploadedImages: [pngFile],
    });
    expect(imageBox).not.toBeInTheDocument();
  });
});
