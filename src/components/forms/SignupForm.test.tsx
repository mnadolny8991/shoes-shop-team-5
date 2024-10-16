import { fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '@/testing/testUtils';
import SignupForm from './SignupForm';

// Mock the entire @tanstack/react-query module

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SignupForm', () => {
  beforeEach(() => {
    render(<SignupForm />);
  });

  test('validates name input', async () => {
    const nameInput = screen.getByLabelText('Username*');
    fireEvent.change(nameInput, { target: { value: 'a' } });
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(
        screen.getByText(
          'Name must have minimum 2 to 3 letters per word and should not containe numbers'
        )
      ).toBeInTheDocument();
    });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Name must have minimum 2 to 3 letters per word and should not containe numbers'
        )
      ).not.toBeInTheDocument();
    });
  });

  test('validates email format', async () => {
    const emailInput = screen.getByLabelText('Email*');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(
        screen.getByText('Enter a valid email address')
      ).toBeInTheDocument();
    });

    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(
        screen.queryByText('Enter a valid email address')
      ).not.toBeInTheDocument();
    });
  });

  test('validates password strength', async () => {
    const passwordInput = screen.getByLabelText('Password*');
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(
        screen.getByText(
          'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
        )
      ).toBeInTheDocument();
    });

    fireEvent.change(passwordInput, { target: { value: 'StrongPass1!' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
        )
      ).not.toBeInTheDocument();
    });
  });

  test('validates password confirmation', async () => {
    const passwordInput = screen.getByLabelText('Password*');
    const confirmPasswordInput = screen.getByLabelText('Confirm password*');

    fireEvent.change(passwordInput, { target: { value: 'StrongPass1!' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'DifferentPass1!' },
    });
    fireEvent.blur(confirmPasswordInput);

    await waitFor(() => {
      expect(
        screen.getByText('Passwords should be the same')
      ).toBeInTheDocument();
    });

    fireEvent.change(confirmPasswordInput, {
      target: { value: 'StrongPass1!' },
    });
    fireEvent.blur(confirmPasswordInput);

    await waitFor(() => {
      expect(
        screen.queryByText('Passwords should be the same')
      ).not.toBeInTheDocument();
    });
  });

  test('redirects to sign-in page when "Log in" link is clicked', () => {
    const loginLink = screen.getByText('Log in');
    expect(loginLink).toHaveAttribute('href', '/auth/sign-in');
  });
});
