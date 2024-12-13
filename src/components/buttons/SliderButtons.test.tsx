import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SliderButtons from '@/components/buttons/SliderButtons';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import '@testing-library/jest-dom';

describe('SliderButtons', () => {
  const mockOnLeftClick = jest.fn();
  const mockOnRightClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders left and right arrow buttons', () => {
    render(<SliderButtons />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[1]).toBeInTheDocument();
  });

  test('calls onLeftClick when left button is clicked', () => {
    render(<SliderButtons onLeftClick={mockOnLeftClick} />);

    const leftButton = screen.getAllByRole('button')[0];
    fireEvent.click(leftButton);

    expect(mockOnLeftClick).toHaveBeenCalledTimes(1);
  });

  test('calls onRightClick when right button is clicked', () => {
    render(<SliderButtons onRightClick={mockOnRightClick} />);

    const rightButton = screen.getAllByRole('button')[1];
    fireEvent.click(rightButton);

    expect(mockOnRightClick).toHaveBeenCalledTimes(1);
  });
});
