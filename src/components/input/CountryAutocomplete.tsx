'use client';
import InputFieldContainer from '@/components/containers/InputFieldContainer';
import { countries, CountryType } from '@/data/countries';
import styleField from '@/styles/styledField';
import { Autocomplete, Box, styled } from '@mui/material';
import { useState } from 'react';

interface CustomInputProps extends React.ComponentPropsWithoutRef<'input'> {
  error?: string;
}
type CountryAutocompleteProps = {
  error: string;
  value: CountryType | null;
  onChange: (newValue: CountryType | null) => void;
  onBlur?: (e: any) => void;
};

const CustomInput = styled('input')<CustomInputProps>(styleField);

export default function CountryAutocomplete({
  error,
  value,
  onChange,
  onBlur,
}: CountryAutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  return (
    <InputFieldContainer
      id="country"
      label="Country"
      required
      error={error}
      width="100%"
    >
      <Autocomplete
        onBlur={onBlur}
        value={value}
        onChange={(event: any, newValue: CountryType | null) => {
          onChange(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="country"
        options={countries}
        renderInput={(params) => (
          <Box ref={params.InputProps.ref}>
            <CustomInput {...params.inputProps} error={error} />
          </Box>
        )}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              fontSize={{ xs: 10, md: 12 }}
              lineHeight={{ xs: 1, md: 1.5 }}
              {...optionProps}
            >
              {option.label} ({option.code}) +{option.phone}
            </Box>
          );
        }}
      />
    </InputFieldContainer>
  );
}
