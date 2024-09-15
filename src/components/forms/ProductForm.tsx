'use client';

import { Product, Size } from '@/types/product';
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
import { useQuery } from '@tanstack/react-query';
import apiUrl from '@/data/apiUrl';
import {
  mapAllColors,
  mapAllSizes,
  mapBrands,
  mapGenders,
} from '@/mappers/productMappers';
import { useForm } from 'react-hook-form';

type ProductFormProps = {
  title: string;
  description: string;
  onSubmit: (product: Partial<Product>) => void;
  product?: Product;
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

type FormData = {
  name: string;
  price: string;
  color: string;
  gender: string;
  brand: string;
  description: string;
  sizes: number[];
};

export default function ProductForm({
  title,
  description,
  product,
  onSubmit,
}: ProductFormProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { data: colors, isLoading: isColorsLoading } = useQuery({
    queryKey: ['colors'],
    queryFn: () =>
      fetch(`${apiUrl}/colors?fields=name`)
        .then((res) => res.json())
        .then((data) => mapAllColors(data)),
  });

  const { data: sizes, isLoading: isSizesLoading } = useQuery({
    queryKey: ['sizes'],
    queryFn: () =>
      fetch(`${apiUrl}/sizes?fields=value`)
        .then((res) => res.json())
        .then((data) => mapAllSizes(data)),
  });

  const { data: brands, isLoading: isBrandLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: () =>
      fetch(`${apiUrl}/brands?fields=name`)
        .then((res) => res.json())
        .then((data) => mapBrands(data)),
  });

  const { data: genders, isLoading: isGenderLoading } = useQuery({
    queryKey: ['genders'],
    queryFn: () =>
      fetch(`${apiUrl}/genders?fields=name`)
        .then((res) => res.json())
        .then((data) => mapGenders(data)),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    getValues,
    trigger,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      name: product?.name || '',
      price: product?.price?.toString() || '',
      color: product?.color?.id?.toString() || '',
      gender: product?.gender?.id?.toString() || '',
      brand: product?.brand?.id?.toString() || '',
      description: product?.description || '',
      sizes: product?.sizes?.map(({ id }) => id) || [],
    },
  });

  const handleSizeChange = (selectedSizes: number[]) => {
    setValue('sizes', selectedSizes);
    if (selectedSizes.length === 0)
      setError('sizes', {
        type: 'custom',
        message: 'At least one size must be selected.',
      });
    else {
      clearErrors('sizes');
    }
    trigger('sizes');
  };

  const onSubmitForm = (data: FormData) => {
    onSubmit({
      ...data,
      price: parseFloat(data.price),
      color: colors!.find((color) => color.id === parseInt(data.color)),
      gender: genders!.find((gender) => gender.id === parseInt(data.gender)),
      brand: brands!.find((brand) => brand.id === parseInt(data.brand)),
      sizes: data.sizes.map((id) =>
        sizes?.find((size) => size.id === id)
      ) as Size[],
    });
  };

  return (
    <form
      onSubmit={(e) => {
        if (getValues('sizes').length === 0) {
          setError('sizes', {
            type: 'custom',
            message: 'At least one size must be selected.',
          });
          trigger('sizes');
        }
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
              pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
            })}
          />

          <Select
            id="color"
            label="Color"
            error={errors.color ? 'Color is required.' : ''}
            {...register('color', { required: true })}
          >
            <option value=""></option>
            {colors?.map(({ name, id }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </Select>

          <Stack direction="row" spacing={2}>
            <Select
              id="gender"
              label="Gender"
              error={errors.gender ? 'Gender is required.' : ''}
              {...register('gender', { required: true })}
            >
              <option value=""></option>
              {genders?.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </Select>

            <Select
              id="brand"
              label="Brand"
              error={errors.brand ? 'Brand is required.' : ''}
              {...register('brand', { required: true })}
            >
              <option value=""></option>
              {brands?.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Select>
          </Stack>

          <Textarea
            id="description"
            label="Description"
            placeholder="Do not exceed 300 characters."
            rows={isMobile ? 1 : 15}
            error={
              errors.description
                ? 'Description is required and should not exceed 300 characters.'
                : ''
            }
            {...register('description', { required: true, maxLength: 300 })}
          />

          {sizes && (
            <CheckboxesGroup
              name="sizes"
              caption="Add sizes"
              items={sizes}
              selected={getValues('sizes')} // Pass the current selected sizes
              onChange={handleSizeChange} // Handle size changes
              error={errors.sizes ? 'At least one size must be selected.' : ''}
            />
          )}
        </Stack>

        <EditingImagesBox initialImages={product?.images} />

        {isMobile && SaveButton}
      </Stack>
    </form>
  );
}
