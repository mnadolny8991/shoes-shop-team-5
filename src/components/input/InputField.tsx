'use client';
import styleField from '@/styles/styledField';
import { styled } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';
import InputFieldContainer, {
  InputProps,
} from '@/components/containers/InputFieldContainer';

interface CustomInputProps extends React.ComponentPropsWithoutRef<'input'> {
  error?: string;
}

const CustomInput = styled('input')<CustomInputProps>(styleField);

const InputField = forwardRef(function (
  {
    required,
    id,
    label,
    error,
    width,
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement> & InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <InputFieldContainer {...{ label, id, required, error, width }}>
      <CustomInput {...props} ref={ref} id={id} error={error} />
    </InputFieldContainer>
  );
});

InputField.displayName = 'InputField';

export default InputField;
