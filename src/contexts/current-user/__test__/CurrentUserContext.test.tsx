import setup from '../../../tests/firebase/setup';
import { render, screen, waitFor } from '@testing-library/react';
import CurrentUserProvider, { useCurrentUser } from '../CurrentUserContext';
import NoRetryQueryClientProvider from '../../../tests/NoRetryQueryClientProvider';
import teardown from '../../../tests/firebase/teardown';

afterEach(async () => {
  await teardown();
});

describe('CurrentUserContext', () => {
  it('should return the current user', async () => {
    await setup(['Some User#1234']);
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
