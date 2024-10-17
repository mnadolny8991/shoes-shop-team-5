'use client';

import { Product } from '@/types/product';
import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Select from '@/components/input/Select';
import Textarea from '@/components/input/Textarea';
import InputField from '@/components/input/InputField';
import EditingImagesBox from '@/components/containers/EditingImagesBox';
import CheckboxesGroup from '@/components/input/CheckboxesGroup';
import { useForm } from 'react-hook-form';
import { ApiPutProduct } from '@/types/api/apiTypes';
import { useBrands, useColors, useGenders, useSizes } from '@/hooks/categories';
import { useState } from 'react';
import Image from 'next/image';

type ProductFormProps = {
  title: string;
  description: string;
  onSubmit: ({
    productProps,
    files,
  }: {
    productProps: ApiPutProduct;
    files: File[];
  }) => void;
  product?: Product;
  submitDirty?: boolean;
};

const SaveButton = (
  <Button
    type="submit"
    variant="contained"
    sx={{ width: 152, height: 40, fontSize: 16 }}
  >
    Save
  </Button>
);

export type ProductFormData = {
  name: string;
  price: number;
  color: number;
  gender: number;
  brand: number;
  description: string;
  sizes: number[];
  images: number[];
  uploadImages: File[];
};

export default function ProductForm({
  title,
  description,
  product,
  onSubmit,
  submitDirty = false,
}: ProductFormProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [loading, setLoading] = useState(false);
  const [AIerror, setAIError] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  //AI generated description
  const handleAISuggestion = async () => {
    const productName = getValues('name');

    if (productName) {
      setLoading(true);
      setAIError('');

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: `Generate a product description for: ${productName}`,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate description');
        }

        const data = await response.json();
        console.log(data);

        setValue('description', data.code);
      } catch (error) {
        setAIError('Failed to generate description. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const { data: colors, isLoading: isColorsLoading } = useColors();
  const { data: sizes, isLoading: isSizesLoading } = useSizes();
  const { data: brands, isLoading: isBrandLoading } = useBrands();
  const { data: genders, isLoading: isGenderLoading } = useGenders();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setValue,
    setError,
    getValues,
    trigger,
    clearErrors,
  } = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name || '',
      price: product?.price,
      color: product?.color?.id,
      gender: product?.gender?.id,
      brand: product?.brand?.id,
      description: product?.description || '',
      sizes: product?.sizes?.map(({ id }) => id) || [],
      images: product?.images?.map(({ id }) => id) || [],
      uploadImages: [],
    },
  });
  const setSizesEmptyError = () =>
    setError('sizes', {
      type: 'custom',
      message: 'At least one size must be selected.',
    });
  const handleSizeChange = (selectedSizes: number[]) => {
    setValue('sizes', selectedSizes, { shouldDirty: true });
    if (selectedSizes.length === 0) setSizesEmptyError();
    else {
      clearErrors('sizes');
    }
    trigger('sizes');
  };

  const handleImagesChange = ({
    images,
    uploadedImages,
  }: {
    images: number[];
    uploadedImages: File[];
  }) => {
    setValue('images', images, { shouldDirty: true });
    setValue('uploadImages', uploadedImages);
    if (images.length === 0 && uploadedImages.length === 0)
      setError('images', {
        type: 'custom',
        message: 'At least one image must be uploaded',
      });
    else {
      clearErrors('images');
    }
    trigger('images');
  };

  const onSubmitForm = (data: ProductFormData) => {
    // const changedData: ApiPutProduct = Object.fromEntries(
    //   Object.keys(dirtyFields).map((key) => [
    //     key,
    //     data[key as keyof ProductFormData],
    //   ])
    // );
    // onSubmit({ productProps: changedData, files: data.uploadImages });

    const productProps: ApiPutProduct = Object.fromEntries(
      Object.entries(data).filter(
        submitDirty
          ? ([key]) => key in dirtyFields && key !== 'uploadImages'
          : ([key]) => key !== 'uploadImages'
      )
    );

    onSubmit({ productProps, files: data.uploadImages });
  };

  return (
    <form
      onSubmit={(e) => {
        if (getValues('sizes').length === 0) setSizesEmptyError();

        handleSubmit(onSubmitForm)(e);
      }}
      {...(isMobile && { style: { margin: '50px 20px 0' } })}
    >
      <Stack
        direction={'row'}
        justifyContent="space-between"
        alignItems="center"
        mb={{ xs: '12px', md: '35px' }}
      >
        <Typography variant="h1">{title}</Typography>
        {!isMobile && SaveButton}
      </Stack>
      <Typography
        variant="subtitle2"
        maxWidth="890px"
        mb={{ xs: '23px', md: '40px' }}
      >
        {description}
      </Typography>
      <Stack
        spacing={{ xs: 4, md: 10 }}
        alignItems={{ xs: 'center', md: 'flex-start' }}
        direction={{ md: 'row' }}
        mb={{ xs: 3, md: 6 }}
      >
        <Stack spacing={3} maxWidth={{ xs: '320px', md: '436px' }}>
          <InputField
            id="name"
            label="Product name"
            placeholder="Nike Air Max 90"
            error={
              errors.name
                ? 'Product name is required and must be at least 3 characters.'
                : ''
            }
            {...register('name', { required: true, minLength: 3 })}
          />

          <InputField
            id="price"
            label="Price"
            placeholder="$160"
            error={
              errors.price
                ? 'Price is required and must be a valid number.'
                : ''
            }
            {...register('price', {
              required: true,
              valueAsNumber: true,
              validate: (value) =>
                /^[0-9]+(\.[0-9]{1,2})?$/.test(value.toString()),
            })}
          />

          {colors && (
            <Select
              id="color"
              label="Color"
              error={errors.color ? 'Color is required.' : ''}
              {...register('color', { required: true, valueAsNumber: true })}
            >
              <option value=""></option>
              {colors.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </Select>
          )}

          <Stack direction="row" spacing={2}>
            {genders && (
              <Select
                id="gender"
                label="Gender"
                error={errors.gender ? 'Gender is required.' : ''}
                {...register('gender', { required: true, valueAsNumber: true })}
              >
                <option value=""></option>
                {genders?.map(({ name, id }) => (
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
              </Select>
            )}
            {brands && (
              <Select
                id="brand"
                label="Brand"
                error={errors.brand ? 'Brand is required.' : ''}
                {...register('brand', { required: true, valueAsNumber: true })}
              >
                <option value=""></option>
                {brands?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </Select>
            )}
          </Stack>

          <div style={{ position: 'relative' }}>
            <Textarea
              id="description"
              label="Description"
              placeholder="Do not exceed 300 characters."
              rows={isMobile ? 1 : 15}
              error={errors.description ? 'Description is required.' : ''}
              {...register('description', { required: true, maxLength: 300 })}
            />
            {/* AI Generate Icon */}
            <Image
              src={
                isHovered ? '/AI-helper-hover.png' : '/AI-helper-default.png'
              }
              alt="Generate AI Description"
              width={isHovered ? 120 : 32}
              height={25}
              style={{
                position: 'absolute',
                right: '10px',
                bottom: '10px',
                cursor: 'pointer',
              }}
              onClick={handleAISuggestion}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>

          {sizes && (
            <CheckboxesGroup
              id="sizes"
              caption="Add sizes"
              items={sizes}
              selected={getValues('sizes')} // Pass the current selected sizes
              onChange={handleSizeChange} // Handle size changes
              error={errors.sizes?.message}
            />
          )}
        </Stack>

        <EditingImagesBox
          initialImages={product?.images}
          onChange={handleImagesChange}
          error={errors.images?.message}
        />

        {isMobile && SaveButton}
      </Stack>
    </form>
  );
}
