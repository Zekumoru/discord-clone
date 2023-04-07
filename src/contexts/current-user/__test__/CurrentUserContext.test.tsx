import setup, { setupTest } from '../../../tests/firebase/setup';
import { render, screen, waitFor } from '@testing-library/react';
import CurrentUserProvider, { useCurrentUser } from '../CurrentUserContext';
import NoRetryQueryClientProvider from '../../../tests/NoRetryQueryClientProvider';
import teardown from '../../../tests/firebase/teardown';

const instance = setup();
afterEach(async () => {
  await teardown(instance);
});

describe('CurrentUserContext', () => {
  it('should return the current user', async () => {
    await setupTest(instance, ['Some User#1234']);
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
  });
});
