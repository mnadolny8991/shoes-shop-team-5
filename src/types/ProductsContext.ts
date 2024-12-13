export type ProductsContextType = {
  ids: number[];
  onProductAdd: (id: number) => void;
  onProductRemove: (id: number) => void;
};
