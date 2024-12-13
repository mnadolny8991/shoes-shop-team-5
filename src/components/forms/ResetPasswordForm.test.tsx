import React from 'react';
import { screen, fireEvent, waitFor, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ResetPasswordForm from './ResetPasswordForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeProvider } from '@mui/material';
import theme from '@/styles/theme';

const MockAppRouterCacheProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
// Mock the next/navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@mui/material-nextjs/v13-appRouter', () => ({
  AppRouterCacheProvider: MockAppRouterCacheProvider,
}));

describe('ResetPasswordForm', () => {
  const queryClient = new QueryClient();
  const mockPush = jest.fn();
  const mockGet = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue({ get: mockGet });
    mockGet.mockReturnValue('valid-reset-code');
  });

  const renderComponent = () => {
    render(
      <MockAppRouterCacheProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <ResetPasswordForm />
          </ThemeProvider>
        </QueryClientProvider>
      </MockAppRouterCacheProvider>
    );
  };

  test('validates password fields', async () => {
    renderComponent();
    const passwordInput = screen.getByLabelText('Password*');
    const confirmPasswordInput = screen.getByLabelText('Confirm password*');

    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.blur(passwordInput);
    await waitFor(() => {
      expect(
        screen.getByText(/Password should contains atleast 8 charaters/)
      ).toBeInTheDocument();
    });

    fireEvent.change(passwordInput, { target: { value: 'StrongPass1' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'DifferentPass1' },
    });
    fireEvent.blur(confirmPasswordInput);
    await waitFor(() => {
      expect(
        screen.getByText('Passwords should be the same')
      ).toBeInTheDocument();
    });
  });

  test('handles invalid reset code', async () => {
    mockGet.mockReturnValue('invalid-reset-code');
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Invalid or expired reset code' }),
    });

    renderComponent();
    const passwordInput = screen.getByLabelText('Password*');
    const confirmPasswordInput = screen.getByLabelText('Confirm password*');
    const submitButton = screen.getByRole('button', {
      name: 'Reset Password',
    });

    fireEvent.change(passwordInput, { target: { value: 'StrongPass1' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'StrongPass1' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Invalid or expired reset code')
      ).toBeInTheDocument();
    });
  });

  test('completes password reset process successfully', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    renderComponent();
    const passwordInput = screen.getByLabelText('Password*');
    const confirmPasswordInput = screen.getByLabelText('Confirm password*');
    const submitButton = screen.getByRole('button', {
      name: 'Reset Password',
    });

    fireEvent.change(passwordInput, { target: { value: 'StrongPass1' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'StrongPass1' },
    });
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith('/auth/sign-in');
      },
      { timeout: 3000 }
    );
  });
});
