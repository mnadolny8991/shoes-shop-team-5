import apiUrl from '@/data/apiUrl';
import { ApiError } from '@/types/api/apiError';
import { ApiLoginResponse, ApiUserAttributes } from '@/types/api/apiUser';
import { AuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  pages: {
    signIn: '/auth/sign-in',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) return null;
        const response = await fetch(`${apiUrl}/auth/local`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: credentials.identifier,
            password: credentials.password,
          }),
        });
        if (!response.ok) {
          const apiError = (await response.json()).error as ApiError;
          throw new Error(apiError.message);
        }
        const userResponseData: ApiLoginResponse = await response.json();
        return {
          ...userResponseData.user,
          token: userResponseData.jwt,
          id: userResponseData.user.id.toString(),
        };
      },
    }),
  ],

  callbacks: {
    async jwt(data: any) {
      // User data avaliable in user object when logged in
      const userData = data.user as ApiUserAttributes & {
        token: string;
        id: string;
      };
      if (data.account) {
        // all data that should be in session object should be put into data.token
        data.token.id = parseInt(userData.id);
        data.token.accessToken = userData.token;
      }
      return data.token;
    },
    async session({ token, session }: any) {
      let s = {} as Session;
      if (token?.accessToken) {
        session.id = token.id as number;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },
} as AuthOptions;
