import { Product, ProductAmount } from '@/types/product';

export type CartContextType = {
  products: Product[];
  amount: ProductAmount[];
  promocode: string | null;
  onProductAdd: (product: Product) => void;
  onDelete: (productId: number) => void;
  onPromocodeChange: (value: string) => void;
  onAmountIncrement: (productId: number, operation: '+' | '-') => void;
  onAmountChange: (productId: number, newValue: number) => void;
};
