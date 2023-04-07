import setup, { setupTest } from '../../../../../tests/firebase/setup';
import { render, screen, waitFor } from '@testing-library/react';
import ChatMessages from '../components/ChatMessages';
import NoRetryQueryClientProvider from '../../../../../tests/NoRetryQueryClientProvider';
import teardown from '../../../../../tests/firebase/teardown';
import { sendMessage } from '../hooks/useSendMessage';

const instance = setup();
afterEach(async () => {
  await teardown(instance);
});

describe('Chat/ChatMessages', () => {
  it('should render messages', async () => {
    const [currentUser, otherUser] = await setupTest(instance, [
      'User#1234',
      'Test#7890',
    ]);
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
  });
});
