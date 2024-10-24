import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe('category hooks', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
       retry: false,
      },
    }, 
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>
        {children} 
      </QueryClientProvider>
    );
  };

  test('use color hook', () => {
    
  });
});