import { render } from '@/testing/testUtils';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputFieldContainer, { InputProps } from './InputFieldContainer';

describe('Input field container', () => {
  test('renders all elements correctly', () => {
    const props = {
      required: true,
      label: 'example label',
      id: '123',
      error: 'error',
      width: 100,
    } as InputProps;

    render(
      <InputFieldContainer {...props}>
        <p>children</p>
      </InputFieldContainer>
    );

    const label = screen.getByText(props.label);
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', '123');
    const requiredStar = screen.getByText('*');
    expect(requiredStar).toBeInTheDocument();
    const child = screen.getByText('children');
    expect(child).toBeInTheDocument();
  });
});
