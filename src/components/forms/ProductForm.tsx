'use client';

import { Product, Size } from '@/mock/products';
import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Select from '@/components/input/Select';
import { BRANDS } from '@/mock/BRANDS';
import Textarea from '@/components/input/Textarea';
import InputField from '@/components/input/InputField';
import allSizes from '@/data/allSizes';
import EditingImagesBox from '@/components/containers/EditingImagesBox';
import CheckboxesGroup from '@/components/input/CheckboxesGroup';

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
  onSubmit,
}: ProductFormProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSubmit({
      ...Object.fromEntries(formData),
      sizes: (formData.getAll('sizes') as string[]).map((id) =>
        allSizes.find((size) => size.id === +id)
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
        mb={{xs: 3, md:6}}
      >
        <Stack spacing={3} maxWidth={{ xs: '320px', md: '436px' }}>
          <InputField
            id="name"
            name="name"
            label="Product name"
            required
            placeholder='Nike Air Max 90'
          />
          <InputField id="price" name="price" label="Price" required placeholder='$160'/>
          <Stack direction="row" spacing={2}>
            <Select
              id="gender"
              name="gender"
              label="Gender"
              required
              defaultValue=""
            >
              <option value="" disabled></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
            <Select id="color" name="color" label="Color" defaultValue="">
              <option value=""></option>
              {['black', 'blue', 'gray', 'green', 'red', 'white', 'yellow'].map(
                (color) => (
                  <option value={color} key={color}>
                    {color}
                  </option>
                )
              )}
            </Select>
          </Stack>
          <Select
            id="brand"
            name="brand"
            label="Brand"
            required
            defaultValue=""
        >
            <option value="" disabled></option>
            {BRANDS.map((brand) => (
            <option key={brand} value={brand}>
                {brand}
            </option>
            ))}
        </Select>
          <Textarea
            id="description"
            name="description"
            label="Description"
            required
            rows={isMobile ? 1 : 15}
            placeholder="Do not exceed 300 characters."
          />
          <CheckboxesGroup name='sizes' caption='Add sizes' items={allSizes}/>
        </Stack>
        <EditingImagesBox/>
        {isMobile && SaveButton}
      </Stack>
    </form>
  );
}
