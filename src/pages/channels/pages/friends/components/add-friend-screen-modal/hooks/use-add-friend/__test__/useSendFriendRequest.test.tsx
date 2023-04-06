import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useSendFriendRequest from '../useSendFriendRequest';
import IUser from '../../../../../../../../../types/user/User';
import {
  DocumentReference,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  WithFieldValue,
  WriteBatch,
  getDoc,
  getDocs,
  getFirestore,
  writeBatch,
} from 'firebase/firestore';
import {
  IFriendRequest,
  IFriendRequests,
} from '../../../../../../../../../types/friend/Friend';
import NoRetryQueryClientProvider from '../../../../../../../../../tests/NoRetryQueryClientProvider';
import silentErrors from '../../../../../../../../../tests/silentErrors';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import CurrentUserProvider from '../../../../../../../../../contexts/current-user/CurrentUserContext';

vi.mock('firebase/auth');
vi.mock('firebase/firestore');
vi.mock('react-firebase-hooks/auth');

describe('AddFriendScreenModal/useAddFriend', () => {
  it('should return an error if the user, for some reason, is not logged in then tries to add someone as a friend', async () => {
    const user = userEvent.setup();
    const Component = () => {
      const { mutate: addFriend, error } = useSendFriendRequest();
      if (error instanceof Error) {
        return <div>{error.message}</div>;
      }
      return <button onClick={() => addFriend('User#1234')} />;
    };

    await silentErrors(async () => {
      render(
        <NoRetryQueryClientProvider>
          <Component />
        </NoRetryQueryClientProvider>
      );

      await user.click(screen.getByRole('button'));

      expect(screen.getByText(/user is not logged in/i)).toBeInTheDocument();
    });
  });

  it('should return an error if the user to add does not exist', async () => {
    const user = userEvent.setup();
    const mockCurrenUser = () => {
      vi.mocked(useAuthState).mockReturnValue([
        {
          uid: '1234',
        } as User,
        false,
        undefined,
      ]);
      vi.mocked(getDocs<IUser>).mockResolvedValueOnce({
        docs: [
          {
            data: () => ({
              id: '1234',
              username: 'User#1234',
            }),
          },
        ],
      } as QuerySnapshot<IUser>);
    };
    const mockFoundUsers = () => {
      vi.mocked(getDocs<IUser>).mockResolvedValueOnce({
        docs: [] as QueryDocumentSnapshot[],
      } as QuerySnapshot<IUser>);
    };
    const Component = () => {
      const { mutate: addFriend, error } = useSendFriendRequest();
      if (error instanceof Error) {
        return <div>{error.message}</div>;
      }
      return <button onClick={() => addFriend('Test#7890')} />;
    };

    await silentErrors(async () => {
      mockCurrenUser();
      mockFoundUsers();
      render(
        <NoRetryQueryClientProvider>
          <CurrentUserProvider>
            <Component />
          </CurrentUserProvider>
        </NoRetryQueryClientProvider>
      );

      await user.click(screen.getByRole('button'));

      expect(screen.getByText(/the user does not exist/i)).toBeInTheDocument();
    });
  });

  it('should return an error that you cannot add yourself as a friend', async () => {
    const user = userEvent.setup();
    const mockCurrenUser = () => {
      vi.mocked(useAuthState).mockReturnValue([
        {
          uid: '1234',
        } as User,
        false,
        undefined,
      ]);
      vi.mocked(getDocs<IUser>).mockResolvedValueOnce({
        docs: [
          {
            data: () => ({
              id: '1234',
              username: 'User#1234',
            }),
          },
        ],
      } as QuerySnapshot<IUser>);
    };
    const mockFoundUsers = () => {
      vi.mocked(getDocs<IUser>).mockResolvedValueOnce({
        docs: [
          {
            data: () => ({
              id: '1234',
              username: 'User#1234',
            }),
          },
        ],
      } as QuerySnapshot<IUser>);
    };
    const Component = () => {
      const { mutate: addFriend, error } = useSendFriendRequest();
      if (error instanceof Error) {
        return <div>{error.message}</div>;
      }
      return <button onClick={() => addFriend('User#1234')} />;
    };

    await silentErrors(async () => {
      mockCurrenUser();
      mockFoundUsers();
      render(
        <NoRetryQueryClientProvider>
          <CurrentUserProvider>
            <Component />
          </CurrentUserProvider>
        </NoRetryQueryClientProvider>
      );

      await user.click(screen.getByRole('button'));

      expect(
        screen.getByText(/cannot add yourself as a friend/i)
      ).toBeInTheDocument();
    });
  });

  test('that the user sending the request gets a friend request of type pending request and the user being sent a friend request gets a friend request of type pending acceptance', async () => {
    const user = userEvent.setup();
    const mockCurrenUser = () => {
      vi.mocked(useAuthState).mockReturnValue([
        {
          uid: '1234',
        } as User,
        false,
        undefined,
      ]);
      vi.mocked(getDocs<IUser>).mockResolvedValueOnce({
        docs: [
          {
            data: () => ({
              id: '1234',
              username: 'User#1234',
            }),
          },
        ],
      } as QuerySnapshot<IUser>);
    };
    const mockFoundUsers = () => {
      vi.mocked(getDocs<IUser>).mockResolvedValueOnce({
        docs: [
          {
            data: () => ({
              id: '7890',
              username: 'Test#7890',
            }),
          },
        ],
      } as QuerySnapshot<IUser>);
    };
    const mockFriendRequests = () => {
      vi.mocked(getDoc<IFriendRequests>).mockResolvedValueOnce({
        data: () => ({
          id: '1234',
          userId: '1234',
          requests: [] as IFriendRequest[],
        }),
      } as DocumentSnapshot<IFriendRequests>);
      vi.mocked(getDoc<IFriendRequests>).mockResolvedValueOnce({
        data: () => ({
          id: '7890',
          userId: '7890',
          requests: [] as IFriendRequest[],
        }),
      } as DocumentSnapshot<IFriendRequests>);
    };
    type WriteBatchSetArgs = [
      DocumentReference<IFriendRequests>,
      WithFieldValue<IFriendRequests>
    ];
    const writeBatchSet = vi.fn<WriteBatchSetArgs>();
    vi.mocked(writeBatch).mockImplementation(() => {
      return {
        set: writeBatchSet,
      } as unknown as WriteBatch;
    });
    const Component = () => {
      const { mutate: addFriend } = useSendFriendRequest();
      return <button onClick={() => addFriend('Test#1234')} />;
    };

    await silentErrors(async () => {
      mockCurrenUser();
      mockFoundUsers();
      mockFriendRequests();
      render(
        <NoRetryQueryClientProvider>
          <CurrentUserProvider>
            <Component />
          </CurrentUserProvider>
        </NoRetryQueryClientProvider>
      );

      await user.click(screen.getByRole('button'));

      expect(writeBatchSet).toBeCalledTimes(2);
      expect(writeBatchSet).toHaveBeenNthCalledWith<WriteBatchSetArgs>(
        1,
        expect.anything(),
        {
          id: '7890',
          userId: '7890',
          requests: [
            {
              pendingType: 'acceptance',
              userId: '1234',
            },
          ],
        } as IFriendRequests
      );
      expect(writeBatchSet).toHaveBeenNthCalledWith<WriteBatchSetArgs>(
        2,
        expect.anything(),
        {
          id: '1234',
          userId: '1234',
          requests: [
            {
              pendingType: 'request',
              userId: '7890',
            },
          ],
        } as IFriendRequests
      );
    });
  });

  it('should return an error if a user tries to add the same user again', async () => {
    const user = userEvent.setup();
    const mockCurrenUser = () => {
      vi.mocked(useAuthState).mockReturnValue([
        {
          uid: '1234',
        } as User,
        false,
        undefined,
      ]);
      vi.mocked(getDocs<IUser>).mockResolvedValueOnce({
        docs: [
          {
            data: () => ({
              id: '1234',
              username: 'User#1234',
            }),
          },
        ],
      } as QuerySnapshot<IUser>);
    };
    const mockFoundUsers = () => {
      vi.mocked(getDocs<IUser>).mockResolvedValueOnce({
        docs: [
          {
            data: () => ({
              id: '7890',
              username: 'Test#7890',
            }),
          },
        ],
      } as QuerySnapshot<IUser>);
    };
    const mockFriendRequests = () => {
      vi.mocked(getDoc<IFriendRequests>).mockResolvedValueOnce({
        data: () => ({
          id: '1234',
          requests: [{ pendingType: 'request', userId: '7890' }],
        }),
      } as DocumentSnapshot<IFriendRequests>);
      vi.mocked(getDoc<IFriendRequests>).mockResolvedValueOnce({
        data: () => ({
          id: '7890',
          requests: [{ pendingType: 'acceptance', userId: '1234' }],
        }),
      } as DocumentSnapshot<IFriendRequests>);
    };
    const Component = () => {
      const { mutate: addFriend, error } = useSendFriendRequest();
      if (error instanceof Error) {
        return <div>{error.message}</div>;
      }
      return <button onClick={() => addFriend('Test#7890')} />;
    };

    await silentErrors(async () => {
      mockCurrenUser();
      mockFoundUsers();
      mockFriendRequests();
      render(
        <NoRetryQueryClientProvider>
          <CurrentUserProvider>
            <Component />
          </CurrentUserProvider>
        </NoRetryQueryClientProvider>
      );

      await user.click(screen.getByRole('button'));

      expect(
        screen.getByText(/already sent a friend request/i)
      ).toBeInTheDocument();
    });
  });
});
