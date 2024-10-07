'use client';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ProductsContextType } from '@/types/api/ProductsContext';
import { createContext, useContext, ReactNode, FC } from 'react';

const WishlistContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

const WishlistContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useLocalStorage<number[]>(
    'wishlist',
    []
  );

  const handleWishlistAdd = (id: number) => {
    setWishlistIds((prev) => {
      const wishlistHashSet = new Set(prev);
      if (wishlistHashSet.has(id)) return prev; // No duplicates allowed

      const updatedIds = [...prev, id];

      return updatedIds;
    });
  };

  const handleWishlistRemove = (id: number) => {
    setWishlistIds(wishlistIds.filter((i) => i !== id));
  };

  return (
    <WishlistContext.Provider
      value={{
        ids: wishlistIds,
        onProductAdd: handleWishlistAdd,
        onProductRemove: handleWishlistRemove,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;
