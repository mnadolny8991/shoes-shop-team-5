import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from '@/testing/testUtils';
import '@testing-library/jest-dom';
import UpdateProfileForm from './UpdateProfileForm';
import { useSession } from 'next-auth/react';
import useUserData from '@/hooks/useUserData';
import useUpdateUserDataMutation from '@/hooks/useUpdateUserDataMutation';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));
jest.mock('../../hooks/useUserData', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../../hooks/useUpdateUserDataMutation', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('UpdateProfileForm', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: { id: '1', accessToken: 'token' },
    });
    (useUserData as jest.Mock).mockReturnValue({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
      },
      status: 'success',
    });
    (useUpdateUserDataMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      status: 'idle',
    });
  });

  test('Profile Updates: should update user information correctly', async () => {
    render(<UpdateProfileForm />);

    await waitFor(() => {
      expect(screen.getByLabelText('Name*')).toHaveValue('John');
    });

    fireEvent.change(screen.getByLabelText('Name*'), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByLabelText('Surname*'), {
      target: { value: 'Smith' },
    });
    fireEvent.change(screen.getByLabelText('Phone*'), {
      target: { value: '9876543210' },
    });

    fireEvent.click(screen.getByText('Save Changes'));

    expect(useUpdateUserDataMutation().mutate).toHaveBeenCalledWith({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'john@example.com',
      phoneNumber: '9876543210',
    });
  });

  test('Non-Editable Fields: email field should be disabled', async () => {
    render(<UpdateProfileForm />);

    await waitFor(() => {
      const emailField = screen.getByLabelText('Email*');
      expect(emailField).toBeDisabled();
      expect(emailField).toHaveValue('john@example.com');
    });
  });

  test('Profile Updates: should show error for invalid phone number', async () => {
    render(<UpdateProfileForm />);

    await waitFor(() => {
      expect(screen.getByLabelText('Phone*')).toHaveValue('1234567890');
    });

    fireEvent.change(screen.getByLabelText('Phone*'), {
      target: { value: 'invalid' },
    });
    fireEvent.blur(screen.getByLabelText('Phone*'));

    expect(
      await screen.findByText(
        'Phone number must be between 10 and 15 digits long and contain only numbers'
      )
    ).toBeInTheDocument();
  });
});
