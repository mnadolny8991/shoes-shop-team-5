'use client';

import { ProductImage } from '@/types/product';
import {
  Box,
  IconButton,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ImageFileInput from '@/components/input/ImageFileInput';
import DeleteModal from '@/components/modals/DeleteModal';
import ErrorMessage from '../products/ErrorMessage';

const ImagesBox = styled('div')(() => ({
  display: 'grid',
  width: '100%',
  gridTemplateColumns: 'repeat(auto-fill, 320px)',
  gridGap: 50,
  justifyContent: 'center',
  '&>*': {
    width: 320,
    height: 380,
  },
}));

export default function EditingImagesBox({
  initialImages = [],
  error,
  onChange,
}: {
  initialImages?: ProductImage[];
  error?: string;
  onChange: ({
    images,
    uploadedImages,
  }: {
    images: number[];
    uploadedImages: File[];
  }) => void;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [images, setImages] =
    useState<(ProductImage & { file?: File })[]>(initialImages);

  const [imageIdToDelete, setImageIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    onChange({
      images: images.filter(({ file }) => !file).map(({ id }) => id),
      uploadedImages: images
        .filter(({ file }) => !!file)
        .map(({ file }) => file as File),
    });
  }, [images]);

  const deleteImage = (id: number) => {
    setImages((images) => images.filter((image) => image.id !== id));
  };

  const handleImageUpload = (files: FileList) => {
    [...files].forEach((file) => {
      const name: string = file.name.slice(0, file.name.lastIndexOf('.'));
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result;
        if (typeof url !== 'string') return;
        setImages((images) => {
          const minId = images.reduce((acc, curr) => Math.min(acc, curr.id), 0);
          return [
            ...images,
            { url, alternativeText: name, name, id: minId - 1, file },
          ];
        });
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <ImagesBox>
      {images.map((image) => (
        <Box
          position={'relative'}
          key={image.id}
          sx={{ '&:hover > .MuiBox-root': { display: 'flex' } }}
          {...(isMobile && { onClick: () => setImageIdToDelete(image.id) })}
        >
          <Image fill src={image.url} alt={image.alternativeText} />
          <Box
            display="none"
            position="absolute"
            height="100%"
            width="100%"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: 'rgb( 0 0 0 / 0.35)' }}
          >
            <IconButton
              sx={{
                width: '80px',
                height: '80px',
                backgroundColor: '#ffffff59',
                '&:hover': { backgroundColor: '#ffffffb3' },
              }}
              onClick={() => setImageIdToDelete(image.id)}
            >
              <img src="./union.svg" alt="delete product image" />
            </IconButton>
          </Box>
        </Box>
      ))}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '4.92px', md: '8px' },
        }}
      >
        <ImageFileInput onFileUpload={handleImageUpload} />
        <ErrorMessage message={error} />
      </Box>
      <DeleteModal
        isOpen={imageIdToDelete !== null}
        onClose={() => setImageIdToDelete(null)}
        onDelete={() => {
          deleteImage(imageIdToDelete as number);
          setImageIdToDelete(null);
        }}
        title="Are you sure to delete product image"
        bodyText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
        perspiciatis in a quas doloribus impedit esse assumenda ut ratione,
        asperiores fuga maiores tempora ad atque inventore dolore consequatur
        soluta recusandae."
      />
    </ImagesBox>
  );
}
