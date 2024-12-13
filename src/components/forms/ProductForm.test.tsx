import {
  screen,
  fireEvent,
  getAllByRole,
  render,
  act,
  getByAltText,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { allBrands } from '@/testing/mocks/brands';
import { allColors } from '@/testing/mocks/colors';
import { allSizes } from '@/testing/mocks/sizes';
import ProductForm from './ProductForm';
import { fetchAISuggestion } from '@/lib/fetchAISuggestion';
import {
  aiDescription,
  tooLongDescription,
} from '@/testing/mocks/productDescription';
import { jpegFile, pngFile } from '@/testing/mocks/files';
import { useMediaQuery } from '@mui/material';
import { ApiPutProduct } from '@/types/api/apiTypes';
import mockProduct from '@/testing/mocks/mockProduct';

type SubmitFormProps = {
  productProps: ApiPutProduct;
  files: File[];
};

jest.mock('../../hooks/categories', () => ({
  useColors: () => ({ data: allColors, isLoading: false }),
  useSizes: () => ({ data: allSizes, isLoading: false }),
  useBrands: () => ({ data: allBrands, isLoading: false }),
  useGenders: () => ({
    data: [
      { id: 3, name: 'Men' },
      { id: 4, name: 'Women' },
    ],
    isLoading: false,
  }),
}));

jest.mock('../../lib/fetchAISuggestion', () => ({
  fetchAISuggestion: jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ code: aiDescription }),
  }),
}));

const onSubmit = jest.fn();

