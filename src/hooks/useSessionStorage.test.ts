import { renderHook, act } from '@testing-library/react';
import useSessionStorage from './useSessionStorage';

// Mock sessionStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn();
  Storage.prototype.setItem = jest.fn();
});

describe('useSessionStorage', () => {
  test('initializes with provided initial value if sessionStorage is empty', () => {
    (sessionStorage.getItem as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useSessionStorage<string>('testKey', 'initialValue'));
    const [data] = result.current;

    expect(data).toBe('initialValue');
    expect(sessionStorage.getItem).toHaveBeenCalledWith('testKey');
  });

  test('retrieves and parses data from sessionStorage if available', () => {
    (sessionStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify('storedValue'));

    const { result } = renderHook(() => useSessionStorage<string>('testKey', 'initialValue'));
    const [data] = result.current;

    expect(data).toBe('storedValue');
    expect(sessionStorage.getItem).toHaveBeenCalledWith('testKey');
  });

  test('sets sessionStorage when data is updated after mounting', () => {
    (sessionStorage.getItem as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useSessionStorage<string>('testKey', 'initialValue'));
    const [, setData] = result.current;

    // Update data
    act(() => {
      setData('newValue');
    });

    // Ensure sessionStorage.setItem was called with the updated value
    expect(sessionStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('newValue'));
  });

  test('does not set sessionStorage before mounting', () => {
    (sessionStorage.getItem as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useSessionStorage<string>('testKey', 'initialValue'));

    // Update data after mounting
    act(() => {
      const [, setData] = result.current;
      setData('anotherValue');
    });

    // Confirm that sessionStorage.setItem has been called once after the update
    expect(sessionStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('anotherValue'));
    expect(sessionStorage.setItem).toHaveBeenCalledTimes(2);
  });
});