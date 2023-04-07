import '@test-utils/initialize';
import { render, screen, waitFor } from '@testing-library/react';
import ChatMessages from '../components/ChatMessages';
import NoRetryQueryClientProvider from '../../../../../tests/NoRetryQueryClientProvider';
import { sendMessage } from '../hooks/useSendMessage';
import { setupBeforeAll, setupTest } from '@test-utils';

beforeAll(setupBeforeAll);

describe('Chat/ChatMessages', () => {
  it('should render messages', async () => {
    const [cleanup, currentUser, otherUser] = await setupTest({
      usernames: ['User#1234', 'Test#7890'],
    });
    render(
      <NoRetryQueryClientProvider>
        <ChatMessages chatId="chat-id" />
      </NoRetryQueryClientProvider>
    );

    await sendMessage({
      chatId: 'chat-id',
      userId: currentUser.id,
      content: 'Hello world!',
    });
    await sendMessage({
      chatId: 'chat-id',
      userId: otherUser.id,
      content: 'Hey! How are you doing!',
    });

    waitFor(() => {
      expect(screen.getByText(/hello world/i)).toBeInTheDocument();
      expect(screen.getByText(/how are you doing/i)).toBeInTheDocument();
    });
    await cleanup();
  });
});
