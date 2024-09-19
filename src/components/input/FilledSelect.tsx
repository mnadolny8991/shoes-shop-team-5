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

type FilledSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  InputProps & {
    options?: {
      name: string;
      id: number | string;
    }[];
  };

const CustomSelect = styled('select')<CustomSelectProps>(styleField);

const FilledSelect = forwardRef(function (
  { options, required, id, label, error, width, ...props }: FilledSelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  return (
    <InputFieldContainer {...{ label, id, required, error, width }}>
      <CustomSelect {...props} ref={ref} id={id} error={error}>
        <option value=""></option>
        {options?.map(({ name, id }) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </CustomSelect>
    </InputFieldContainer>
  );
});

FilledSelect.displayName = 'Select';

export default FilledSelect;
