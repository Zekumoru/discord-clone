import { render, screen, waitFor } from '@testing-library/react';
import CurrentUserProvider, { useCurrentUser } from '../CurrentUserContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import { QuerySnapshot, getDocs } from 'firebase/firestore';
import NoRetryQueryClientProvider from '../../../tests/NoRetryQueryClientProvider';
import IUser from '../../../types/user/User';

vi.mock('firebase/auth');
vi.mock('firebase/firestore');
vi.mock('react-firebase-hooks/auth');

describe('CurrentUserContext', () => {
  it('should return the current user', async () => {
    vi.mocked(useAuthState).mockReturnValue([
      { uid: '1234567890' } as User,
      false,
      undefined,
    ]);
    vi.mocked(getDocs<IUser>).mockResolvedValue({
      docs: [
        {
          data: () => ({
            id: '1234567890',
            username: 'User',
          }),
        },
      ],
    } as QuerySnapshot<IUser>);
    const Component = () => {
      const [user] = useCurrentUser();
      return <div>{user?.username}</div>;
    };
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <Component />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/user/i)).toBeInTheDocument();
    });
  });

  it('should show loading if firebase is loading', async () => {
    vi.mocked(useAuthState).mockReturnValue([undefined, true, undefined]);
    const Component = () => {
      const [_user, loading] = useCurrentUser();
      return <div>{loading && 'Loading...'}</div>;
    };
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <Component />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  it('should show loading if the query is loading', async () => {
    vi.mocked(useAuthState).mockReturnValue([
      { uid: '1234567890' } as User,
      false,
      undefined,
    ]);
    const Component = () => {
      const [_user, loading] = useCurrentUser();
      return <div>{loading && 'Loading...'}</div>;
    };
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <Component />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  it('it should return error from firebase', async () => {
    vi.mocked(useAuthState).mockReturnValue([
      undefined,
      false,
      new Error('error'),
    ]);
    const Component = () => {
      const [_user, _loading, error] = useCurrentUser();
      if (error instanceof Error) {
        return <div>{error.message}</div>;
      }
      return <div />;
    };
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <Component />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('it should return error from the query', async () => {
    vi.mocked(useAuthState).mockReturnValue([
      { uid: '1234567890' } as User,
      false,
      undefined,
    ]);
    vi.mocked(getDocs).mockImplementation((_q) => {
      throw new Error('error');
    });
    const Component = () => {
      const [_user, _loading, error] = useCurrentUser();
      if (error instanceof Error) {
        return <div>{error.message}</div>;
      }
      return <div />;
    };
    const originalConsoleError = console.error;
    console.error = () => {};
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <Component />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
    console.error = originalConsoleError;
  });
});
