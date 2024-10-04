'use client';
import AddProduct from '@/components/products/AddProduct';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  return (
    <AddProduct
      title="Add a product"
      description="Provide detailed information about your product, including name, price, color, gender, brand, description, sizes and images, to ensure a seamless experience for customers. Make sure all details are accurate and up-to-date."
      onSuccessClose={() => router.push('/my-products')}
    />
  );
}
