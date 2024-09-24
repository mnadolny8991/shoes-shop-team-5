import { fetchProductsByUserId } from "@/lib/fetchProducts";
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MyProducts from "@/components/products/MyProducts";
import { AuthOptions } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions as AuthOptions);
  const initialData = await fetchProductsByUserId(session?.id!, session?.accessToken!); 

  return (
    <MyProducts initialData={initialData} />
  )
}

export default Page;
