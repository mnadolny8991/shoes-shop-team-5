'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { CartContextType } from '@/types/cart';
import { CartProduct } from '@/types/cartProduct';
import useLocalStorage from '@/hooks/useLocalStorage';

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

  const handleDelete = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleCartClear = () => {
    setProducts([]);
    setPromocode(null);
  };

  const handlePromocodeChange = (value: string) => {
    setPromocode(value);
  };

  const handleAmountChange = (id: string, operation: '+' | '-') => {
    console.log(id);
    setProducts(
      products.map((p) => {
        if (p.id === id) {
          const newVal = eval(`p.amount ${operation} 1`);
          return { ...p, amount: newVal };
        }
        return p;
      })
    );
  };

  const applyAmountChange = (id: string, newValue: number) => {
    setProducts(
      products.map((p) => {
        if (p.id === id) {
          if (newValue <= 0) handleDelete(id);
          const prod = products.find((p) => p.id === id);
          if (!prod) throw new Error(`Cannot find an bag entry with id ${id}`);
          return { ...prod, amount: newValue };
        }
        return p;
      })
    );
  };

  const handleProductAdd = (id: string, productId: number, size: number) => {
    const searchResult = products.find((p) => p.id === id);
    if (searchResult && searchResult.size === size)
      setProducts(
        products.map((p) =>
          p.id === id
            ? { ...searchResult, id: p.id, amount: p.amount + 1, size }
            : p
        )
      );
    else {
      setProducts([
        ...products,
        {
          id,
          productId,
          amount: 1,
          size,
        },
      ]);
    }
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
        onCartClear: handleCartClear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
