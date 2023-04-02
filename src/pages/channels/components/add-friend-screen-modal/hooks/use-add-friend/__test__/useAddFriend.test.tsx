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
import {
  DocumentReference,
  DocumentSnapshot,
  getDoc,
} from 'firebase/firestore';
import {
  IFriendRequest,
  IFriendRequests,
} from '../../../../../../../types/friend/Friend';
import createDoc from '../../../../../../../utils/firebase/createDoc';

vi.mock('../../../../../../../utils/firebase/createDoc');
const mockedCreateDoc = vi.mocked(createDoc);

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
  getDoc: vi.fn(async () => ({ data: vi.fn() })),
}));

const mockedGetDoc = vi.mocked(getDoc);

vi.mock('../utils/createFriendRequest', () => ({
  default: vi.fn(async () => {}),
}));
const mockedCreateFriendRequest = vi.mocked(createFriendRequest);

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(() => []),
}));
const mockedUseAuthState = vi.mocked(useAuthState);

afterEach(() => {
  mockedCreateDoc.mockRestore();
  mockedUseCurrentUser.mockRestore();
  mockedFindUserByUsername.mockRestore();
  mockedGetDoc.mockRestore();
  mockedCreateFriendRequest.mockRestore();
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
      { id: '1234', username: 'User#1234', friendRequestsId: '1234' } as IUser,
      false,
      undefined,
    ]);
    mockedFindUserByUsername.mockReturnValue(
      Promise.resolve({
        id: '7890',
        username: 'Test#1234',
        friendRequestsId: '7890',
      } as IUser)
    );
    mockedCreateDoc.mockImplementation((docName) => {
      return { path: docName } as DocumentReference<IFriendRequests>;
    });
    mockedGetDoc.mockImplementation(async (ref) => {
      return {
        data: () => ({
          requests: [] as IFriendRequest[],
        }),
      } as DocumentSnapshot<IFriendRequests>;
    });
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
      friendRequests: { requests: [] as IFriendRequest[] } as IFriendRequests,
      friendRequestsRef: {
        path: 'friend-requests/7890',
      } as DocumentReference<IFriendRequests>,
      userId: '1234',
      pendingType: 'acceptance',
    });
    expect(createFriendRequest).toHaveBeenNthCalledWith<
      [any, CreateFriendRequestOptions]
    >(2, expect.anything(), {
      friendRequests: { requests: [] as IFriendRequest[] } as IFriendRequests,
      friendRequestsRef: {
        path: 'friend-requests/1234',
      } as DocumentReference<IFriendRequests>,
      userId: '7890',
      pendingType: 'request',
    });
  });

  it('should return an error if a user tries to add the same user again', async () => {
    const user = userEvent.setup();
    mockedUseCurrentUser.mockReturnValue([
      { id: '1234', username: 'User#1234', friendRequestsId: '1234' } as IUser,
      false,
      undefined,
    ]);
    mockedFindUserByUsername.mockReturnValue(
      Promise.resolve({
        id: '7890',
        username: 'Test#7890',
        friendRequestsId: '7890',
      } as IUser)
    );
    mockedCreateDoc.mockImplementation((docName) => {
      return { path: docName } as DocumentReference<IFriendRequests>;
    });
    mockedGetDoc.mockImplementation(async (ref) => {
      if (ref.path.includes('1234')) {
        return {
          data: () => ({
            requests: [{ userId: '7890', pendingType: 'request' }],
          }),
        } as DocumentSnapshot<IFriendRequests>;
      }
      return {
        data: () => ({
          requests: [{ userId: '1234', pendingType: 'acceptance' }],
        }),
      } as DocumentSnapshot<IFriendRequests>;
    });
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
      return <button onClick={() => addFriend('Test#7890')} />;
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
      screen.getByText(/already sent a friend request/i)
    ).toBeInTheDocument();
    console.error = originalConsoleError;
  });
});
