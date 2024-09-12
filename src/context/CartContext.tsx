'use client';
import { createContext, useState } from 'react';
import { Product, ProductAmount } from '@/types/product';
import cartProducts from '@/mock/cartProducts';
import { CartContextType } from '@/types/cart';

const CartContext = createContext<CartContextType | null>(null);

const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>(cartProducts);
  const [amount, setAmount] = useState<ProductAmount[]>(() =>
    products.map((p) => {
      return { productId: p.id, value: 1 };
    })
  );
  const [promocode, setPromocode] = useState<string | null>(null);

  const handleDelete = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handlePromocodeChange = (value: string) => {
    setPromocode(value);
  };

  const handleAmountChange = (productId: number, operation: '+' | '-') => {
    setAmount(
      amount.map((pa) => {
        if (pa.productId === productId) {
          const newVal = eval(`pa.value ${operation} 1`);
          if (newVal <= 0) handleDelete(productId);
          return { productId, value: newVal };
        }
        return pa;
      })
    );
  };

  const applyAmountChange = (productId: number, newValue: number) => {
    setAmount(
      amount.map((pa) => {
        if (pa.productId === productId) {
          if (newValue <= 0) handleDelete(productId);
          return { productId, value: newValue };
        }
        return pa;
      })
    );
  };

  const handleProductAdd = (product: Product) => {
    setProducts([...products, product]);
  }

  return (
    <CartContext.Provider
      value={{
        products,
        amount,
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