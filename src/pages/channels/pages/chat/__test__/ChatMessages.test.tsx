import '@test-utils/initialize';
import { render, screen, waitFor } from '@testing-library/react';
import ChatMessages from '../components/ChatMessages';
import NoRetryQueryClientProvider from '../../../../../tests/NoRetryQueryClientProvider';
import { sendMessage } from '../hooks/useSendMessage';
import { setupBeforeAll, setupTest } from '@test-utils';
import snowflakeId from '../../../../../utils/snowflake-id/snowflakeId';

beforeAll(setupBeforeAll);

describe('Chat/ChatMessages', () => {
  it('should render messages', async () => {
    const [cleanup, currentUser, otherUser] = await setupTest({
      usernames: ['User#1234', 'Test#7890'],
    });
    const chatId = snowflakeId();
    render(
      <NoRetryQueryClientProvider>
        <ChatMessages chatId={chatId} />
      </NoRetryQueryClientProvider>
    );

    await sendMessage({
      chatId: chatId,
      userId: currentUser.id,
      content: 'Hello world!',
    });
    await sendMessage({
      chatId: chatId,
      userId: otherUser.id,
      content: 'Hey! How are you doing!',
    });

    expect(await screen.findByText(/hello world/i)).toBeInTheDocument();
    expect(await screen.findByText(/how are you doing/i)).toBeInTheDocument();
    await cleanup();
  });
});
