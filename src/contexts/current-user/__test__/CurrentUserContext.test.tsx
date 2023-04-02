import { render, screen, waitFor } from '@testing-library/react';
import CurrentUserProvider, { useCurrentUser } from '../CurrentUserContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import { QueryClient, QueryClientProvider } from 'react-query';
import IUser from '../../../types/user/User';
import findUserByFirebaseId from '../../../types/user/firebase/findUserByFirebaseId';

vi.mock('../../../types/user/firebase/findUserByFirebaseId', () => ({
  default: vi.fn(() => undefined),
}));

vi.mock('firebase/auth');
vi.mock('react-firebase-hooks/auth');

const mockedUseAuthState = vi.mocked(useAuthState);
const mockedFindUserByFirebaseId = vi.mocked(findUserByFirebaseId);

afterEach(() => {
  mockedUseAuthState.mockReset();
  mockedFindUserByFirebaseId.mockReset();
});

describe('CurrentUserContext', () => {
  it('should return the current user', async () => {
    mockedUseAuthState.mockReturnValue([
      { uid: '1234567890' } as User,
      false,
      undefined,
    ]);
    mockedFindUserByFirebaseId.mockResolvedValue({ username: 'user' } as IUser);
    const queryClient = new QueryClient();
    const Component = () => {
      const [user] = useCurrentUser();
      return <div>{user?.username}</div>;
    };
    render(
      <QueryClientProvider client={queryClient}>
        <CurrentUserProvider>
          <Component />
        </CurrentUserProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/user/i)).toBeInTheDocument();
    });
  });

  it('should show loading if firebase is loading', async () => {
    mockedUseAuthState.mockReturnValue([undefined, true, undefined]);
    const queryClient = new QueryClient();
    const Component = () => {
      const [_user, loading] = useCurrentUser();
      return <div>{loading && 'Loading...'}</div>;
    };
    render(
      <QueryClientProvider client={queryClient}>
        <CurrentUserProvider>
          <Component />
        </CurrentUserProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  it('should show loading if the query is loading', async () => {
    mockedUseAuthState.mockReturnValue([
      { uid: '1234567890' } as User,
      false,
      undefined,
    ]);
    const queryClient = new QueryClient();
    const Component = () => {
      const [_user, loading] = useCurrentUser();
      return <div>{loading && 'Loading...'}</div>;
    };
    render(
      <QueryClientProvider client={queryClient}>
        <CurrentUserProvider>
          <Component />
        </CurrentUserProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  it('it should return error from firebase', async () => {
    mockedUseAuthState.mockReturnValue([undefined, false, new Error('error')]);
    const queryClient = new QueryClient();
    const Component = () => {
      const [_user, _loading, error] = useCurrentUser();
      if (error instanceof Error) {
        return <div>{error.message}</div>;
      }
      return <div></div>;
    };
    render(
      <QueryClientProvider client={queryClient}>
        <CurrentUserProvider>
          <Component />
        </CurrentUserProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('it should return error from the query', async () => {
    mockedUseAuthState.mockReturnValue([
      { uid: '1234567890' } as User,
      false,
      undefined,
    ]);
    mockedFindUserByFirebaseId.mockImplementation(() => {
      throw new Error('error');
    });
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    const Component = () => {
      const [_user, _loading, error] = useCurrentUser();
      if (error instanceof Error) {
        return <div>{error.message}</div>;
      }
      return <div></div>;
    };
    const originalConsoleError = console.error;
    console.error = () => {};
    render(
      <QueryClientProvider client={queryClient}>
        <CurrentUserProvider>
          <Component />
        </CurrentUserProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
    console.error = originalConsoleError;
  });
});
