import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';
import theme from '@/styles/theme';
import ForgotPasswordForm from './ForgotPassword';

describe('ForgotPasswordForm', () => {
  const queryClient = new QueryClient();

  const renderComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ForgotPasswordForm />
        </ThemeProvider>
      </QueryClientProvider>
    );
  };

  test('validates email field', async () => {
    renderComponent();
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

  test('handles server error', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () =>
        Promise.resolve({ error: { message: 'Server error occurred' } }),
    });

    renderComponent();
    const emailInput = screen.getByLabelText('Email*');
    const submitButton = screen.getByRole('button', { name: 'Reset Password' });

    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Server error occurred')).toBeInTheDocument();
    });
  });

  test('completes forgot password process successfully', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    renderComponent();
    const emailInput = screen.getByLabelText('Email*');
    const submitButton = screen.getByRole('button', { name: 'Reset Password' });

    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Password reset email has been sent')
      ).toBeInTheDocument();
    });
  });
});
