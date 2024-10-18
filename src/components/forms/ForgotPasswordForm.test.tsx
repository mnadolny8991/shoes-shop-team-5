import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient } from '@tanstack/react-query';
import ForgotPasswordForm from './ForgotPasswordForm';
import { render } from '@/testing/testUtils';

describe('ForgotPasswordForm', () => {
  const queryClient = new QueryClient();

  const renderComponent = () => {
    render(<ForgotPasswordForm />);
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
        screen.getByText('Reset password instructions have been sent')
      ).toBeInTheDocument();
    });
  });

  test('disables submit button when email is invalid or empty', () => {
    renderComponent();
    const emailInput = screen.getByLabelText('Email*');
    const submitButton = screen.getByRole('button', { name: 'Reset Password' });

    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    fireEvent.blur(emailInput);
    expect(submitButton).not.toBeDisabled();
  });
});
