import { fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '@/testing/testUtils';
import SignInForm from './SignInForm';

const mockSignIn = jest.fn();
jest.mock('next-auth/react', () => ({
  signIn: (...args: any) => mockSignIn(...args),
}));

describe('SignInForm', () => {
  beforeEach(() => {
    render(<SignInForm />);
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

  test('handles incorrect email/password combination', async () => {
    mockSignIn.mockResolvedValue({
      ok: false,
      error: 'Invalid identifier or password',
    });

    const emailInput = screen.getByLabelText('Email*');
    const passwordInput = screen.getByLabelText('Password*');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Invalid identifier or password')
      ).toBeInTheDocument();
    });
  });

  // UI Interactions
  test('forgot password link redirects correctly', () => {
    const forgotPasswordLink = screen.getByText('Forgot password?');
    expect(forgotPasswordLink).toHaveAttribute('href', '/auth/forgot-password');
  });

  test('forgot password link redirects correctly', () => {
    const forgotPasswordLink = screen.getByText('Forgot password?');
    expect(forgotPasswordLink).toHaveAttribute('href', '/auth/forgot-password');
  });

  test('remember me checkbox functionality', () => {
    const rememberMeCheckbox = screen.getByLabelText(
      'Remember me'
    ) as HTMLInputElement;
    expect(rememberMeCheckbox.checked).toBe(false);

    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox.checked).toBe(true);
  });

  // Session Management
  test('sign in with remember me checked', async () => {
    mockSignIn.mockResolvedValue({ ok: true });

    const emailInput = screen.getByLabelText('Email*');
    const passwordInput = screen.getByLabelText('Password*');
    const rememberMeCheckbox = screen.getByLabelText('Remember me');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(rememberMeCheckbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        identifier: 'user@example.com',
        password: 'password123',
        callbackUrl: '/',
      });
    });
  });
});
