import { CartProduct } from '@/types/cartProduct';

export type CartContextType = {
  amount: CartProduct[];
  promocode: string | null;
  onProductAdd: (id: string, productId: number, size: number) => void;
  onDelete: (id: string) => void;
  onPromocodeChange: (value: string) => void;
  onAmountIncrement: (id: string, operation: '+' | '-') => void;
  onAmountChange: (id: string, newValue: number) => void;
  onCartClear: () => void;
};
