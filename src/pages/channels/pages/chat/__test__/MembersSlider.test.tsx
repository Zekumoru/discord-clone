import setup, { setupTest } from '../../../../../tests/firebase/setup';
import { render, screen, waitFor } from '@testing-library/react';
import MembersSlider from '../components/members-slider/MembersSlider';
import NoRetryQueryClientProvider from '../../../../../tests/NoRetryQueryClientProvider';
import teardown from '../../../../../tests/firebase/teardown';

const instance = setup();
afterEach(async () => {
  await teardown(instance);
});

describe('MembersSlider', () => {
  it("should show the title with the other user's name", async () => {
    await setupTest(instance);
    render(
      <MembersSlider
        isOpen={true}
        headerProps={{ title: 'User', prefix: '@' }}
        members={[]}
      />
    );

    expect(screen.getByText('@')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('should display the members', async () => {
    const [currentUser, otherUser] = await setupTest(instance, [
      'User#1234',
      'Test#7890',
    ]);
    render(
      <NoRetryQueryClientProvider>
        <MembersSlider
          isOpen={true}
          headerProps={{ title: otherUser.username, prefix: '@' }}
          members={[{ userId: currentUser.id }, { userId: otherUser.id }]}
        />
      </NoRetryQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/members — 2/i)).toBeInTheDocument();
      expect(screen.getByText('User')).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });
});
