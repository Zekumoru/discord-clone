import '@test-utils/initialize';
import { setupBeforeAll, setupTest } from '@test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import UserPartialModal from '../UserPartialModal';
import { format } from 'date-fns';
import NoRetryQueryClientProvider from '../../../tests/NoRetryQueryClientProvider';
import extractNameAndTag from '../../../utils/extractNameAndTag';
import { BrowserRouter } from 'react-router-dom';

vi.mock('react-router-dom');

beforeAll(setupBeforeAll);

describe('UserPartialModal', () => {
  it('displays the modal with the correct user information', async () => {
    const [cleanup, user] = await setupTest({ usernames: ['User#0000'] });
    render(
      <BrowserRouter>
        <NoRetryQueryClientProvider>
          <UserPartialModal userId={user.id} />
        </NoRetryQueryClientProvider>
      </BrowserRouter>
    );
    const [name, tag] = extractNameAndTag(user.username);

    await waitFor(() => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(`#${tag}`)).toBeInTheDocument();
    });
    await cleanup();
  });
});
