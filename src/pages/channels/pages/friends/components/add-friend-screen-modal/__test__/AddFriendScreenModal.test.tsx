import '@test-utils/initialize';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddFriendScreenModal from '../AddFriendScreenModal';
import NoRetryQueryClientProvider from '../../../../../../../tests/NoRetryQueryClientProvider';
import CurrentUserProvider from '../../../../../../../contexts/current-user/CurrentUserContext';
import { setupBeforeAll, setupTest } from '@test-utils';

vi.mock('react-firebase-hooks/auth');
beforeAll(setupBeforeAll);

describe('AddFriendScreenModal', () => {
  it("should close the modal when the 'close' button is clicked", async () => {
    const [cleanup] = await setupTest({
      usernames: ['User#1234'],
      mockUseAuthState: true,
    });
    const user = userEvent.setup();
    const closeFn = vi.fn();
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <AddFriendScreenModal close={closeFn} />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );

    await user.click(screen.getByText('Close'));

    expect(closeFn).toBeCalled();
    await cleanup();
  });

  it("should show the name of the current user in the 'Your username is ...'", async () => {
    const [cleanup] = await setupTest({
      usernames: ['User#1234'],
      mockUseAuthState: true,
    });
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <AddFriendScreenModal close={() => {}} />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/your username is .*user#1234/i)
      ).toBeInTheDocument();
    });
    await cleanup();
  });

  it('should close the modal when friend request is sent', async () => {
    const [cleanup] = await setupTest({
      usernames: ['User#1234'],
      mockUseAuthState: true,
    });
    const user = userEvent.setup();
    const closeFn = vi.fn();
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <AddFriendScreenModal close={closeFn} />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );

    await user.click(screen.getByText('Close'));

    expect(closeFn).toBeCalled();
    await cleanup();
  });
});
