import { render, screen, fireEvent } from '@testing-library/react';
import GoBackAndHomeButtonsStack from '@/components/buttons/GoBackAndHomeButtonsStack';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

// Mock the useRouter hook from Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('GoBackAndHomeButtonsStack', () => {
  const mockBack = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Set up the mock router methods
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
      push: mockPush,
    });
  });

  test('renders "Go back" and "Home" buttons', () => {
    render(<GoBackAndHomeButtonsStack />);

    expect(
      screen.getByRole('button', { name: /Go back/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Home/i })).toBeInTheDocument();
  });

  test('calls router.back when "Go back" button is clicked', () => {
    render(<GoBackAndHomeButtonsStack />);

    const goBackButton = screen.getByRole('button', { name: /Go back/i });
    fireEvent.click(goBackButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  test('calls router.push("/") when "Home" button is clicked', () => {
    render(<GoBackAndHomeButtonsStack />);

    const homeButton = screen.getByRole('button', { name: /Home/i });
    fireEvent.click(homeButton);

    expect(mockPush).toHaveBeenCalledWith('/');
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
});
