import { Session } from 'next-auth';
import { useSearchParams } from 'next/navigation';

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
(useSearchParams as jest.Mock).mockReturnValue({
  get: (key: string) => {
    switch (key) {
      case 'search':
        return 'defaultSearch'; // Default search value
      case 'brand':
        return JSON.stringify(['DefaultBrand']);
      case 'color':
        return JSON.stringify(['DefaultColor']);
      case 'gender':
        return JSON.stringify(['DefaultGender']);
      case 'price':
        return JSON.stringify([0, 999]);
      case 'size':
        return JSON.stringify(['DefaultSize']);
      default:
        return null;
    }
  },
});
jest.mock('@mui/material', () => {
  const originalModule = jest.requireActual('@mui/material');
  return {
    __esModule: true,
    ...originalModule,
    useMediaQuery: jest.fn(),
  };
});
