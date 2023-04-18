import '@test-utils/initialize';
import { render, screen, waitFor } from '@testing-library/react';
import NoRetryQueryClientProvider from '../../../../../tests/NoRetryQueryClientProvider';
import { setupBeforeAll, setupTest } from '@test-utils';
import removeTagFromName from '../../../../../utils/removeTagFromName';
import MembersSliderProvider from '../../../../../contexts/members-slider/MembersSliderContext';
import MembersSlider from '../../../../../contexts/members-slider/components/MembersSlider';
import createMember from '../../../../../types/member/utils/createMember';

beforeAll(setupBeforeAll);

describe('MembersSlider', () => {
  it("should show the title with the other user's name", async () => {
    const [cleanup] = await setupTest();
    render(
      <MembersSliderProvider>
        <MembersSlider title="User" titlePrefix="@" members={[]} />
      </MembersSliderProvider>
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
        <MembersSliderProvider>
          <MembersSlider
            title={otherUser.username}
            titlePrefix="@"
            members={[createMember(currentUser.id), createMember(otherUser.id)]}
          />
        </MembersSliderProvider>
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
