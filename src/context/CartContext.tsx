'use client';
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import cartProducts from '@/mock/cartProducts';
import { CartContextType } from '@/types/cart';
import { useQueries } from '@tanstack/react-query';
import apiUrl from '@/data/apiUrl';
import { CartProduct } from '@/types/cartProduct';
import mapProduct from '@/mappers/productMappers';
import useLocalStorage from '@/hooks/useLocalStorage';
import { fetchProductById } from '@/lib/fetchProducts';

const CartContext = createContext<CartContextType | null>(null);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw Error(
      'useCartContext can only be used inside an CartContextProvider'
    );
  return context;
};

const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useLocalStorage<CartProduct[]>('cart', []);
  const [promocode, setPromocode] = useState<string | null>(null);

  useEffect(() => {
    const filteredProducts = products.filter((p) => p.amount > 0);
    if (filteredProducts.length !== products.length) {
      setProducts(filteredProducts);
    }
  }, [products, setProducts]);

  const handleDelete = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handlePromocodeChange = (value: string) => {
    setPromocode(value);
  };

  const handleAmountChange = (productId: number, operation: '+' | '-') => {
    setProducts(
      products.map((p) => {
        if (p.id === productId) {
          const newVal = eval(`p.amount ${operation} 1`);
          return { id: productId, amount: newVal };
        }
        return p;
      })
    );
  };

  const applyAmountChange = (productId: number, newValue: number) => {
    setProducts(
      products.map((p) => {
        if (p.id === productId) {
          if (newValue <= 0) handleDelete(productId);
          return { id: productId, amount: newValue };
        }
        return p;
      })
    );
  };

  const handleProductAdd = (productId: number) => {
    const searchResult = products.find((p) => p.id === productId);
    if (searchResult)
      setProducts(
        products.map((p) =>
          p.id === productId ? { id: p.id, amount: p.amount + 1 } : p
        )
      );
    else
      setProducts([
        ...products,
        {
          id: productId,
          amount: 1,
        },
      ]);
  };

  return (
    <CartContext.Provider
      value={{
        amount: products,
        promocode,
        onDelete: handleDelete,
        onAmountIncrement: handleAmountChange,
        onAmountChange: applyAmountChange,
        onPromocodeChange: handlePromocodeChange,
        onProductAdd: handleProductAdd,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
