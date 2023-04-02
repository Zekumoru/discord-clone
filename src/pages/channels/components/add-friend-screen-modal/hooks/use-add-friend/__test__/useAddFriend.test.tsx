import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCurrentUser } from '../../../../../../../contexts/current-user/CurrentUserContext';
import findUserByUsername from '../../../../../../../types/user/firebase/findUserByUsername';
import { QueryClient, QueryClientProvider } from 'react-query';
import useAddFriend from '../useAddFriend';
import IUser from '../../../../../../../types/user/User';
import createFriendRequest, {
  CreateFriendRequestOptions,
} from '../utils/createFriendRequest';

vi.mock(
  '../../../../../../../contexts/current-user/CurrentUserContext',
  () => ({
    useCurrentUser: vi.fn(() => []),
  })
);
const mockedUseCurrentUser = vi.mocked(useCurrentUser);

vi.mock('../../../../../../../types/user/firebase/findUserByUsername', () => ({
  default: vi.fn(async () => {}),
}));
const mockedFindUserByUsername = vi.mocked(findUserByUsername);

vi.mock('firebase/auth');
vi.mock('firebase/firestore', () => ({
  getFirestore: () => {},
  collection: () => ({
    withConverter: () => {},
  }),
  writeBatch: vi.fn(() => ({ commit: () => {} })),
}));

vi.mock('../utils/createFriendRequest', () => ({
  default: vi.fn(async () => {}),
}));
const mockedCreateFriendRequest = vi.mocked(createFriendRequest);

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(() => []),
}));
const mockedUseAuthState = vi.mocked(useAuthState);

afterEach(() => {
  mockedFindUserByUsername.mockRestore();
  mockedUseAuthState.mockRestore();
});

describe('AddFriendScreenModal/useAddFriend', () => {
  it('should return an error if the user, for some reason, is not logged in then tries to add someone as a friend', async () => {
    const user = userEvent.setup();
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    const Component = () => {
      const { mutate: addFriend, error } = useAddFriend();
      if (error instanceof Error) {
        return <div>{error.message}</div>;
      }
      return <button onClick={() => addFriend('User#1234')} />;
    };
    const originalConsoleError = console.error;
    console.error = () => {};
    render(
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    );

    await user.click(screen.getByRole('button'));

    expect(screen.getByText(/user is not logged in/i)).toBeInTheDocument();
    console.error = originalConsoleError;
  });

  it('should return an error if the user to add does not exist', async () => {
    const user = userEvent.setup();
    mockedUseCurrentUser.mockReturnValue([
      { username: 'Test#1234' } as IUser,
      false,
      undefined,
    ]);
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    const Component = () => {
      const { mutate: addFriend, error } = useAddFriend();
      if (error instanceof Error) {
        return <div>{error.message}</div>;
      }
      return <button onClick={() => addFriend('User#1234')} />;
    };
    const originalConsoleError = console.error;
    console.error = () => {};
    render(
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    );

    await user.click(screen.getByRole('button'));

    expect(screen.getByText(/the user does not exist/i)).toBeInTheDocument();
    console.error = originalConsoleError;
  });

  it('should return an error that you cannot add yourself as a friend', async () => {
    const user = userEvent.setup();
    mockedUseCurrentUser.mockReturnValue([
      { id: '1234567890', username: 'User#1234' } as IUser,
      false,
      undefined,
    ]);
    mockedFindUserByUsername.mockReturnValue(
      Promise.resolve({ id: '1234567890', username: 'User#1234' } as IUser)
    );
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    const Component = () => {
      const { mutate: addFriend, error } = useAddFriend();
      if (error instanceof Error) {
        return <div>{error.message}</div>;
      }
      return <button onClick={() => addFriend('User#1234')} />;
    };
    const originalConsoleError = console.error;
    console.error = () => {};
    render(
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    );

    await user.click(screen.getByRole('button'));

    expect(
      screen.getByText(/cannot add yourself as a friend/i)
    ).toBeInTheDocument();
    console.error = originalConsoleError;
  });

  test('that the user sending the request gets a friend request of type pending request and the user being sent a friend request gets a friend request of type pending acceptance', async () => {
    const user = userEvent.setup();
    mockedUseCurrentUser.mockReturnValue([
      { id: '123', username: 'User#1234', friendRequestsId: '123' } as IUser,
      false,
      undefined,
    ]);
    mockedFindUserByUsername.mockReturnValue(
      Promise.resolve({
        id: '789',
        username: 'Test#1234',
        friendRequestsId: '789',
      } as IUser)
    );
    const createFriendRequest = vi.fn();
    mockedCreateFriendRequest.mockImplementation(createFriendRequest);
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    const Component = () => {
      const { mutate: addFriend } = useAddFriend();
      return <button onClick={() => addFriend('User#1234')} />;
    };
    render(
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    );

    await user.click(screen.getByRole('button'));

    expect(createFriendRequest).toBeCalledTimes(2);
    expect(createFriendRequest).toHaveBeenNthCalledWith<
      [any, CreateFriendRequestOptions]
    >(1, expect.anything(), {
      userId: '123',
      requestsId: '789',
      pendingType: 'acceptance',
    });
    expect(createFriendRequest).toHaveBeenNthCalledWith<
      [any, CreateFriendRequestOptions]
    >(2, expect.anything(), {
      userId: '789',
      requestsId: '123',
      pendingType: 'request',
    });
  });
});