describe('product form', () => {
  const nameErrorMessage =
    'Product name is required and must be at least 3 characters.';
  const priceErrorMessage = 'Price is required and must be a valid number.';
  const colorErrorMessage = 'Color is required.';
  const genderErrorMessage = 'Gender is required.';
  const brandErrorMessage = 'Brand is required.';
  const descriptionErrorMessage = 'Description is required.';
  const sizesErrorMessage = 'At least one size must be selected.';
  const imagesErrorMessage = 'At least one image must be uploaded';
  describe('no initial data', () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <ProductForm
            title="product title"
            description="Provide detailed information"
            onSubmit={onSubmit}
          />
        );
      });
    });

    test('render title', () => {
      const title = screen.getByText('product title');
      expect(title).toBeInTheDocument();
    });
    test('render form description', () => {
      const description = screen.getByText('Provide detailed information');
      expect(description).toBeInTheDocument();
    });
    test('render name', () => {
      const name = screen.getByLabelText('Product name');
      expect(name).toBeInTheDocument();
      // expect(name).toBeRequired()
      expect(name).toHaveAttribute('placeholder', 'Nike Air Max 90');
      expect(screen.queryByText(nameErrorMessage)).toBeNull();
    });
    test('name validation and error', async () => {
      const name = screen.getByLabelText('Product name');

      await act(async () => {
        name.focus();
        name.blur();
      });
      const error = screen.getByText(nameErrorMessage);
      expect(error).toBeInTheDocument();

      await act(async () => {
        name.focus();
        fireEvent.change(name, { target: { value: '12' } });
        expect(name).toHaveDisplayValue('12');
        name.blur();
      });
      expect(error).toBeInTheDocument();

      await act(async () => {
        name.focus();
        fireEvent.change(name, { target: { value: 'new product name' } });
        name.blur();
      });
      expect(name).toHaveDisplayValue('new product name');
      expect(error).not.toBeInTheDocument();
    });
    test('render price', () => {
      const price = screen.getByLabelText('Price');
      expect(price).toBeInTheDocument();
      // expect(price).toBeRequired()
      expect(price).toHaveAttribute('placeholder', '$160');
      expect(screen.queryByText(priceErrorMessage)).toBeNull();
    });
    test('price validation and error', async () => {
      const price = screen.getByLabelText('Price');

      await act(async () => {
        price.focus();
        price.blur();
      });
      const error = screen.getByText(priceErrorMessage);
      expect(error).toBeInTheDocument();

      await act(async () => {
        price.focus();
        fireEvent.change(price, { target: { value: 123 } });
        price.blur();
      });
      expect(error).not.toBeInTheDocument();

      await act(async () => {
        price.focus();
        fireEvent.change(price, { target: { value: 123.2225 } });
        price.blur();
      });
      expect(screen.getByText(priceErrorMessage)).toBeInTheDocument();
    });
    test('render colors', () => {
      const colors: HTMLSelectElement = screen.getByLabelText('Color');
      expect(colors).toBeInTheDocument();
      expect(colors).toHaveDisplayValue('');

      const options = getAllByRole(colors, 'option');
      expect(options).toHaveLength(1 + allColors.length);
      options.forEach((option, i) => {
        expect(option).toHaveTextContent(allColors[i - 1]?.name || '');
        expect(option).toHaveValue(allColors[i - 1]?.id.toString() || '');
      });
      expect(screen.queryByText(colorErrorMessage)).toBeNull();
    });
    test('colors selection', async () => {
      const colors: HTMLSelectElement = screen.getByLabelText('Color');

      await act(async () => {
        colors.focus();
        colors.blur();
      });
      const error = screen.getByText(colorErrorMessage);
      expect(error).toBeInTheDocument();

      await act(async () => {
        colors.focus();
        fireEvent.change(colors, { target: { value: 8 } });
        colors.blur();
      });
      expect(colors).toHaveDisplayValue('Black');
      expect(error).not.toBeInTheDocument();
    });
    test('render gender', () => {
      const gender: HTMLSelectElement = screen.getByLabelText('Gender');
      expect(gender).toBeInTheDocument();
      expect(gender).toHaveDisplayValue('');

      const options = getAllByRole(gender, 'option');
      expect(options).toHaveLength(3);
      expect(screen.queryByText(genderErrorMessage)).toBeNull();
    });
    test('gender selection', async () => {
      const gender: HTMLSelectElement = screen.getByLabelText('Gender');

      await act(async () => {
        gender.focus();
        gender.blur();
      });
      const error = screen.getByText(genderErrorMessage);
      expect(error).toBeInTheDocument();

      await act(async () => {
        gender.focus();
        fireEvent.change(gender, { target: { value: 3 } });
        gender.blur();
      });
      expect(gender).toHaveDisplayValue('Men');
      expect(error).not.toBeInTheDocument();
    });
    test('render brand', () => {
      const brand: HTMLSelectElement = screen.getByLabelText('Brand');
      expect(brand).toBeInTheDocument();
      expect(brand).toHaveDisplayValue('');

      const options = getAllByRole(brand, 'option');
      expect(options).toHaveLength(1 + allBrands.length);
      options.forEach((option, i) => {
        expect(option).toHaveTextContent(allBrands[i - 1]?.name || '');
        expect(option).toHaveValue(allBrands[i - 1]?.id.toString() || '');
      });
      expect(screen.queryByText(brandErrorMessage)).toBeNull();
    });
    test('brand selection', async () => {
      const brand: HTMLSelectElement = screen.getByLabelText('Brand');

      await act(async () => {
        brand.focus();
        brand.blur();
      });
      const error = screen.getByText(brandErrorMessage);
      expect(error).toBeInTheDocument();

      await act(async () => {
        brand.focus();
        fireEvent.change(brand, { target: { value: 17 } });
        brand.blur();
      });
      expect(brand).toHaveDisplayValue('Reebok');
      expect(error).not.toBeInTheDocument();
    });
    test('render description', () => {
      const description = screen.getByLabelText('Description');
      expect(description).toBeInTheDocument();
      // expect(description).toBeRequired()
      expect(description).toHaveAttribute(
        'placeholder',
        'Do not exceed 300 characters.'
      );
      expect(screen.queryByText(descriptionErrorMessage)).toBeNull();
    });
    test('description validation and error', async () => {
      const description = screen.getByLabelText('Description');

      await act(async () => {
        description.focus();
        description.blur();
      });
      const error = screen.getByText(descriptionErrorMessage);
      expect(error).toBeInTheDocument();

      await act(async () => {
        description.focus();
        fireEvent.change(description, {
          target: { value: tooLongDescription },
        });
        description.blur();
      });
      expect(description).toHaveDisplayValue(tooLongDescription);
      expect(screen.getByText(descriptionErrorMessage)).toBeInTheDocument();

      await act(async () => {
        description.focus();
        fireEvent.change(description, {
          target: { value: 'new product description' },
        });
        description.blur();
      });
      expect(description).toHaveDisplayValue('new product description');
      expect(error).not.toBeInTheDocument();
    });
    test('render AI button', () => {
      expect(
        screen.getByAltText('Generate AI Description')
      ).toBeInTheDocument();
    });
    test('AI description generation', async () => {
      const aiButton = screen.getByAltText('Generate AI Description');
      fireEvent.click(aiButton);
      expect(fetchAISuggestion).not.toHaveBeenCalled();

      const nameInput = screen.getByLabelText('Product name');
      await act(async () => {
        fireEvent.change(nameInput, { target: { value: 'new product name' } });
      });
      await act(async () => fireEvent.click(aiButton));
      expect(fetchAISuggestion).toHaveBeenCalled();
      const descriptionInput: HTMLTextAreaElement =
        screen.getByLabelText('Description');
      expect(descriptionInput).toHaveDisplayValue(aiDescription);
    });
    test('render sizes', () => {
      const sizesCaption = screen.getByText('Add sizes');
      expect(sizesCaption).toBeInTheDocument();

      allSizes.forEach(({ id, name }) => {
        const sizeCheckbox = screen.getByLabelText(name);
        expect(sizeCheckbox).toBeInTheDocument();
        expect(sizeCheckbox).not.toBeChecked();
      });

      expect(screen.queryByText(sizesErrorMessage)).toBeNull();
    });
    test('sizes selection', async () => {
      const size40 = screen.getByLabelText('40');

      await act(async () => fireEvent.click(size40));
      expect(size40).toBeChecked();
      expect(screen.queryByText(sizesErrorMessage)).toBeNull();

      await act(async () => fireEvent.click(size40));
      expect(size40).not.toBeChecked();
      expect(screen.queryByText(sizesErrorMessage)).toBeInTheDocument();
    });
    test('render image files input', () => {
      const dropBox = screen.getByTestId('dropBox');
      expect(dropBox).toBeInTheDocument();

      expect(screen.queryByText(imagesErrorMessage)).not.toBeInTheDocument();
    });
    test('upload and delete image file', async () => {
      const dropBox = screen.getByTestId('dropBox');

      fireEvent.drop(dropBox, { dataTransfer: { files: [jpegFile] } });
      const imageBox = await screen.findByTestId('imageBox-1');
      expect(imageBox).toBeInTheDocument();
      expect(screen.queryByText(imagesErrorMessage)).not.toBeInTheDocument();

      const deleteButton = getByAltText(imageBox, 'delete product image');
      fireEvent.click(deleteButton);
      await act(async () =>
        fireEvent.click(screen.getByTestId('delete-btn-modal'))
      );
      expect(imageBox).not.toBeInTheDocument();
      expect(screen.queryByText(imagesErrorMessage)).toBeInTheDocument();
    });
    test('render save button', () => {
      const saveButton = screen.getByRole('button', { name: 'Save' });
      expect(saveButton).toBeInTheDocument();
    });
    test('render save button in mobile resolution', () => {
      const useMediaQueryMock = useMediaQuery as jest.Mock;
      useMediaQueryMock.mockReturnValue(true);

      const saveButton = screen.getByRole('button', { name: 'Save' });
      expect(saveButton).toBeInTheDocument();

      useMediaQueryMock.mockRestore();
    });
    test('show all errors when trying to save empty form', async () => {
      const saveButton = screen.getByRole('button', { name: 'Save' });
      await act(() => fireEvent.click(saveButton));
      expect(onSubmit).not.toHaveBeenCalled();
      expect(screen.getByText(nameErrorMessage)).toBeInTheDocument();
      expect(screen.getByText(priceErrorMessage)).toBeInTheDocument();
      expect(screen.getByText(colorErrorMessage)).toBeInTheDocument();
      expect(screen.getByText(genderErrorMessage)).toBeInTheDocument();
      expect(screen.getByText(brandErrorMessage)).toBeInTheDocument();
      expect(screen.getByText(descriptionErrorMessage)).toBeInTheDocument();
      expect(screen.getByText(sizesErrorMessage)).toBeInTheDocument();
      expect(screen.getByText(imagesErrorMessage)).toBeInTheDocument();
    });
    test('fill and submit form', async () => {
      const name = screen.getByLabelText('Product name');
      fireEvent.change(name, { target: { value: 'new product name' } });

      const price = screen.getByLabelText('Price');
      fireEvent.change(price, { target: { value: 120 } });

      const colors: HTMLSelectElement = screen.getByLabelText('Color');
      fireEvent.change(colors, { target: { value: 9 } });

      const gender: HTMLSelectElement = screen.getByLabelText('Gender');
      fireEvent.change(gender, { target: { value: 4 } });

      const brand: HTMLSelectElement = screen.getByLabelText('Brand');
      fireEvent.change(brand, { target: { value: 12 } });

      const aiButton = screen.getByAltText('Generate AI Description');
      await act(async () => fireEvent.click(aiButton));

      const size41 = screen.getByLabelText('41');
      await act(async () => fireEvent.click(size41));
      const size42 = screen.getByLabelText('42');
      await act(async () => fireEvent.click(size42));

      const dropBox = screen.getByTestId('dropBox');
      fireEvent.drop(dropBox, { dataTransfer: { files: [pngFile, jpegFile] } });
      await screen.findByTestId('imageBox-1');
      await screen.findByTestId('imageBox-2');

      const saveButton = screen.getByRole('button', { name: 'Save' });
      await act(() => fireEvent.click(saveButton));

      const submitProps: SubmitFormProps = {
        productProps: {
          name: 'new product name',
          price: 120,
          color: 9,
          gender: 4,
          brand: 12,
          description: aiDescription,
          sizes: [18, 19],
          images: [],
        },
        files: [pngFile, jpegFile],
      };
      expect(onSubmit).toHaveBeenCalledWith(submitProps);
    });
  });

  describe('based on existing product', () => {
    beforeEach(() => {
      render(
        <ProductForm
          title="product title"
          description="Provide detailed information"
          onSubmit={onSubmit}
          product={mockProduct}
          submitDirty
        />
      );
    });

    test('render initial product', () => {
      const name = screen.getByLabelText('Product name');
      expect(name).toHaveDisplayValue(mockProduct.name);

      const price = screen.getByLabelText('Price');
      expect(price).toHaveDisplayValue(mockProduct.price.toString());

      const colors = screen.getByLabelText('Color');
      expect(colors).toHaveDisplayValue(mockProduct.color?.name!);

      const gender = screen.getByLabelText('Gender');
      expect(gender).toHaveDisplayValue(mockProduct.gender.name);

      const brand = screen.getByLabelText('Brand');
      expect(brand).toHaveDisplayValue(mockProduct.brand.name);

      const description = screen.getByLabelText('Description');
      expect(description).toHaveDisplayValue(mockProduct.description);

      const mockSelectedSizesIds = mockProduct.sizes!.map(({ id }) => id);
      allSizes.forEach(({ id, name }) => {
        const sizeCheckbox = screen.getByLabelText(name);
        mockSelectedSizesIds.includes(id)
          ? expect(sizeCheckbox).toBeChecked()
          : expect(sizeCheckbox).not.toBeChecked();
      });

      mockProduct.images.forEach((image) => {
        const imageBox = screen.getByTestId(`imageBox${image.id}`);
        expect(imageBox).toBeInTheDocument();

        const imageElement = getByAltText(imageBox, image.alternativeText);
        expect(imageElement).toBeInTheDocument();
      });
    });
    test('submit only dirty data: name, price, brand', async () => {
      const changedProductProps: ApiPutProduct = {
        name: 'new product name',
        price: 101,
        brand: 11,
      };
      const name = screen.getByLabelText('Product name');
      fireEvent.change(name, { target: { value: changedProductProps.name } });

      const price = screen.getByLabelText('Price');
      fireEvent.change(price, { target: { value: changedProductProps.price } });

      const brand: HTMLSelectElement = screen.getByLabelText('Brand');
      fireEvent.change(brand, { target: { value: changedProductProps.brand } });

      const saveButton = screen.getByRole('button', { name: 'Save' });
      await act(() => fireEvent.click(saveButton));

      const submitProps: SubmitFormProps = {
        productProps: changedProductProps,
        files: [],
      };
      expect(onSubmit).toHaveBeenCalledWith(submitProps);
    });
    test('submit only dirty data: color, gender, description, upload images', async () => {
      const changedProductProps: ApiPutProduct = {
        color: 15,
        description: 'new product description',
        gender: 3,
      };

      const colors: HTMLSelectElement = screen.getByLabelText('Color');
      fireEvent.change(colors, {
        target: { value: changedProductProps.color },
      });

      const gender = screen.getByLabelText('Gender');
      fireEvent.change(gender, {
        target: { value: changedProductProps.gender },
      });

      const description = screen.getByLabelText('Description');
      fireEvent.change(description, {
        target: { value: changedProductProps.description },
      });

      const dropBox = screen.getByTestId('dropBox');
      fireEvent.drop(dropBox, { dataTransfer: { files: [pngFile] } });
      await screen.findByTestId('imageBox-1');

      const saveButton = screen.getByRole('button', { name: 'Save' });
      await act(() => fireEvent.click(saveButton));

      const submitProps: SubmitFormProps = {
        productProps: changedProductProps,
        files: [pngFile],
      };
      expect(onSubmit).toHaveBeenCalledWith(submitProps);
    });
    test('submit only dirty data: sizes, ai-generated description, delete image', async () => {
      const size36 = screen.getByLabelText('36');
      await act(async () => fireEvent.click(size36));
      const size44 = screen.getByLabelText('44');
      await act(async () => fireEvent.click(size44));

      const aiButton = screen.getByAltText('Generate AI Description');
      await act(async () => fireEvent.click(aiButton));

      const imageBox = screen.getByTestId('imageBox4581');
      const deleteButton = getByAltText(imageBox, 'delete product image');
      fireEvent.click(deleteButton);
      await act(async () =>
        fireEvent.click(screen.getByTestId('delete-btn-modal'))
      );

      const saveButton = await screen.findByRole('button', { name: 'Save' });
      await act(() => fireEvent.click(saveButton));

      const submitProps: SubmitFormProps = {
        productProps: {
          sizes: [14, 15, 17, 21],
          description: aiDescription,
          images: [4394],
        },
        files: [],
      };
      expect(onSubmit).toHaveBeenCalledWith(submitProps);
    });
  });
});
