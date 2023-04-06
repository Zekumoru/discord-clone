import setup from '../../../../../tests/firebase/setup';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoRetryQueryClientProvider from '../../../../../tests/NoRetryQueryClientProvider';
import Chat from '../Chat';
import { Params, useParams } from 'react-router-dom';
import CurrentUserProvider from '../../../../../contexts/current-user/CurrentUserContext';
import teardown from '../../../../../tests/firebase/teardown';

vi.mock('react-router-dom');

const mockedUseParams = vi.mocked(useParams);
const setRouterParams = (obj: Params) => {
  mockedUseParams.mockReturnValue(obj);
};

afterEach(async () => {
  mockedUseParams.mockRestore();
  await teardown();
});

describe('Chat', () => {
  it('should send a message and display it', async () => {
    await setup(['User#1234']);
    const user = userEvent.setup();
    setRouterParams({ id: 'chat-id' });
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <Chat />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );
    const input = screen.getByPlaceholderText(/message/i);

    await user.click(input);
    await user.keyboard('Hello world!');
    await user.keyboard('{Enter}');

    waitFor(() => {
      expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    });
  });

  it('should send multiple messages ', async () => {
    await setup(['User#1234']);
    const user = userEvent.setup();
    setRouterParams({ id: 'chat-id' });
    render(
      <NoRetryQueryClientProvider>
        <CurrentUserProvider>
          <Chat />
        </CurrentUserProvider>
      </NoRetryQueryClientProvider>
    );
    const input = screen.getByPlaceholderText(/message/i);

    await user.click(input);
    await user.keyboard('Hello world!');
    await user.keyboard('How are you?');
    await user.keyboard("I hope you're doing well.");
    await user.keyboard('{Enter}');

    waitFor(() => {
      expect(screen.getByText(/hello world/i)).toBeInTheDocument();
      expect(screen.getByText(/how are you/i)).toBeInTheDocument();
      expect(screen.getByText(/i hope you're doing well/i)).toBeInTheDocument();
    });
  });
});
