'use client';
import styleField from '@/styles/styledField';
import { styled } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';
import InputFieldContainer, {
  InputProps,
} from '@/components/containers/InputFieldContainer';

interface CustomSelectProps extends React.ComponentPropsWithoutRef<'select'> {
  error?: string;
}

const CustomSelect = styled('select')<CustomSelectProps>(styleField);

const Select = forwardRef(function (
  {
    children,
    required,
    id,
    label,
    error,
    width,
    ...props
  }: React.SelectHTMLAttributes<HTMLSelectElement> & InputProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  return (
    <InputFieldContainer {...{ label, id, required, error, width }}>
      <CustomSelect {...props} ref={ref} id={id} error={error}>
        {children}
      </CustomSelect>
    </InputFieldContainer>
  );
});

Select.displayName = 'Select';

export default Select;
