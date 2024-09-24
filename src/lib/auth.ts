import apiUrl from '@/data/apiUrl';
import { ApiLoginResponse, ApiUserAttributes } from '@/types/api/apiUser';
import { AuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/sign-in',
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
        try {
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
            return null;
          }
          const userResponseData: ApiLoginResponse = await response.json();
          return {
            ...userResponseData.user,
            token: userResponseData.jwt,
            id: userResponseData.user.id.toString(),
          };
        } catch (error) {
          throw new Error('Validation Error');
        }
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
} as AuthOptions;
