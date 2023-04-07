import '@test-utils/initialize';
import { render, screen, waitFor } from '@testing-library/react';
import Friends from '../Friends';
import CurrentUserProvider from '../../../../../contexts/current-user/CurrentUserContext';
import NoRetryQueryClientProvider from '../../../../../tests/NoRetryQueryClientProvider';
import { BrowserRouter } from 'react-router-dom';
import { sendFriendRequest } from '../components/add-friend-screen-modal/hooks/use-add-friend/useSendFriendRequest';
import { setupBeforeAll, setupTest } from '@test-utils';
import addFriend from './addFriend';
import { nanoid } from 'nanoid';

vi.mock('react-firebase-hooks/auth');
beforeAll(setupBeforeAll);

describe('FriendsPage', () => {
  it("should list user's friends", async () => {
    const [cleanup, currentUser, friend] = await setupTest({
      usernames: ['User#1234', 'Friend#7890'],
      mockUseAuthState: true,
    });
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
    await cleanup();
  });

  it("should list user's friend requests", async () => {
    const [cleanup, currentUser, otherUser] = await setupTest({
      usernames: [`User#0000`, 'Test#7890'],
      mockUseAuthState: true,
    });
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
    await cleanup();
  });
});
