import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    id: number;
    accessToken: string;
    refreshToken: string;
  }
}
