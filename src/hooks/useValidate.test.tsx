import { renderHook, act } from '@testing-library/react';
import useValidate from './useValidate'; // Adjust the path based on your project structure

describe('useValidate', () => {
  const mockValidator = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test('returns an empty error string when isFirstInteraction is false', () => {
    const { result } = renderHook(() =>
      useValidate('some value', mockValidator, false)
    );

    expect(result.current.error).toBe('');
    expect(mockValidator).not.toHaveBeenCalled(); // Validator should not be called
  });

  test('calls validatorFunc and sets error when isFirstInteraction is true', () => {
    mockValidator.mockReturnValue('Error message');

    const { result } = renderHook(() =>
      useValidate('some value', mockValidator, true)
    );

    expect(mockValidator).toHaveBeenCalledWith('some value'); // Check if validator is called with the input value
    expect(result.current.error).toBe('Error message'); // Check if error is set
  });

  test('updates error when inputVal changes and isFirstInteraction is true', () => {
    mockValidator
      .mockReturnValueOnce('Initial error')
      .mockReturnValue('Updated error');

    const { result, rerender } = renderHook(
      ({ inputVal }) => useValidate(inputVal, mockValidator, true),
      {
        initialProps: { inputVal: 'initial value' },
      }
    );

    // First render
    expect(mockValidator).toHaveBeenCalledWith('initial value');
    expect(result.current.error).toBe('Initial error');

    // Update the input value
    rerender({ inputVal: 'updated value' });

    expect(mockValidator).toHaveBeenCalledWith('updated value'); // Check if validator is called again
    expect(result.current.error).toBe('Updated error'); // Check if error is updated
  });
});
