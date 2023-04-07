import '@test-utils/initialize';
import { render, screen, waitFor } from '@testing-library/react';
import CurrentUserProvider, { useCurrentUser } from '../CurrentUserContext';
import NoRetryQueryClientProvider from '../../../tests/NoRetryQueryClientProvider';
import { setupBeforeAll, setupTest } from '@test-utils';

vi.mock('react-firebase-hooks/auth');
beforeAll(setupBeforeAll);

describe('CurrentUserContext', () => {
  it('should return the current user', async () => {
    const [cleanup] = await setupTest({
      usernames: ['Some User#1234'],
      mockUseAuthState: true,
    });
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
      expect(screen.getByText(/some user/i)).toBeInTheDocument();
    });
    await cleanup();
  });
});
