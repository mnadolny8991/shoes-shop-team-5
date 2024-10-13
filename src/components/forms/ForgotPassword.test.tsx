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
});