import setup, { setupTest } from '../../../../../tests/firebase/setup';
import teardown from '../../../../../tests/firebase/teardown';
import { render, screen, waitFor } from '@testing-library/react';
import Friends from '../Friends';
import CurrentUserProvider from '../../../../../contexts/current-user/CurrentUserContext';
import NoRetryQueryClientProvider from '../../../../../tests/NoRetryQueryClientProvider';
import { BrowserRouter } from 'react-router-dom';
import addFriend from './addFriend';
import { sendFriendRequest } from '../components/add-friend-screen-modal/hooks/use-add-friend/useSendFriendRequest';

const instance = setup();
afterEach(async () => {
  await teardown(instance);
});

describe('FriendsPage', () => {
  it("should list user's friends", async () => {
    const [currentUser, friend] = (await setupTest(instance, [
      'User#1234',
      'Friend#7890',
    ]))!;
    await addFriend(currentUser, friend);
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
    const [currentUser, otherUser] = await setupTest(instance, [
      'User#1234',
      'Test#7890',
    ]);
    await sendFriendRequest(otherUser, currentUser.username);
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
