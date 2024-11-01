import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageFileInput from './ImageFileInput';
import { jpegFile, pngFile, textFile } from '@/testing/mocks/files';

describe('ImageFileInput', () => {
  const onFileUpload = jest.fn();
  beforeEach(() => {
    render(<ImageFileInput onFileUpload={onFileUpload} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('render', () => {
    const dropBox = screen.getByTestId('dropBox');
    expect(dropBox).toBeInTheDocument();

    const galleryImg = screen.getByAltText('gallery');
    expect(galleryImg).toBeInTheDocument();

    const dropTitle = screen.getByText('Drop your image here, or select');
    expect(dropTitle).toBeInTheDocument();

    const fileInput = screen.getByLabelText('click to browse');
    expect(fileInput).toBeInTheDocument();
  });
  test('upload jpeg image', () => {
    const fileInput: HTMLInputElement =
      screen.getByLabelText('click to browse');
    fireEvent.change(fileInput, { target: { files: [jpegFile] } });
    expect(onFileUpload).toHaveBeenCalledWith([jpegFile]);
  });
  test('trying to upload, but no files ', () => {
    const fileInput: HTMLInputElement =
      screen.getByLabelText('click to browse');
    fireEvent.change(fileInput, { target: { files: null } });
    expect(onFileUpload).not.toHaveBeenCalled();
  });
  test('upload text/plain', () => {
    const fileInput: HTMLInputElement =
      screen.getByLabelText('click to browse');
    fireEvent.change(fileInput, { target: { files: [textFile] } });
    expect(onFileUpload).not.toHaveBeenCalled();
  });
  test('upload different files', () => {
    const fileInput: HTMLInputElement =
      screen.getByLabelText('click to browse');
    fireEvent.change(fileInput, { target: { files: [jpegFile, textFile] } });
    expect(onFileUpload).not.toHaveBeenCalled();
  });
  test('upload multiple images', () => {
    const fileInput: HTMLInputElement =
      screen.getByLabelText('click to browse');
    fireEvent.change(fileInput, { target: { files: [jpegFile, pngFile] } });
    expect(onFileUpload).toHaveBeenCalledWith([jpegFile, pngFile]);
  });
  test('drop jpeg image', () => {
    const dropBox = screen.getByTestId('dropBox');
    fireEvent.drop(dropBox, { dataTransfer: { files: [jpegFile] } });
    expect(onFileUpload).toHaveBeenCalledWith([jpegFile]);
  });
  test('drop but not files ', () => {
    const dropBox = screen.getByTestId('dropBox');
    fireEvent.drop(dropBox, { dataTransfer: { files: null } });
    expect(onFileUpload).not.toHaveBeenCalled();
  });
  test('drop text/plain', () => {
    const dropBox = screen.getByTestId('dropBox');
    fireEvent.drop(dropBox, { dataTransfer: { files: [textFile] } });
    expect(onFileUpload).not.toHaveBeenCalled();
  });
  test('drop different files', () => {
    const dropBox = screen.getByTestId('dropBox');
    fireEvent.drop(dropBox, { dataTransfer: { files: [jpegFile, textFile] } });
    expect(onFileUpload).not.toHaveBeenCalled();
  });
  test('drop multiple images', () => {
    const dropBox = screen.getByTestId('dropBox');
    fireEvent.drop(dropBox, { dataTransfer: { files: [jpegFile, pngFile] } });
    expect(onFileUpload).toHaveBeenCalledWith([jpegFile, pngFile]);
  });
});
