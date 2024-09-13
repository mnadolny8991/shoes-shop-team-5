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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSubmit({
      ...Object.fromEntries(formData),
      sizes: (formData.getAll('sizes') as string[]).map((id) =>
        sizes?.find((size) => size.id === +id)
      ) as Size[],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
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
            name="name"
            label="Product name"
            required
            defaultValue={product?.name}
            placeholder="Nike Air Max 90"
          />
          <InputField
            id="price"
            name="price"
            label="Price"
            required
            placeholder="$160"
            defaultValue={product?.price}
          />
          <Select
            id="color"
            name="color"
            label="Color"
            defaultValue={product?.color?.id}
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
              name="gender"
              label="Gender"
              required
              defaultValue={product?.gender.id}
            >
              <option value="" disabled></option>
              {genders?.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </Select>
            <Select
              id="brand"
              name="brand"
              label="Brand"
              required
              defaultValue={product?.brand.id}
            >
              <option value="" disabled></option>
              {brands?.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Select>
          </Stack>
          <Textarea
            id="description"
            name="description"
            label="Description"
            required
            rows={isMobile ? 1 : 15}
            placeholder="Do not exceed 300 characters."
            defaultValue={product?.description}
          />
          {sizes && (
            <CheckboxesGroup
              name="sizes"
              caption="Add sizes"
              items={sizes}
              defaultChecked={product?.sizes?.map(({ id }) => id)}
            />
          )}
        </Stack>
        <EditingImagesBox initialImages={product?.images} />
        {isMobile && SaveButton}
      </Stack>
    </form>
  );
}
