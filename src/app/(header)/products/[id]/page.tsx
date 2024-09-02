'use client';

import TextField from '@/components/input/TextField';
import CustomButton from '@/components/buttons/CustomButton';
import DeleteModal from '@/components/modals/DeleteModal';
import { useState } from 'react';
import ShoeImageSlider from '@/components/sliders/shoeImageSlider/ShoeImageSlider';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <ShoeImageSlider shoeId={params.id}/>
    </>
  );
}