import '@test-utils/initialize';
import { render, screen } from '@testing-library/react';
import { setupBeforeAll, setupTest } from '@test-utils';
import MembersSliderProvider from '../../../../../contexts/members-slider/MembersSliderContext';
import MembersSlider from '../../../../../contexts/members-slider/components/MembersSlider';

beforeAll(setupBeforeAll);

describe('MembersSlider', () => {
  it("should show the title with the other user's name", async () => {
    const [cleanup] = await setupTest();
    render(
      <MembersSliderProvider>
        <MembersSlider title="User" titlePrefix="@" membersId={''} />
      </MembersSliderProvider>
    );

    expect(screen.getByText('@')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    await cleanup();
  });
});
