import { sendMessage } from '../hooks/useSendMessage';
import mockWriteBatch from '../../../../../tests/firebase/mockWriteBatch';

vi.mock('firebase/firestore');

describe('Chat/useSendMessages', () => {
  it('should send a message', async () => {
    const { set } = mockWriteBatch();
    await sendMessage({
      chatId: 'chat-id',
      userId: 'user-id',
      content: 'Hello world!',
    });

    expect(set).toHaveBeenNthCalledWith(1, expect.anything(), {
      id: expect.anything(),
      timestamp: expect.anything(),
      content: 'Hello world!',
      userId: 'user-id',
    });
  });
});
