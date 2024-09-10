'use client';
import ProductForm from '@/components/forms/ProductForm';

export default function AddProduct() {
  return (
    <ProductForm
      title="Add a product"
      description="Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:"
      onSubmit={(product) => console.log(product)}
    />
  );
}