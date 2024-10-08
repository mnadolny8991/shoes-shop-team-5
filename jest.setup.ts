import { Session } from 'next-auth';

jest.mock('next-auth/react', () => {
  const mockSession: Session = {
    id: 679,
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njc5LCJpYXQiOjE3MjYwNDY3NTYsImV4cCI6MTcyODYzODc1Nn0.En7ZyMPzfDsSQuCffuraEgpj0LoO10Jt0K-HuOWRfVs',
    refreshToken: 'aaa',
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
  };
  const originalModule = jest.requireActual('next-auth/react');
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' };
    }),
  };
});
jest.mock('next/navigation');
