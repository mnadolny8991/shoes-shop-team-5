import { renderHook, act } from '@testing-library/react';
import useDebounce from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  test('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce<string>('initial', 500, 'initialValue'));
    expect(result.current).toBe('initialValue');
  });

  test('updates the debounced value after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce<string>(value, delay, 'initialValue'),
      {
        initialProps: { value: 'test', delay: 500 },
      }
    );

    // Verify initial debounced value
    expect(result.current).toBe('initialValue');

    // Update the value
    rerender({ value: 'updated', delay: 500 });

    // Fast-forward time by less than the delay
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe('initialValue'); // still initial value since delay hasn’t passed

    // Fast-forward time to complete the delay
    act(() => {
      jest.advanceTimersByTime(200); // complete the delay
    });
    expect(result.current).toBe('updated'); // now reflects the updated debounced value
  });

  test('changes delay should reset timer', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce<string>(value, delay, 'initialValue'),
      {
        initialProps: { value: 'test', delay: 500 },
      }
    );

    // Update the value and check before delay
    rerender({ value: 'newValue', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(300); // advance by less than the original delay
    });
    expect(result.current).toBe('initialValue'); // still initial

    // Change the delay
    rerender({ value: 'newValue', delay: 200 });
    act(() => {
      jest.advanceTimersByTime(200); // new shorter delay
    });
    expect(result.current).toBe('newValue'); // updates due to new delay
  });
});
