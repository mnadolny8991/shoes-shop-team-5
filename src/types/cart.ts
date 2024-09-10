import { Product, ProductAmount } from "@/types/product";

export type CartContextType = {
  products: Product[];
  amount: ProductAmount[];
  promcode: string | null;
  onDelete: (productId: number) => void;
  onPromcodeChange: (value: string) => void;
  onAmountChange: (productId: number, operation: '+' | '-') => void;
};