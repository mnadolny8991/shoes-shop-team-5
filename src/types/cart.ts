import { Product, ProductAmount } from "@/types/product";

export type CartContextType = {
  products: Product[];
  amount: ProductAmount[];
  promcode: string | null;
  onDelete: (productId: number) => void;
  onPromcodeChange: (value: string) => void;
  onAmountIncrement: (productId: number, operation: '+' | '-') => void;
  onAmountChange: (productId: number, newValue: number) => void;
};