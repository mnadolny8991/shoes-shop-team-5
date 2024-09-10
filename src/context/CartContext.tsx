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
      return { productId: p.id, value: 0 };
    })
  );
  const [promcode, setPromcode] = useState<string | null>(null);

  const handleDelete = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handlePromcodeChange = (value: string) => {
    setPromcode(value);
  };

  const handleAmountChange = (productId: number, operation: '+' | '-') => {
    setAmount(
      amount.map((pa) =>
        pa.productId === productId
          ? { productId, value: eval(`pa.value ${operation} 1`) }
          : pa
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        amount,
        promcode,
        onDelete: handleDelete,
        onAmountChange: handleAmountChange,
        onPromcodeChange: handlePromcodeChange,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
