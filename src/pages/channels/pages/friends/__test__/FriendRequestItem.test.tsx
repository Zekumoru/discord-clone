import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockCurrentUser from '../../../../../contexts/current-user/utils/mockCurrentUser';
import mockGetDocsData, {
  mockCollectionData as mcd,
} from '../../../../../tests/utils/firebase/mockGetDocsData';
import { IFriendRequests, IFriends } from '../../../../../types/friend/Friend';
import IUser from '../../../../../types/user/User';
import FriendRequestItem from '../components/friend-item/FriendRequestItem';
import NoRetryQueryClientProvider from '../../../../../tests/NoRetryQueryClientProvider';
import CurrentUserProvider from '../../../../../contexts/current-user/CurrentUserContext';
import mockGetDocData, {
  mockDocumentData as mdd,
} from '../../../../../tests/utils/firebase/mockGetDocData';
import { WriteBatch, writeBatch } from 'firebase/firestore';

vi.mock('firebase/auth');
vi.mock('firebase/firestore');
vi.mock('react-firebase-hooks/auth');

const mockFirestoreData = () => {
  const currentUser = mockCurrentUser('1234', 'User#1234');
  const friendUser = {
    id: '7890',
    username: 'Friend#7890',
    friendRequestsId: '7890',
    friendsId: '7890',
    pictureUrl: null,
  } as IUser;
  mockGetDocsData({
    users: mcd<IUser>(currentUser, friendUser),
  });
  mockGetDocData({
    'users/1234': mdd(currentUser),
    'users/7890': mdd(friendUser),
    'friend-requests/1234': mdd<IFriendRequests>({
      id: '1234',
      userId: '1234',
      requests: [
        {
          userId: '7890',
          pendingType: 'request',
        },
      ],
    }),
    'friend-requests/7890': mdd<IFriendRequests>({
      id: '7890',
      userId: '7890',
      requests: [
        {
          userId: '1234',
          pendingType: 'acceptance',
        },
      ],
    }),
    'friends/1234': mdd<IFriends>({
      id: '1234',
      userId: '1234',
      friendsList: [],
    }),
    'friends/7890': mdd<IFriends>({
      id: '7890',
      userId: '7890',
      friendsList: [],
    }),
  });
};

describe('FriendsPage/FriendRequestItem', () => {
  it('should add the user as a friend on friend request accepted', async () => {
    const user = userEvent.setup();
    mockFirestoreData();
    const writeBatchSet = vi.fn();
    vi.mocked(writeBatch).mockImplementation(() => {
      return {
        set: writeBatchSet,
        commit: () => {},
      } as unknown as WriteBatch;
    });
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <FriendRequestItem
            request={{ userId: '7890', pendingType: 'acceptance' }}
          />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );

    await waitFor(async () => {
      const acceptButton = screen.getByTestId('accept-btn');

      await user.click(acceptButton);

      expect(screen.getByText(/friend/i)).toBeInTheDocument();
      // expect that the friend requests are removed from both users
      expect(writeBatchSet).toHaveBeenNthCalledWith<[any, IFriendRequests]>(
        1,
        expect.anything(),
        { id: '1234', userId: '1234', requests: [] }
      );
      expect(writeBatchSet).toHaveBeenNthCalledWith<[any, IFriendRequests]>(
        2,
        expect.anything(),
        { id: '7890', userId: '7890', requests: [] }
      );
      // expect that both users are now friends with each other
      expect(writeBatchSet).toHaveBeenNthCalledWith<[any, IFriends]>(
        3,
        expect.anything(),
        {
          id: '1234',
          userId: '1234',
          friendsList: [
            {
              userId: '7890',
            },
          ],
        }
      );
      expect(writeBatchSet).toHaveBeenNthCalledWith<[any, IFriends]>(
        4,
        expect.anything(),
        {
          id: '7890',
          userId: '7890',
          friendsList: [
            {
              userId: '1234',
            },
          ],
        }
      );
    });
  });

  it('should remove the friend requests if rejected', async () => {
    const user = userEvent.setup();
    mockFirestoreData();
    const writeBatchSet = vi.fn();
    vi.mocked(writeBatch).mockImplementation(() => {
      return {
        set: writeBatchSet,
        commit: () => {},
      } as unknown as WriteBatch;
    });
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <FriendRequestItem
            request={{ userId: '7890', pendingType: 'acceptance' }}
          />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );

    await waitFor(async () => {
      const rejectButton = screen.getByTestId('reject-btn');

      await user.click(rejectButton);

      expect(screen.getByText(/friend/i)).toBeInTheDocument();
      // expect that the friend requests are removed from both users
      expect(writeBatchSet).toHaveBeenNthCalledWith<[any, IFriendRequests]>(
        1,
        expect.anything(),
        { id: '1234', userId: '1234', requests: [] }
      );
      expect(writeBatchSet).toHaveBeenNthCalledWith<[any, IFriendRequests]>(
        2,
        expect.anything(),
        { id: '7890', userId: '7890', requests: [] }
      );
    });
  });
});
