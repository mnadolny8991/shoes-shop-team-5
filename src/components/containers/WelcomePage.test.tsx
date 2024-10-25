import { render } from '@/testing/testUtils';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WelcomePage from './WelcomePage';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Welcome page', () => {
  test('renders all elements correctly and fires sign in flow', () => {
    const push = jest.fn();
    (signIn as jest.Mock).mockReturnValue('aaa');
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));

    render(<WelcomePage />);

    const welcome = screen.getByText('Welcome');
    expect(welcome).toBeInTheDocument();
    const signInBtn = screen.getByText('Sign In');
    expect(signInBtn).toBeInTheDocument();
    const catalog = screen.getByText('Catalog');
    expect(catalog).toBeInTheDocument();

    fireEvent.click(signInBtn);
    expect(signIn as jest.Mock).toHaveBeenCalled();
    fireEvent.click(catalog);
    expect(push).toHaveBeenCalledWith('/catalog');
  });
});
