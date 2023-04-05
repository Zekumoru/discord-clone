import { render, screen, waitFor } from '@testing-library/react';
import Friends from '../Friends';
import mockCurrentUser from '../../../../../contexts/current-user/utils/mockCurrentUser';
import mockGetDocsData, {
  mockCollectionData as mcd,
} from '../../../../../tests/utils/firebase/mockGetDocsData';
import CurrentUserProvider from '../../../../../contexts/current-user/CurrentUserContext';
import NoRetryQueryClientProvider from '../../../../../tests/NoRetryQueryClientProvider';
import { DocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { IFriendRequests, IFriends } from '../../../../../types/friend/Friend';
import IUser from '../../../../../types/user/User';
import mockGetDocData, {
  mockDocumentData as mdd,
} from '../../../../../tests/utils/firebase/mockGetDocData';
import { BrowserRouter } from 'react-router-dom';

vi.mock('firebase/auth');
vi.mock('firebase/firestore');
vi.mock('react-firebase-hooks/auth');

describe('FriendsPage', () => {
  it("should list user's friends", async () => {
    const currentUser = mockCurrentUser('1234', 'User#1234');
    const friendUser = {
      id: '7890',
      username: 'Friend#7890',
    } as IUser;
    mockGetDocsData({
      users: mcd(currentUser, friendUser),
    });
    mockGetDocData({
      'users/1234': mdd(currentUser),
      'users/7890': mdd(friendUser),
    });
    vi.mocked(onSnapshot).mockImplementation((query, callback) => {
      const path = (query as unknown as { path: string }).path;
      (callback as (snapshot: DocumentSnapshot) => void)({
        data: () => {
          if (path === 'friends/1234') {
            return {
              id: '1234',
              userId: '1234',
              friendsList: [{ userId: '7890', chatId: '7890' }],
            } as IFriends;
          }
        },
      } as DocumentSnapshot);
      return () => {};
    });
    render(
      <BrowserRouter>
        <NoRetryQueryClientProvider>
          <CurrentUserProvider>
            <Friends />
          </CurrentUserProvider>
        </NoRetryQueryClientProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/added — 1/i)).toBeInTheDocument();
      expect(screen.getByText(/friend/i)).toBeInTheDocument();
    });
  });

  it("should list user's friend requests", async () => {
    const currentUser = mockCurrentUser('1234', 'User#1234');
    const friendUser = {
      id: '7890',
      username: 'Friend#7890',
    } as IUser;
    mockGetDocsData({
      users: mcd(currentUser, friendUser),
    });
    mockGetDocData({
      'users/1234': mdd(currentUser),
      'users/7890': mdd(friendUser),
    });
    vi.mocked(onSnapshot).mockImplementation((query, callback) => {
      const path = (query as unknown as { path: string }).path;
      (callback as (snapshot: DocumentSnapshot) => void)({
        data: () => {
          if (path === 'friend-requests/1234') {
            return {
              id: '1234',
              userId: '1234',
              requests: [
                {
                  userId: '7890',
                  pendingType: 'acceptance',
                },
              ],
            } as IFriendRequests;
          }
        },
      } as DocumentSnapshot);
      return () => {};
    });
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <Friends />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/requests — 1/i)).toBeInTheDocument();
      expect(screen.getByText(/friend/i)).toBeInTheDocument();
    });
  });
});
