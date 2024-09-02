'use client';

import TextField from '@/components/input/TextField';
import CustomButton from '@/components/buttons/CustomButton';
import DeleteModal from '@/components/modals/DeleteModal';
import { useState } from 'react';
import ShoeImageSlider from '@/components/sliders/shoeImageSlider/ShoeImageSlider';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TextField
        required={true}
        name="input"
        id="input"
        label="Label Text"
        min={8}
        error="Message under the input field"
      />
      <CustomButton
        size="m"
        variant="contained"
        onClick={(e) => setIsOpen(true)}
      >
        Open Modal
      </CustomButton>
      <DeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDelete={() => null}
        title="Are you sure to delete selected item"
        bodyText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
          perspiciatis in a quas doloribus impedit esse assumenda ut ratione,
          asperiores fuga maiores tempora ad atque inventore dolore consequatur
          soluta recusandae."
      />
    </>
  );
}
