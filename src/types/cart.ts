import { Product } from '@/types/product';
import { CartProduct } from '@/types/cartProduct';

export type CartContextType = {
  products: Product[];
  amount: CartProduct[];
  promocode: string | null;
  onProductAdd: (productId: number) => void;
  onDelete: (productId: number) => void;
  onPromocodeChange: (value: string) => void;
  onAmountIncrement: (productId: number, operation: '+' | '-') => void;
  onAmountChange: (productId: number, newValue: number) => void;
  isLoading: boolean;
};
