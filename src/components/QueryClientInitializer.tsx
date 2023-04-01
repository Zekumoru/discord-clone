import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

type QueryClientInitializerProps = {
  children: ReactNode;
  devtoolsEnabled?: boolean;
};

const QueryClientInitializer = ({
  children,
  devtoolsEnabled,
}: QueryClientInitializerProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {devtoolsEnabled && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      )}
    </QueryClientProvider>
  );
};

export default QueryClientInitializer;
