import { renderHook, act } from '@testing-library/react';;
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  // Mock localStorage
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
    jest.clearAllMocks();
  });

  test('initializes with provided initial value if localStorage is empty', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorage<string>('testKey', 'initialValue'));
    const [data] = result.current;

    expect(data).toBe('initialValue');
    expect(localStorage.getItem).toHaveBeenCalledWith('testKey');
  });

  test('retrieves and parses data from localStorage if available', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify('storedValue'));

    const { result } = renderHook(() => useLocalStorage<string>('testKey', 'initialValue'));
    const [data] = result.current;

    expect(data).toBe('storedValue');
    expect(localStorage.getItem).toHaveBeenCalledWith('testKey');
  });

  test('sets localStorage when data is updated after mounting', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorage<string>('testKey', 'initialValue'));
    const [, setData] = result.current;

    // Update data
    act(() => {
      setData('newValue');
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('newValue'));
  });

  test('does not set localStorage before mounting and updates localStorage after value changes', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
  
    const { result } = renderHook(() => useLocalStorage<string>('testKey', 'initialValue'));
  
    // Update data after mounting
    act(() => {
      const [, setData] = result.current;
      setData('anotherValue');
    });
  
    // Confirm that localStorage.setItem has been called with the updated value
    expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('anotherValue'));
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });
});
