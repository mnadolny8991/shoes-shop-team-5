import { CartContextProvider } from "@/context/CartContext";
import apiResponses from "@/testing/mocks/mockProductsById";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { v4 as uuidv4 } from 'uuid';
import useCartProducts from "./useCartProducts";

jest.mock('../lib/api/fetchProducts', () => ({
  fetchProductById: jest.fn((id: number) => apiResponses.find((obj) => obj.data.id === id)),
}));

describe('cart products hook', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
       retry: false,
      },
    }, 
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          {children} 
        </QueryClientProvider>
      </CartContextProvider>
    );
  }

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify([
      {
        id: uuidv4(),
        productId: 2084,
        amount: 2,
        size: 36
      },
      {
        id: uuidv4(),
        productId: 1564,
        amount: 3,
        size: 40,
      },
    ]));
  });

  afterEach(() => {
    queryClient.clear();
  });

  test('fetches all products from the local storage', async () => {    
    const { result } = renderHook(useCartProducts, { wrapper });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => expect(result.current.products).toHaveLength(2));
  });

  test('if no data found deletes product from the localStorage', async () => {
    localStorage.setItem('cart', JSON.stringify([
      {
        id: uuidv4(),
        productId: 2084,
        amount: 2,
        size: 36
      },
      {
        id: uuidv4(),
        productId: 1564,
        amount: 3,
        size: 40,
      },
      {
        id: uuidv4(),
        productId: 20,
        amount: 3,
        size: 40,
      },
    ]));
    const { result } = renderHook(useCartProducts, { wrapper });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => expect(result.current.products).toHaveLength(2));
    expect(JSON.parse(localStorage.getItem('cart') ?? '[]')).toHaveLength(2);
  });
});