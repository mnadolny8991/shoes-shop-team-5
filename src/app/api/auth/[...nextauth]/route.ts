import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const POST = async (req: any, res: any) => {
  // intercept credentials here
  // const request = req as Request;
  // console.log(await request.body?.getReader().read());
  return await NextAuth(req, res, authOptions as AuthOptions);
};

const GET = async (req: any, res: any) => {
  return await NextAuth(req, res, authOptions);
};

export { GET, POST };
