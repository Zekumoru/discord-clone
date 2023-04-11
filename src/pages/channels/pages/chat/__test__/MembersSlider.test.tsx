import '@test-utils/initialize';
import { render, screen, waitFor } from '@testing-library/react';
import MembersSlider from '../components/members-slider/MembersSlider';
import NoRetryQueryClientProvider from '../../../../../tests/NoRetryQueryClientProvider';
import { setupBeforeAll, setupTest } from '@test-utils';
import removeTagFromName from '../../../../../utils/removeTagFromName';

beforeAll(setupBeforeAll);

describe('MembersSlider', () => {
  it("should show the title with the other user's name", async () => {
    const [cleanup] = await setupTest();
    render(
      <MembersSlider
        isOpen={true}
        headerProps={{ title: 'User', prefix: '@' }}
        members={[]}
      />
    );

    expect(screen.getByText('@')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    await cleanup();
  });

  it('should display the members', async () => {
    const [cleanup, currentUser, otherUser] = await setupTest({
      usernames: ['User#1234', 'Test#7890'],
    });
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
      expect(
        screen.getByText(removeTagFromName(currentUser.username))
      ).toBeInTheDocument();
      expect(
        screen.getByText(removeTagFromName(currentUser.username))
      ).toBeInTheDocument();
    });
    await cleanup();
  });
});
