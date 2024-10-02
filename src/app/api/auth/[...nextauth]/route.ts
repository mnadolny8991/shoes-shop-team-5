import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

const POST = async (req: NextApiRequest, res: NextApiResponse) => { 
  // intercept credentials here
  return await NextAuth(req, res, authOptions as AuthOptions);
}

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  return await NextAuth(req, res, authOptions);
}

export { GET, POST };


