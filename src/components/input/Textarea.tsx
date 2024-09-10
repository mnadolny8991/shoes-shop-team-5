'use client';
import { styled } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';
import styleField from '@/styles/styledField';
import InputFieldContainer, {
  InputProps,
} from '@/components/containers/InputFieldContainer';

interface CustomTextareaProps
  extends React.ComponentPropsWithoutRef<'textarea'> {
  error?: string;
}

const CustomTextarea = styled('textarea')<CustomTextareaProps>(styleField);

const Textarea = forwardRef(function (
  {
    required,
    id,
    label,
    error,
    width,
    ...props
  }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & InputProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <InputFieldContainer {...{ label, id, required, error, width }}>
      <CustomTextarea {...props} ref={ref} id={id} error={error} />
    </InputFieldContainer>
  );
});

export default Textarea;
