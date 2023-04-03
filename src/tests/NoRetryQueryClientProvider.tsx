import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

type NoRetryQueryClientProviderProps = {
  children: ReactNode;
};

const NoRetryQueryClientProvider = ({
  children,
}: NoRetryQueryClientProviderProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default NoRetryQueryClientProvider;
