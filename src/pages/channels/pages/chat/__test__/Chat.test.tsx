import '@test-utils/initialize';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoRetryQueryClientProvider from '../../../../../tests/NoRetryQueryClientProvider';
import { Params, useParams } from 'react-router-dom';
import CurrentUserProvider from '../../../../../contexts/current-user/CurrentUserContext';
import { setupBeforeAll, setupTest } from '@test-utils';
import { nanoid } from 'nanoid';
import FriendChat from '../FriendChat';

vi.mock('react-firebase-hooks/auth');
vi.mock('react-router-dom');

const mockedUseParams = vi.mocked(useParams);
const setRouterParams = (obj: Params) => {
  mockedUseParams.mockReturnValue(obj);
};

beforeAll(setupBeforeAll);

describe('Chat', () => {
  it('should send a message and display it', async () => {
    const [cleanup] = await setupTest({
      usernames: ['User#1234'],
      mockUseAuthState: true,
    });
    const user = userEvent.setup();
    setRouterParams({ id: nanoid() });
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <FriendChat />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );
    const input = screen.getByPlaceholderText(/message/i);

    await user.click(input);
    await user.keyboard('Hello world!');
    await user.keyboard('{Enter}');

    expect(await screen.findByText(/hello world/i)).toBeInTheDocument();
    await cleanup();
  });

  it('should send multiple messages ', async () => {
    const [cleanup] = await setupTest({
      usernames: ['User#1234'],
      mockUseAuthState: true,
    });
    const user = userEvent.setup();
    setRouterParams({ id: nanoid() });
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          {' '}
          <FriendChat />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );
    const input = screen.getByPlaceholderText(/message/i);

    await user.click(input);
    await user.keyboard('Hello world!');
    await user.keyboard('{Enter}');
    await user.keyboard('How are you?');
    await user.keyboard('{Enter}');
    await user.keyboard("I hope you're doing well.");
    await user.keyboard('{Enter}');

    expect(await screen.findByText(/hello world/i)).toBeInTheDocument();
    expect(await screen.findByText(/how are you/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/i hope you're doing well/i)
    ).toBeInTheDocument();
    await cleanup();
  });
});
