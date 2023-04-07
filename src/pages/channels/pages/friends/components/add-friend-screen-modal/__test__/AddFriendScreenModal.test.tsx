import setup, { setupTest } from '../../../../../../../tests/firebase/setup';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddFriendScreenModal from '../AddFriendScreenModal';
import NoRetryQueryClientProvider from '../../../../../../../tests/NoRetryQueryClientProvider';
import CurrentUserProvider from '../../../../../../../contexts/current-user/CurrentUserContext';
import teardown from '../../../../../../../tests/firebase/teardown';

const instance = setup();
afterEach(async () => {
  await teardown(instance);
});

describe('AddFriendScreenModal', () => {
  it("should close the modal when the 'close' button is clicked", async () => {
    await setupTest(instance, ['User#1234']);
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
  });

  it("should show the name of the current user in the 'Your username is ...'", async () => {
    await setupTest(instance, ['User#1234']);
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <AddFriendScreenModal close={() => {}} />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/your username is user#1234/i)
      ).toBeInTheDocument();
    });
  });

  it('should close the modal when friend request is sent', async () => {
    await setupTest(instance, ['User#1234']);
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
  });
});
