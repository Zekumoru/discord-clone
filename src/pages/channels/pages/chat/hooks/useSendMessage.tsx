import { useMutation } from 'react-query';
import performBatch from '../../../../../utils/performBatch';
import chatMessageDoc from '../../../../../types/chat/firebase/chatMessageDoc';
import snowflakeId from '../../../../../utils/snowflake-id/snowflakeId';
import { serverTimestamp } from 'firebase/firestore';
import channelMessagesDoc from '../../../../../types/channel/firebase/channelMessagesDoc';

type ChatOptions = {
  type: 'chat';
  chatId: string;
};

type MessageOptions = {
  type: 'channel';
  channelId: string;
};

type SendMessageOptions = {
  content: string;
  userId: string;
} & (ChatOptions | MessageOptions);

const sendMessage = async (options: SendMessageOptions) => {
  await performBatch(async (batch) => {
    // add message to chat's messages collection
    const { userId, content } = options;
    const messageId = snowflakeId();
    const messageRef =
      options.type === 'chat'
        ? chatMessageDoc(options.chatId, messageId)
        : channelMessagesDoc(options.channelId, messageId);

    batch.set(messageRef, {
      content,
      userId,
      id: messageId,
      timestamp: serverTimestamp(),
    });
  });
};

const useSendMessage = () => {
  return useMutation(sendMessage);
};

export default useSendMessage;
export { sendMessage };
