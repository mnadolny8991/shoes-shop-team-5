import SingleProductPage from '@/components/products/SingleProductPage';
import { fetchProductById } from '@/lib/fetchProducts';

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const initialData = await fetchProductById(id);

  return <SingleProductPage id={id} initialData={initialData} />;
}
